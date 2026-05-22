"use server";

import { z } from "zod";
import { Resend } from "resend";
import type { ActionResult, ProjectFormData } from "@/types/project";

const resend = new Resend(process.env.RESEND_API_KEY);

// ─── Validation Schema ────────────────────────────────────────────────────────

/**
 * Zod schema mirrors the client-side validation so the server is the
 * authoritative source of truth — client validation is just UX sugar.
 */
const projectSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required.")
    .max(100, "Full name must be 100 characters or fewer."),

  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),

  projectTitle: z
    .string()
    .min(1, "Project title is required.")
    .max(150, "Project title must be 150 characters or fewer."),

  projectDescription: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(2000, "Description must be 2,000 characters or fewer."),

  projectType: z.enum(["web-app", "mobile-app", "dashboard", "api", "other"], {
    error: "Please select a valid project type.",
  }),
  budget: z.enum(["under-5k", "5k-10k", "10k-25k", "25k-50k", "50k-plus"], {
    error: "Please select a valid budget range.",
  }),
});

// ─── Server Action ────────────────────────────────────────────────────────────

/**
 * submitProjectRequest
 *
 * Called directly from the client via the `useProjectForm` hook.
 * Returns a typed `ActionResult` — never throws — so the caller
 * can branch on `result.status` without wrapping in try/catch.
 *
 * Steps:
 *  1. Validate the payload with Zod (server-authoritative).
 *  2. Persist / notify (replace the TODO block with your DB/email logic).
 *  3. Return a success or error result.
 */
export async function submitProjectRequest(
  data: ProjectFormData,
): Promise<ActionResult> {
  const parsed = projectSchema.safeParse(data);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const normalised = Object.fromEntries(
      Object.entries(fieldErrors).map(([key, messages]) => [
        key,
        messages?.[0] ?? "Invalid value.",
      ]),
    ) as Partial<Record<keyof ProjectFormData, string>>;

    return {
      status: "error",
      message: "Please fix the errors below and try again.",
      fieldErrors: normalised,
    };
  }

  const {
    fullName,
    email,
    projectTitle,
    projectDescription,
    projectType,
    budget,
  } = parsed.data;

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev", // must be a verified Resend domain Project Requests <noreply@synvanta.com>
      to: process.env.RESEND_TO_EMAIL!,
      replyTo: email,
      subject: `New Project Request: ${projectTitle}`,
      html: `
        <h2>New Project Request</h2>
        <table cellpadding="8" style="border-collapse:collapse;width:100%">
          <tr><td><strong>Name</strong></td><td>${fullName}</td></tr>
          <tr><td><strong>Email</strong></td><td>${email}</td></tr>
          <tr><td><strong>Project Title</strong></td><td>${projectTitle}</td></tr>
          <tr><td><strong>Type</strong></td><td>${projectType}</td></tr>
          <tr><td><strong>Budget</strong></td><td>${budget}</td></tr>
          <tr><td><strong>Description</strong></td><td>${projectDescription}</td></tr>
        </table>
      `,
    });
  } catch (err) {
    console.error("[submitProjectRequest] Email error:", err);
    return {
      status: "error",
      message: "Something went wrong on our end. Please try again later.",
    };
  }

  return {
    status: "success",
    message: "Thanks! We'll be in touch within 1–2 business days.",
  };
}

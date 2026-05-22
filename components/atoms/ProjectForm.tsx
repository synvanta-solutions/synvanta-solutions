"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { type UseProjectFormReturn } from "@/hooks/useProjectForm";

// ─── FieldError ───────────────────────────────────────────────────────────────

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className="text-sm text-destructive mt-1 flex items-center gap-1"
    >
      <span className="inline-block h-1 w-1 rounded-full bg-destructive" />
      {message}
    </p>
  );
}

// ─── ProjectForm ──────────────────────────────────────────────────────────────

type ProjectFormProps = Pick<
  UseProjectFormReturn,
  | "formData"
  | "errors"
  | "isSubmitting"
  | "handleChange"
  | "handleSelectChange"
  | "handleSubmit"
> & {
  onSuccess: () => void;
};

const PROJECT_TYPE_LABELS: Record<string, string> = {
  "web-app": "Web App",
  "mobile-app": "Mobile App",
  dashboard: "Dashboard",
  api: "API",
  other: "Other",
};

const BUDGET_LABELS: Record<string, string> = {
  "under-5k": "Under ₱5,000",
  "5k-10k": "₱5,000 – ₱10,000",
  "10k-25k": "₱10,000 – ₱25,000",
  "25k-50k": "₱25,000 – ₱50,000",
  "50k-plus": "₱50,000+",
};

export default function ProjectForm({
  formData,
  errors,
  isSubmitting,
  handleChange,
  handleSelectChange,
  handleSubmit,
  onSuccess,
}: ProjectFormProps) {
  return (
    <form
      onSubmit={(event) => handleSubmit(event, onSuccess)}
      noValidate
      className="space-y-8"
    >
      {/* ── Contact ──────────────────────────────────────────── */}
      <div className="space-y-5 gap-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Full Name */}
          <div className="space-y-2">
            <Label
              htmlFor="fullName"
              className="text-sm font-semibold text-foreground"
            >
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="Your name"
              value={formData.fullName}
              onChange={handleChange}
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              className={`h-10 bg-background border text-foreground placeholder:text-muted-foreground/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring transition-colors ${
                errors.fullName
                  ? "border-destructive focus-visible:ring-destructive/30"
                  : "border-border hover:border-ring/50"
              }`}
            />
            <FieldError message={errors.fullName} />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-semibold text-foreground"
            >
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`h-10 bg-background border text-foreground placeholder:text-muted-foreground/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring transition-colors ${
                errors.email
                  ? "border-destructive focus-visible:ring-destructive/30"
                  : "border-border hover:border-ring/50"
              }`}
            />
            <FieldError message={errors.email} />
          </div>
        </div>
      </div>

      {/* ── Project Details ───────────────────────────────────── */}
      <div className="space-y-5">
        {/* Project Title */}
        <div className="space-y-2">
          <Label
            htmlFor="projectTitle"
            className="text-sm font-semibold text-foreground"
          >
            Project Title <span className="text-destructive">*</span>
          </Label>
          <Input
            id="projectTitle"
            name="projectTitle"
            placeholder="What's your project called?"
            value={formData.projectTitle}
            onChange={handleChange}
            aria-invalid={!!errors.projectTitle}
            aria-describedby={
              errors.projectTitle ? "projectTitle-error" : undefined
            }
            className={`h-10 bg-background border text-foreground placeholder:text-muted-foreground/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring transition-colors ${
              errors.projectTitle
                ? "border-destructive focus-visible:ring-destructive/30"
                : "border-border hover:border-ring/50"
            }`}
          />
          <FieldError message={errors.projectTitle} />
        </div>

        {/* Project Description */}
        <div className="space-y-2">
          <Label
            htmlFor="projectDescription"
            className="text-sm font-semibold text-foreground"
          >
            Description <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="projectDescription"
            name="projectDescription"
            placeholder="Tell us about your project, goals, and timeline..."
            value={formData.projectDescription}
            onChange={handleChange}
            className={`min-h-[110px] resize-none bg-background border text-foreground placeholder:text-muted-foreground/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring transition-colors ${
              errors.projectDescription
                ? "border-destructive focus-visible:ring-destructive/30"
                : "border-border hover:border-ring/50"
            }`}
            aria-invalid={!!errors.projectDescription}
            aria-describedby={
              errors.projectDescription ? "projectDescription-error" : undefined
            }
          />
          <FieldError message={errors.projectDescription} />
        </div>
      </div>

      {/* ── Scope & Budget ────────────────────────────────────── */}
      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Project Type */}
          <div className="space-y-2">
            <Label
              htmlFor="projectType"
              className="text-sm font-semibold text-foreground"
            >
              Project Type <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.projectType}
              onValueChange={(value) =>
                value && handleSelectChange("projectType")(value)
              }
            >
              <SelectTrigger
                id="projectType"
                aria-invalid={!!errors.projectType}
                aria-describedby={
                  errors.projectType ? "projectType-error" : undefined
                }
                className={`py-5 w-full bg-background border text-foreground focus:ring-2 focus:ring-ring transition-colors ${
                  errors.projectType
                    ? "border-destructive"
                    : "border-border hover:border-ring/50"
                }`}
              >
                <SelectValue placeholder="Select type">
                  {PROJECT_TYPE_LABELS[formData.projectType] ?? undefined}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="web-app">Web App</SelectItem>
                <SelectItem value="mobile-app">Mobile App</SelectItem>
                <SelectItem value="dashboard">Dashboard</SelectItem>
                <SelectItem value="api">API</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <FieldError message={errors.projectType} />
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <Label
              htmlFor="budget"
              className="text-sm font-semibold text-foreground"
            >
              Budget <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.budget}
              onValueChange={(value) =>
                value && handleSelectChange("budget")(value)
              }
            >
              <SelectTrigger
                id="budget"
                aria-invalid={!!errors.budget}
                aria-describedby={errors.budget ? "budget-error" : undefined}
                className={`py-5 w-full bg-background border text-foreground focus:ring-2 focus:ring-ring transition-colors ${
                  errors.budget
                    ? "border-destructive"
                    : "border-border hover:border-ring/50"
                }`}
              >
                <SelectValue placeholder="Select range">
                  {BUDGET_LABELS[formData.budget] ?? undefined}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="under-5k">Under ₱5,000</SelectItem>
                <SelectItem value="5k-10k">₱5,000 – ₱10,000</SelectItem>
                <SelectItem value="10k-25k">₱10,000 – ₱25,000</SelectItem>
                <SelectItem value="25k-50k">₱25,000 – ₱50,000</SelectItem>
                <SelectItem value="50k-plus">₱50,000+</SelectItem>
              </SelectContent>
            </Select>
            <FieldError message={errors.budget} />
          </div>
        </div>
      </div>

      {/* ── Submit ────────────────────────────────────────────── */}
      <Button
        type="submit"
        className="h-12 w-full rounded-full bg-primary text-sm font-semibold uppercase tracking-widest text-primary-foreground shadow-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-primary/25 md:h-14"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" />
            Submitting…
          </span>
        ) : (
          <span className="flex items-center gap-2">
            Submit Project Request
            <ArrowRight className="h-4 w-4" />
          </span>
        )}
      </Button>
    </form>
  );
}
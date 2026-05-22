// ─── Form Data ────────────────────────────────────────────────────────────────

export type ProjectFormData = {
  fullName: string;
  email: string;
  projectTitle: string;
  projectDescription: string;
  projectType: string;
  budget: string;
};

// ─── Server Action Response ───────────────────────────────────────────────────

/**
 * Discriminated union returned by the server action.
 *
 * Using a union (rather than throwing) keeps error handling
 * explicit and type-safe on the client without try/catch boilerplate.
 */
export type ActionResult =
  | { status: "success"; message: string }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<keyof ProjectFormData, string>>;
    };

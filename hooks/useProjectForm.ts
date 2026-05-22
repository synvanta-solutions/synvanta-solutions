import { useState } from "react";
import { toast } from "sonner";
import { submitProjectRequest } from "@/actions/submitProjectRequest";
import type { ProjectFormData } from "@/types/project";

// ─── Constants ────────────────────────────────────────────────────────────────

const INITIAL_FORM_STATE: ProjectFormData = {
  fullName: "",
  email: "",
  projectTitle: "",
  projectDescription: "",
  projectType: "",
  budget: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ─── Client-side Validation ───────────────────────────────────────────────────

/**
 * Runs before the network call to give instant feedback.
 * The server action re-validates authoritatively — this is UX sugar only.
 */
type FormErrors = Partial<Record<keyof ProjectFormData, string>>;

function validateForm(data: ProjectFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.fullName.trim()) errors.fullName = "Full name is required.";

  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.projectTitle.trim())
    errors.projectTitle = "Project title is required.";

  if (!data.projectDescription.trim()) {
    errors.projectDescription = "Project description is required.";
  } else if (data.projectDescription.trim().length < 20) {
    errors.projectDescription = "Description must be at least 20 characters.";
  }

  if (!data.projectType) errors.projectType = "Please select a project type.";
  if (!data.budget) errors.budget = "Please select a budget range.";

  return errors;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export type UseProjectFormReturn = {
  formData: ProjectFormData;
  errors: FormErrors;
  isSubmitting: boolean;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleSelectChange: (field: keyof ProjectFormData) => (value: string) => void;
  handleSubmit: (e: React.FormEvent, onSuccess?: () => void) => Promise<void>;
  reset: () => void;
};

export function useProjectForm(): UseProjectFormReturn {
  const [formData, setFormData] = useState<ProjectFormData>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear inline error as the user corrects the field
    if (errors[name as keyof ProjectFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectChange =
    (field: keyof ProjectFormData) => (value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));

      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleSubmit = async (e: React.FormEvent, onSuccess?: () => void) => {
    e.preventDefault();

    // 1. Client-side validation (fast, no network round-trip)
    const clientErrors = validateForm(formData);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    // 2. Call the server action
    setIsSubmitting(true);
    try {
      const result = await submitProjectRequest(formData);

      if (result.status === "success") {
        toast.success(result.message);
        reset();
        onSuccess?.();
      } else {
        toast.error(result.message);
        if (result.fieldErrors) {
          // Merge server field errors back into the form (e.g. duplicate email)
          setErrors(result.fieldErrors);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setFormData(INITIAL_FORM_STATE);
    setErrors({});
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSelectChange,
    handleSubmit,
    reset,
  };
}

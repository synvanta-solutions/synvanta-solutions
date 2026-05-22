"use client";

import { useState, type ReactElement, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { type UseProjectFormReturn } from "@/hooks/useProjectForm";

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

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="text-sm text-destructive mt-1">
      {message}
    </p>
  );
}

function ProjectForm({
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
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name *</Label>
        <Input
          id="fullName"
          name="fullName"
          placeholder="Your name"
          value={formData.fullName}
          onChange={handleChange}
          aria-invalid={!!errors.fullName}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
        />
        <FieldError message={errors.fullName} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={handleChange}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        <FieldError message={errors.email} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="projectTitle">Project Title *</Label>
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
        />
        <FieldError message={errors.projectTitle} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="projectDescription">Project Description *</Label>
        <Textarea
          id="projectDescription"
          name="projectDescription"
          placeholder="Tell us about your project..."
          value={formData.projectDescription}
          onChange={handleChange}
          className="min-h-[100px]"
          aria-invalid={!!errors.projectDescription}
          aria-describedby={
            errors.projectDescription ? "projectDescription-error" : undefined
          }
        />
        <FieldError message={errors.projectDescription} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="projectType">Project Type *</Label>
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
          >
            <SelectValue placeholder="Select a project type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="web-app">Web App</SelectItem>
            <SelectItem value="mobile-app">Mobile App</SelectItem>
            <SelectItem value="dashboard">Dashboard</SelectItem>
            <SelectItem value="api">API</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        <FieldError message={errors.projectType} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="budget">Budget *</Label>
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
          >
            <SelectValue placeholder="Select a budget range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="under-5k">Under ₱5,000</SelectItem>
            <SelectItem value="5k-10k">₱5,000 – ₱10,000</SelectItem>
            <SelectItem value="10k-25k">₱10,000 – ₱25,000</SelectItem>
            <SelectItem value="25k-50k">₱25,000 – ₱50,000</SelectItem>
            <SelectItem value="50k-plus">₱50,000+</SelectItem>
          </SelectContent>
        </Select>
        <FieldError message={errors.budget} />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Project Request"}
      </Button>
    </form>
  );
}

// ─── ProjectDialog ────────────────────────────────────────────────────────────

type ProjectDialogProps = {
  trigger: ReactNode;
  form: UseProjectFormReturn;
};

export default function ProjectDialog({ trigger, form }: ProjectDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger as ReactElement}>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Start a Project</DialogTitle>
          <DialogDescription>
            Tell us about your project and we'll get back to you soon.
          </DialogDescription>
        </DialogHeader>

        <ProjectForm
          formData={form.formData}
          errors={form.errors}
          isSubmitting={form.isSubmitting}
          handleChange={form.handleChange}
          handleSelectChange={form.handleSelectChange}
          handleSubmit={form.handleSubmit}
          onSuccess={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}

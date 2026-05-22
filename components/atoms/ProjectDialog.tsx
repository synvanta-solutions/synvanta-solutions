"use client";

import { useState, type ReactElement, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import ProjectForm from "@/components/atoms/ProjectForm";
import { type UseProjectFormReturn } from "@/hooks/useProjectForm";

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

      <DialogContent className="sm:max-w-[600px] bg-card border-border p-0 gap-0 overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-5 border-b border-border">
          <div className="flex items-center gap-3 mb-3">
            <Badge variant="secondary" className="w-fit text-xs tracking-widest uppercase flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              New Request
            </Badge>
          </div>
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold tracking-tight text-foreground">
              Start a Project
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mt-1.5">
              Tell us about your project and we'll get back to you soon.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Form body */}
        <div className="px-6 py-5 bg-card overflow-y-auto max-h-[70vh]">
          <ProjectForm
            formData={form.formData}
            errors={form.errors}
            isSubmitting={form.isSubmitting}
            handleChange={form.handleChange}
            handleSelectChange={form.handleSelectChange}
            handleSubmit={form.handleSubmit}
            onSuccess={handleSuccess}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
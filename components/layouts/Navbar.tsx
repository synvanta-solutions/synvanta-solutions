"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MenuIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
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
import {
  useProjectForm,
  type UseProjectFormReturn,
} from "@/hooks/useProjectForm";

// ─── Constants ────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { title: "About Us", href: "#" },
  { title: "Products", href: "#" },
  { title: "Services", href: "#" },
  { title: "Pricing", href: "#" },
];

// Split index for the logo-centered desktop layout (nav items flank the logo)
const NAV_SPLIT_INDEX = Math.ceil(NAV_ITEMS.length / 2);

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
      onSubmit={(e) => handleSubmit(e, onSuccess)}
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
        {isSubmitting ? "Submitting…" : "Submit Project Request"}
      </Button>
    </form>
  );
}

// ─── ProjectDialog ────────────────────────────────────────────────────────────

type ProjectDialogProps = {
  trigger: React.ReactNode;
  form: UseProjectFormReturn;
};

function ProjectDialog({ trigger, form }: ProjectDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger as React.ReactElement}>
        {trigger}
      </DialogTrigger>
      {/*
        DialogContent already renders its own close button — no need to add one
        manually, which previously caused two overlapping close buttons.
      */}
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

// ─── Navbar ───────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // All form state and logic lives in the hook — Navbar only wires the dialog
  const form = useProjectForm();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    if (mobileOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50">
        {/* cn() keeps conditional class logic readable and avoids template-literal bugs */}
        <div
          className={cn(
            "mx-auto flex max-w-7xl bg-background rounded-full backdrop-blur-md",
            "border border-white/20 items-center justify-between",
            "mt-7 gap-6 px-4 py-3 sm:px-6 lg:px-8 transition-shadow duration-300",
            isScrolled && "shadow-lg",
          )}
        >
          {/* Left nav — first half of NAV_ITEMS */}
          <nav className="hidden flex-1 items-center justify-end gap-8 text-md text-foreground lg:flex">
            {NAV_ITEMS.slice(0, NAV_SPLIT_INDEX).map(({ title, href }) => (
              <Link
                key={title}
                href={href}
                className="transition-colors hover:text-foreground/70"
              >
                {title}
              </Link>
            ))}
          </nav>

          {/* Logo */}
          <a
            href="#"
            aria-label="Synvanta home"
            className="shrink-0 px-3 lg:px-6"
          >
            <Image
              src="/navbar.png"
              alt="Synvanta"
              width={160}
              height={48}
              className="h-8 w-auto object-contain sm:h-10"
              priority
            />
          </a>

          {/* Right nav — second half of NAV_ITEMS + actions */}
          <div className="flex flex-1 items-center justify-end gap-4 lg:justify-start lg:gap-8">
            <nav className="hidden flex-1 items-center gap-8 text-md text-foreground lg:flex">
              {NAV_ITEMS.slice(NAV_SPLIT_INDEX).map(({ title, href }) => (
                <Link
                  key={title}
                  href={href}
                  className="transition-colors hover:text-foreground/70"
                >
                  {title}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              {/* Desktop dialog — each dialog manages its own open state */}
              <ProjectDialog
                form={form}
                trigger={
                  <Button className="hidden lg:inline-flex">
                    Start a Project
                  </Button>
                }
              />

              <button
                className={cn(
                  "inline-flex h-9 w-9 items-center justify-center rounded-md",
                  "border border-border bg-background text-foreground",
                  "transition-colors hover:bg-muted lg:hidden",
                )}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((v) => !v)}
              >
                {mobileOpen ? (
                  <XIcon className="h-5 w-5 transition-transform duration-300" />
                ) : (
                  <MenuIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu */}
      <nav
        className={cn(
          "fixed rounded-2xl shadow-sm right-5 top-26 z-50",
          "w-72 max-w-[90vw] origin-top-right rounded-b-lg",
          "border border-border/60 bg-background",
          "transition-all duration-300 sm:top-16 lg:hidden",
          mobileOpen
            ? "visible scale-100 opacity-100"
            : "invisible scale-95 opacity-0",
        )}
      >
        <div className="space-y-1 p-4">
          {NAV_ITEMS.map(({ title, href }) => (
            <Link
              key={title}
              href={href}
              onClick={closeMobileMenu}
              className="block rounded-md px-4 py-3 text-md text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
            >
              {title}
            </Link>
          ))}
        </div>

        <div className="border-t border-border/60 p-4">
          {/* Mobile dialog — shares the same form hook instance */}
          <ProjectDialog
            form={form}
            trigger={<Button className="w-full">Start a Project</Button>}
          />
        </div>
      </nav>
    </>
  );
}

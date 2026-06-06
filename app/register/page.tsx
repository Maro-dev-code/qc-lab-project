"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast, Toaster } from "sonner";
import { useWizardStore } from "../store";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

// ================================
// ZOD VALIDATION SCHEMAS
// ================================
const step1Schema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  taxId: z.string().min(9, "Tax ID must be at least 9 characters").max(15, "Tax ID too long"),
  address: z.string().min(5, "Address must be at least 5 characters"),
});

const step2Schema = z.object({
  directors: z.array(
    z.object({
      id: z.string(),
      name: z.string().min(2, "Director name must be at least 2 characters"),
      role: z.string().min(2, "Role must be at least 2 characters"),
    })
  ).min(1, "At least one director is required"),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;

// ================================
// MOCK API FUNCTION
// ================================
const mockSubmitAPI = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const random = Math.random();
      if (random < 0.25) {
        reject(new Error("500 Internal Server Error"));
      } else {
        resolve("Application submitted successfully!");
      }
    }, 4000);
  });
};

// ================================
// STEP INDICATOR COMPONENT
// ================================
const StepIndicator = ({ currentStep }: { currentStep: number }) => {
  const steps = [
    { number: 1, label: "Business Details" },
    { number: 2, label: "Board of Directors" },
    { number: 3, label: "Review & Submit" },
  ];

  return (
    <div className="flex items-center justify-center mb-[var(--spacing-32)]">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
              currentStep > step.number
                ? "bg-[var(--color-success-500)] border-[var(--color-success-500)] text-white"
                : currentStep === step.number
                ? "bg-[var(--color-primary-600)] border-[var(--color-primary-600)] text-white"
                : "bg-white border-[var(--color-border-medium)] text-[var(--color-text-400)]"
            }`}>
              {currentStep > step.number ? "✓" : step.number}
            </div>
            <span className={`text-xs mt-[var(--spacing-4)] whitespace-nowrap font-medium ${
              currentStep === step.number
                ? "text-[var(--color-primary-600)]"
                : currentStep > step.number
                ? "text-[var(--color-success-500)]"
                : "text-[var(--color-text-400)]"
            }`}>
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className={`w-24 h-0.5 mx-[var(--spacing-4)] mb-[var(--spacing-16)] ${
              currentStep > step.number
                ? "bg-[var(--color-success-500)]"
                : "bg-[var(--color-border-medium)]"
            }`} />
          )}
        </div>
      ))}
    </div>
  );
};

// ================================
// MAIN WIZARD PAGE
// ================================
export default function RegisterPage() {
  const {
    currentStep,
    businessName,
    taxId,
    address,
    directors,
    isSubmitting,
    isSubmitted,
    setStep,
    setBusinessDetails,
    setDirectors,
    setIsSubmitting,
    setIsSubmitted,
  } = useWizardStore();

  // Step 1 Form
  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: { businessName, taxId, address },
  });

  // Step 2 Form
  const step2Form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: { directors },
  });

  const { fields, append, remove } = useFieldArray({
    control: step2Form.control,
    name: "directors",
  });

  // Handle Step 1 Submit
  const handleStep1Submit = (data: Step1Data) => {
    setBusinessDetails(data);
    setStep(2);
  };

  // Handle Step 2 Submit
  const handleStep2Submit = (data: Step2Data) => {
    setDirectors(data.directors);
    setStep(3);
  };

  // Handle Final Submit
  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      await mockSubmitAPI();
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Application submitted successfully! Reference: GOV-2024-001");
    } catch (error) {
      setIsSubmitting(false);
      toast.error("Server error. Please try again — your data is safe.");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-page)]">
      <Toaster position="top-right" richColors />
      <Navbar />

      {/* BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-[var(--spacing-24)] py-[var(--spacing-8)]">
        <div className="flex items-center gap-2 text-sm text-[var(--color-text-500)]">
          <span>Home</span>
          <span>›</span>
          <span>My Profile</span>
          <span>›</span>
          <span className="text-[var(--color-primary-600)] font-medium">Business Registration</span>
        </div>
      </div>

      {/* PAGE BODY */}
      <div className="max-w-7xl mx-auto px-[var(--spacing-24)] pb-[var(--spacing-64)]">
        <div className="flex gap-[var(--spacing-24)] items-start">

          <Sidebar />

          {/* MAIN CONTENT */}
          <main className="flex-1 min-w-0">

            {/* PAGE HEADER */}
            <div className="mb-[var(--spacing-24)]">
              <h1 className="text-2xl font-bold text-[var(--color-text-900)]">
                Business Registration
              </h1>
              <p className="text-sm text-[var(--color-text-500)] mt-[var(--spacing-4)]">
                Complete all steps to register your business with the U.S. Department of Defense portal.
              </p>
            </div>

            {/* WIZARD CARD */}
            <div className="bg-white rounded-[var(--radius-12)] border border-[var(--color-border-light)] p-[var(--spacing-32)]">

              <StepIndicator currentStep={currentStep} />

              {/* ======================== */}
              {/* STEP 1 — Business Details */}
              {/* ======================== */}
              {currentStep === 1 && (
                <form onSubmit={step1Form.handleSubmit(handleStep1Submit)}>
                  <h2 className="text-lg font-bold text-[var(--color-text-900)] mb-[var(--spacing-8)]">
                    Business Details
                  </h2>
                  <p className="text-sm text-[var(--color-text-500)] mb-[var(--spacing-24)]">
                    Enter your business information below.
                  </p>

                  <div className="flex flex-col gap-[var(--spacing-16)]">

                    {/* Business Name */}
                    <div>
                      <label className="block text-xs font-medium text-[var(--color-text-600)] mb-[var(--spacing-4)]">
                        Business Name *
                      </label>
                      <input
                        {...step1Form.register("businessName")}
                        type="text"
                        placeholder="Enter your business name"
                        className="w-full border border-[var(--color-border-medium)] rounded-[var(--radius-8)] px-[var(--spacing-12)] py-[var(--spacing-8)] text-sm text-[var(--color-text-900)] focus:outline-none focus:border-[var(--color-primary-500)] focus:ring-1 focus:ring-[var(--color-primary-500)]"
                      />
                      {step1Form.formState.errors.businessName && (
                        <p className="text-xs text-[var(--color-error-500)] mt-[var(--spacing-4)]">
                          {step1Form.formState.errors.businessName.message}
                        </p>
                      )}
                    </div>

                    {/* Tax ID */}
                    <div>
                      <label className="block text-xs font-medium text-[var(--color-text-600)] mb-[var(--spacing-4)]">
                        Tax ID *
                      </label>
                      <input
                        {...step1Form.register("taxId")}
                        type="text"
                        placeholder="Enter your Tax ID number"
                        className="w-full border border-[var(--color-border-medium)] rounded-[var(--radius-8)] px-[var(--spacing-12)] py-[var(--spacing-8)] text-sm text-[var(--color-text-900)] focus:outline-none focus:border-[var(--color-primary-500)] focus:ring-1 focus:ring-[var(--color-primary-500)]"
                      />
                      {step1Form.formState.errors.taxId && (
                        <p className="text-xs text-[var(--color-error-500)] mt-[var(--spacing-4)]">
                          {step1Form.formState.errors.taxId.message}
                        </p>
                      )}
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-xs font-medium text-[var(--color-text-600)] mb-[var(--spacing-4)]">
                        Official Address *
                      </label>
                      <input
                        {...step1Form.register("address")}
                        type="text"
                        placeholder="Enter your official business address"
                        className="w-full border border-[var(--color-border-medium)] rounded-[var(--radius-8)] px-[var(--spacing-12)] py-[var(--spacing-8)] text-sm text-[var(--color-text-900)] focus:outline-none focus:border-[var(--color-primary-500)] focus:ring-1 focus:ring-[var(--color-primary-500)]"
                      />
                      {step1Form.formState.errors.address && (
                        <p className="text-xs text-[var(--color-error-500)] mt-[var(--spacing-4)]">
                          {step1Form.formState.errors.address.message}
                        </p>
                      )}
                    </div>

                  </div>

                  {/* Info Banner */}
                  <div className="mt-[var(--spacing-24)] p-[var(--spacing-12)] bg-[var(--color-info-50)] border border-[var(--color-info-200)] rounded-[var(--radius-8)] flex items-start gap-[var(--spacing-8)]">
                    <span className="text-[var(--color-info-500)] text-sm">ℹ</span>
                    <p className="text-xs text-[var(--color-info-700)]">
                      Your progress is automatically saved. You can safely close this page and return later.
                    </p>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-end mt-[var(--spacing-32)]">
                    <button
                      type="submit"
                      className="px-[var(--spacing-32)] py-[var(--spacing-8)] bg-[var(--color-primary-600)] text-white rounded-[var(--radius-8)] text-sm font-semibold hover:bg-[var(--color-primary-700)] transition-colors"
                    >
                      Next Step →
                    </button>
                  </div>
                </form>
              )}

              {/* ============================ */}
              {/* STEP 2 — Board of Directors  */}
              {/* ============================ */}
              {currentStep === 2 && (
                <form onSubmit={step2Form.handleSubmit(handleStep2Submit)}>
                  <h2 className="text-lg font-bold text-[var(--color-text-900)] mb-[var(--spacing-8)]">
                    Board of Directors
                  </h2>
                  <p className="text-sm text-[var(--color-text-500)] mb-[var(--spacing-24)]">
                    Add your board of directors. You can add up to 10 directors.
                  </p>

                  <div className="flex flex-col gap-[var(--spacing-16)]">
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="p-[var(--spacing-16)] border border-[var(--color-border-light)] rounded-[var(--radius-8)] bg-[var(--color-bg-page)]"
                      >
                        <div className="flex justify-between items-center mb-[var(--spacing-12)]">
                          <span className="text-sm font-semibold text-[var(--color-text-700)]">
                            Director {index + 1}
                          </span>
                          {fields.length > 1 && (
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="text-xs text-[var(--color-error-500)] hover:text-[var(--color-error-700)] font-medium"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-[var(--spacing-12)]">
                          <div>
                            <label className="block text-xs font-medium text-[var(--color-text-600)] mb-[var(--spacing-4)]">
                              Full Name *
                            </label>
                            <input
                              {...step2Form.register(`directors.${index}.name`)}
                              type="text"
                              placeholder="Director full name"
                              className="w-full border border-[var(--color-border-medium)] rounded-[var(--radius-8)] px-[var(--spacing-12)] py-[var(--spacing-8)] text-sm focus:outline-none focus:border-[var(--color-primary-500)]"
                            />
                            {step2Form.formState.errors.directors?.[index]?.name && (
                              <p className="text-xs text-[var(--color-error-500)] mt-1">
                                {step2Form.formState.errors.directors[index]?.name?.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-[var(--color-text-600)] mb-[var(--spacing-4)]">
                              Role *
                            </label>
                            <input
                              {...step2Form.register(`directors.${index}.role`)}
                              type="text"
                              placeholder="e.g. CEO, CFO, Chairman"
                              className="w-full border border-[var(--color-border-medium)] rounded-[var(--radius-8)] px-[var(--spacing-12)] py-[var(--spacing-8)] text-sm focus:outline-none focus:border-[var(--color-primary-500)]"
                            />
                            {step2Form.formState.errors.directors?.[index]?.role && (
                              <p className="text-xs text-[var(--color-error-500)] mt-1">
                                {step2Form.formState.errors.directors[index]?.role?.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Director Button */}
                  {fields.length < 10 && (
                    <button
                      type="button"
                      onClick={() => append({ id: Date.now().toString(), name: "", role: "" })}
                      className="mt-[var(--spacing-16)] w-full py-[var(--spacing-8)] border-2 border-dashed border-[var(--color-border-medium)] rounded-[var(--radius-8)] text-sm text-[var(--color-primary-600)] font-medium hover:border-[var(--color-primary-500)] hover:bg-[var(--color-primary-50)] transition-colors"
                    >
                      + Add Director ({fields.length}/10)
                    </button>
                  )}

                  {/* Navigation */}
                  <div className="flex justify-between mt-[var(--spacing-32)]">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-[var(--spacing-32)] py-[var(--spacing-8)] border border-[var(--color-border-medium)] text-[var(--color-text-700)] rounded-[var(--radius-8)] text-sm font-semibold hover:bg-[var(--color-primary-50)] transition-colors"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className="px-[var(--spacing-32)] py-[var(--spacing-8)] bg-[var(--color-primary-600)] text-white rounded-[var(--radius-8)] text-sm font-semibold hover:bg-[var(--color-primary-700)] transition-colors"
                    >
                      Next Step →
                    </button>
                  </div>
                </form>
              )}

              {/* ======================== */}
              {/* STEP 3 — Review & Submit */}
              {/* ======================== */}
              {currentStep === 3 && !isSubmitted && (
                <div>
                  <h2 className="text-lg font-bold text-[var(--color-text-900)] mb-[var(--spacing-8)]">
                    Review Your Application
                  </h2>
                  <p className="text-sm text-[var(--color-text-500)] mb-[var(--spacing-24)]">
                    Please review your details carefully before submitting.
                  </p>

                  {/* Review Cards */}
                  <div className="flex flex-col gap-[var(--spacing-16)]">

                    {/* Business Details Review */}
                    <div className="p-[var(--spacing-20)] border border-[var(--color-border-light)] rounded-[var(--radius-8)] bg-[var(--color-bg-page)]">
                      <div className="flex justify-between items-center mb-[var(--spacing-12)]">
                        <h3 className="text-sm font-bold text-[var(--color-text-800)]">
                          Business Details
                        </h3>
                        <button
                          onClick={() => setStep(1)}
                          className="text-xs text-[var(--color-primary-600)] hover:underline font-medium"
                        >
                          Edit
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-[var(--spacing-8)]">
                        <div>
                          <p className="text-xs text-[var(--color-text-500)]">Business Name</p>
                          <p className="text-sm font-medium text-[var(--color-text-900)]">{businessName}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[var(--color-text-500)]">Tax ID</p>
                          <p className="text-sm font-medium text-[var(--color-text-900)]">{taxId}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-xs text-[var(--color-text-500)]">Official Address</p>
                          <p className="text-sm font-medium text-[var(--color-text-900)]">{address}</p>
                        </div>
                      </div>
                    </div>

                    {/* Directors Review */}
                    <div className="p-[var(--spacing-20)] border border-[var(--color-border-light)] rounded-[var(--radius-8)] bg-[var(--color-bg-page)]">
                      <div className="flex justify-between items-center mb-[var(--spacing-12)]">
                        <h3 className="text-sm font-bold text-[var(--color-text-800)]">
                          Board of Directors
                        </h3>
                        <button
                          onClick={() => setStep(2)}
                          className="text-xs text-[var(--color-primary-600)] hover:underline font-medium"
                        >
                          Edit
                        </button>
                      </div>
                      <div className="flex flex-col gap-[var(--spacing-8)]">
                        {directors.map((director, index) => (
                          <div key={director.id} className="flex items-center gap-[var(--spacing-12)]">
                            <div className="w-7 h-7 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center text-xs font-bold text-[var(--color-primary-700)]">
                              {index + 1}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-[var(--color-text-900)]">{director.name}</p>
                              <p className="text-xs text-[var(--color-text-500)]">{director.role}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Info Banner */}
                  <div className="mt-[var(--spacing-16)] p-[var(--spacing-12)] bg-[var(--color-warning-50)] border border-[var(--color-warning-200)] rounded-[var(--radius-8)] flex items-start gap-[var(--spacing-8)]">
                    <span className="text-[var(--color-warning-500)] text-sm">⚠</span>
                    <p className="text-xs text-[var(--color-warning-700)]">
                      Please review carefully. Once submitted, changes cannot be made without contacting support.
                    </p>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between mt-[var(--spacing-32)]">
                    <button
                      onClick={() => setStep(2)}
                      disabled={isSubmitting}
                      className="px-[var(--spacing-32)] py-[var(--spacing-8)] border border-[var(--color-border-medium)] text-[var(--color-text-700)] rounded-[var(--radius-8)] text-sm font-semibold hover:bg-[var(--color-primary-50)] transition-colors disabled:opacity-50"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={handleFinalSubmit}
                      disabled={isSubmitting}
                      className="px-[var(--spacing-32)] py-[var(--spacing-8)] bg-[var(--color-primary-600)] text-white rounded-[var(--radius-8)] text-sm font-semibold hover:bg-[var(--color-primary-700)] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-[var(--spacing-8)]"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin">⏳</span>
                          Submitting...
                        </>
                      ) : (
                        "Submit Application ✓"
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* ======================== */}
              {/* SUCCESS STATE            */}
              {/* ======================== */}
              {isSubmitted && (
                <div className="text-center py-[var(--spacing-48)]">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-success-100)] flex items-center justify-center mx-auto mb-[var(--spacing-16)]">
                    <span className="text-[var(--color-success-600)] text-2xl">✓</span>
                  </div>
                  <h2 className="text-xl font-bold text-[var(--color-text-900)] mb-[var(--spacing-8)]">
                    Application Submitted!
                  </h2>
                  <p className="text-sm text-[var(--color-text-500)] mb-[var(--spacing-4)]">
                    Your business registration has been submitted successfully.
                  </p>
                  <p className="text-sm font-semibold text-[var(--color-primary-600)] mb-[var(--spacing-32)]">
                    Reference Number: GOV-2024-001
                  </p>
                  <button
                    onClick={() => window.location.href = "/profile"}
                    className="px-[var(--spacing-32)] py-[var(--spacing-8)] bg-[var(--color-primary-600)] text-white rounded-[var(--radius-8)] text-sm font-semibold hover:bg-[var(--color-primary-700)] transition-colors"
                  >
                    Return to Profile
                  </button>
                </div>
              )}

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
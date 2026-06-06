"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast, Toaster } from "sonner";
import { useWizardStore } from "../store";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

const step1Schema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  taxId: z.string().min(9, "Tax ID must be at least 9 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
});

const step2Schema = z.object({
  directors: z.array(z.object({
    id: z.string(),
    name: z.string().min(2, "Name must be at least 2 characters"),
    role: z.string().min(2, "Role must be at least 2 characters"),
  })).min(1, "At least one director is required"),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;

const mockSubmitAPI = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() < 0.25 ? reject(new Error("500 Internal Server Error")) : resolve("Success!");
    }, 4000);
  });
};

const StepIndicator = ({ currentStep }: { currentStep: number }) => {
  const steps = [
    { number: 1, label: "Business Details" },
    { number: 2, label: "Board of Directors" },
    { number: 3, label: "Review & Submit" },
  ];
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
              currentStep > step.number ? "bg-green-500 border-green-500 text-white"
              : currentStep === step.number ? "bg-blue-700 border-blue-700 text-white"
              : "bg-white border-gray-300 text-gray-400"
            }`}>
              {currentStep > step.number ? "✓" : step.number}
            </div>
            <span className={`text-xs mt-1 whitespace-nowrap font-medium ${
              currentStep === step.number ? "text-blue-700"
              : currentStep > step.number ? "text-green-500"
              : "text-gray-400"
            }`}>{step.label}</span>
          </div>
          {index < steps.length - 1 && (
            <div className={`w-16 h-0.5 mx-2 mb-4 ${currentStep > step.number ? "bg-green-500" : "bg-gray-300"}`} />
          )}
        </div>
      ))}
    </div>
  );
};

export default function RegisterPage() {
  const { currentStep, businessName, taxId, address, directors, isSubmitting, isSubmitted,
    setStep, setBusinessDetails, setDirectors, setIsSubmitting, setIsSubmitted } = useWizardStore();

  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: { businessName, taxId, address },
  });

  const step2Form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: { directors },
  });

  const { fields, append, remove } = useFieldArray({
    control: step2Form.control,
    name: "directors",
  });

  const handleStep1Submit = (data: Step1Data) => { setBusinessDetails(data); setStep(2); };
  const handleStep2Submit = (data: Step2Data) => { setDirectors(data.directors); setStep(3); };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      await mockSubmitAPI();
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Application submitted! Reference: GOV-2024-001");
    } catch {
      setIsSubmitting(false);
      toast.error("Server error. Your data is safe — please retry.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" richColors />
      <Navbar />

      <div className="px-8 py-2 bg-white border-b border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Home</span><span>›</span><span>My Profile</span><span>›</span>
          <span className="text-blue-700 font-medium">Business Registration</span>
        </div>
      </div>

      <div className="flex items-stretch min-h-[calc(100vh-130px)]">
        <div className="w-64 flex-shrink-0 bg-white border-r border-gray-200">
          <Sidebar />
        </div>

        <main className="flex-1 min-w-0 p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Business Registration</h1>
            <p className="text-sm text-gray-500 mt-1">Complete all steps to register your business.</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <StepIndicator currentStep={currentStep} />

            {currentStep === 1 && (
              <form onSubmit={step1Form.handleSubmit(handleStep1Submit)}>
                <h2 className="text-lg font-bold text-gray-900 mb-2">Business Details</h2>
                <p className="text-sm text-gray-500 mb-6">Enter your business information below.</p>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Business Name *</label>
                    <input {...step1Form.register("businessName")} type="text" placeholder="Enter business name"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                    {step1Form.formState.errors.businessName && (
                      <p className="text-xs text-red-500 mt-1">{step1Form.formState.errors.businessName.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Tax ID *</label>
                    <input {...step1Form.register("taxId")} type="text" placeholder="Enter Tax ID"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                    {step1Form.formState.errors.taxId && (
                      <p className="text-xs text-red-500 mt-1">{step1Form.formState.errors.taxId.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Official Address *</label>
                    <input {...step1Form.register("address")} type="text" placeholder="Enter official address"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                    {step1Form.formState.errors.address && (
                      <p className="text-xs text-red-500 mt-1">{step1Form.formState.errors.address.message}</p>
                    )}
                  </div>
                </div>
                <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs text-blue-700">ℹ Your progress is automatically saved. You can safely close and return later.</p>
                </div>
                <div className="flex justify-end mt-8">
                  <button type="submit" className="px-8 py-2 bg-blue-700 text-white rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors">
                    Next Step →
                  </button>
                </div>
              </form>
            )}

            {currentStep === 2 && (
              <form onSubmit={step2Form.handleSubmit(handleStep2Submit)}>
                <h2 className="text-lg font-bold text-gray-900 mb-2">Board of Directors</h2>
                <p className="text-sm text-gray-500 mb-6">Add your board of directors (up to 10).</p>
                <div className="flex flex-col gap-4">
                  {fields.map((field, index) => (
                    <div key={field.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-semibold text-gray-700">Director {index + 1}</span>
                        {fields.length > 1 && (
                          <button type="button" onClick={() => remove(index)} className="text-xs text-red-500 hover:text-red-700 font-medium">Remove</button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Full Name *</label>
                          <input {...step2Form.register(`directors.${index}.name`)} type="text" placeholder="Director full name"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                          {step2Form.formState.errors.directors?.[index]?.name && (
                            <p className="text-xs text-red-500 mt-1">{step2Form.formState.errors.directors[index]?.name?.message}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Role *</label>
                          <input {...step2Form.register(`directors.${index}.role`)} type="text" placeholder="e.g. CEO, CFO"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                          {step2Form.formState.errors.directors?.[index]?.role && (
                            <p className="text-xs text-red-500 mt-1">{step2Form.formState.errors.directors[index]?.role?.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {fields.length < 10 && (
                  <button type="button" onClick={() => append({ id: Date.now().toString(), name: "", role: "" })}
                    className="mt-4 w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-blue-700 font-medium hover:border-blue-500 hover:bg-blue-50 transition-colors">
                    + Add Director ({fields.length}/10)
                  </button>
                )}
                <div className="flex justify-between mt-8">
                  <button type="button" onClick={() => setStep(1)}
                    className="px-8 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
                    ← Back
                  </button>
                  <button type="submit" className="px-8 py-2 bg-blue-700 text-white rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors">
                    Next Step →
                  </button>
                </div>
              </form>
            )}

            {currentStep === 3 && !isSubmitted && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-2">Review Your Application</h2>
                <p className="text-sm text-gray-500 mb-6">Please review carefully before submitting.</p>
                <div className="flex flex-col gap-4">
                  <div className="p-5 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-sm font-bold text-gray-800">Business Details</h3>
                      <button onClick={() => setStep(1)} className="text-xs text-blue-700 hover:underline">Edit</button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div><p className="text-xs text-gray-500">Business Name</p><p className="text-sm font-medium">{businessName}</p></div>
                      <div><p className="text-xs text-gray-500">Tax ID</p><p className="text-sm font-medium">{taxId}</p></div>
                      <div className="col-span-2"><p className="text-xs text-gray-500">Address</p><p className="text-sm font-medium">{address}</p></div>
                    </div>
                  </div>
                  <div className="p-5 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-sm font-bold text-gray-800">Board of Directors</h3>
                      <button onClick={() => setStep(2)} className="text-xs text-blue-700 hover:underline">Edit</button>
                    </div>
                    {directors.map((director, index) => (
                      <div key={director.id} className="flex items-center gap-3 mb-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700">{index + 1}</div>
                        <div><p className="text-sm font-medium">{director.name}</p><p className="text-xs text-gray-500">{director.role}</p></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-xs text-yellow-700">⚠ Please review carefully. Changes cannot be made after submission.</p>
                </div>
                <div className="flex justify-between mt-8">
                  <button onClick={() => setStep(2)} disabled={isSubmitting}
                    className="px-8 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 disabled:opacity-50 transition-colors">
                    ← Back
                  </button>
                  <button onClick={handleFinalSubmit} disabled={isSubmitting}
                    className="px-8 py-2 bg-blue-700 text-white rounded-lg text-sm font-semibold hover:bg-blue-800 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 transition-colors">
                    {isSubmitting ? <><span className="animate-spin">⏳</span> Submitting...</> : "Submit Application ✓"}
                  </button>
                </div>
              </div>
            )}

            {isSubmitted && (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 text-2xl">✓</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
                <p className="text-sm text-gray-500 mb-1">Your business registration has been submitted successfully.</p>
                <p className="text-sm font-semibold text-blue-700 mb-8">Reference Number: GOV-2024-001</p>
                <button onClick={() => window.location.href = "/profile"}
                  className="px-8 py-2 bg-blue-700 text-white rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors">
                  Return to Profile
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
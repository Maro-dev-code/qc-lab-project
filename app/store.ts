import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Director {
  id: string;
  name: string;
  role: string;
}

interface WizardState {
  currentStep: number;
  businessName: string;
  taxId: string;
  address: string;
  directors: Director[];
  isSubmitting: boolean;
  isSubmitted: boolean;
  setStep: (step: number) => void;
  setBusinessDetails: (data: { businessName: string; taxId: string; address: string }) => void;
  setDirectors: (directors: Director[]) => void;
  setIsSubmitting: (value: boolean) => void;
  setIsSubmitted: (value: boolean) => void;
  resetForm: () => void;
}

export const useWizardStore = create<WizardState>()(
  persist(
    (set) => ({
      currentStep: 1,
      businessName: "",
      taxId: "",
      address: "",
      directors: [{ id: "1", name: "", role: "" }],
      isSubmitting: false,
      isSubmitted: false,
      setStep: (step) => set({ currentStep: step }),
      setBusinessDetails: (data) => set(data),
      setDirectors: (directors) => set({ directors }),
      setIsSubmitting: (value) => set({ isSubmitting: value }),
      setIsSubmitted: (value) => set({ isSubmitted: value }),
      resetForm: () => set({
        currentStep: 1,
        businessName: "",
        taxId: "",
        address: "",
        directors: [{ id: "1", name: "", role: "" }],
        isSubmitting: false,
        isSubmitted: false,
      }),
    }),
    {
      name: "wizard-storage",
    }
  )
);
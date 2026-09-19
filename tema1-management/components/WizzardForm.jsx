"use client";

import StepOne from "./StepOne";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";
import WizzardFormHeader from "./WizzardFormHeader";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  addContract,
  updateContract,
} from "@/app/(protected)/contracts/actions";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";

const emptyContract = {
  cui: "",
  type: "",
  contract_number: "",
  contract_date: "",
  amount: 0,

  agent_name: "",

  company_name: "",
  company_number: "",
  company_address: "",
  company_phone: "",

  fax: "",

  legal_representative: "",
  legal_representative_role: "",

  id_series: "",
  id_number: "",
  cnp: "",

  phone: "",
  email: "",

  invoice: "default",
  invoice_info: "default",

  iban: "",
  bank_name: "",
  bank_location: "",

  payment_method: "default",
  warranties: null,

  store_name: "",
  store_county: "",
  store_city: "",
  store_address: "",
  store_number: "",

  status: "pending",
  date_picker: null,

  files: [],
};
export default function WizzardForm({ mode, initialData }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const parseDate = (date) => {
    if (!date) return null;

    if (date instanceof Date) {
      return Number.isNaN(date.getTime()) ? null : date;
    }

    if (typeof date === "string") {
      const isoMatch = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);

      if (isoMatch) {
        const [, year, month, day] = isoMatch;

        return new Date(Number(year), Number(month) - 1, Number(day));
      }
    }

    return null;
  };

  const normalizeFiles = (files, contractId) =>
    (files || []).map((file, index) => ({
      ...file,
      id: file.id ?? `${contractId || "contract"}-${index}-${file.name}`,
    }));

  const [nextStep, setNextStep] = useState(1);
  const [formData, setFormData] = useState(
    initialData
      ? {
          ...emptyContract,
          ...initialData,
          date_picker: parseDate(initialData.date_picker),
          files: normalizeFiles(initialData.files, initialData.id),
        }
      : emptyContract,
  );
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      let result;

      if (mode === "edit") {
        result = await updateContract(
          initialData.id,
          formData,
          user?.id ?? null,
        );
      } else {
        result = await addContract(formData, user?.id ?? null);
      }

      if (result.success) {
        if (result.contract) {
          setFormData({
            ...emptyContract,
            ...result.contract,
            datePicker: parseDate(result.contract.datePicker),
            files: normalizeFiles(result.contract.files, result.contract.id),
          });
        }

        toast.success(
          mode === "edit"
            ? "Contract actualizat cu succes!"
            : "Contract adăugat cu succes!",
        );

        router.push("/contracts");
        return;
      }

      toast.error(result.message || "A apărut o eroare!");
    } catch (error) {
      toast.error("A apărut o eroare!");
      console.error("Error submitting contract data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <WizzardFormHeader currStep={nextStep} />
      <form mode={mode} onSubmit={handleSubmit}>
        {nextStep === 1 && (
          <StepOne
            mode={mode}
            formData={formData}
            setFormData={setFormData}
            setNextStep={setNextStep}
          />
        )}
        {nextStep === 2 && (
          <StepTwo
            mode={mode}
            formData={formData}
            setFormData={setFormData}
            setNextStep={setNextStep}
          />
        )}
        {nextStep === 3 && (
          <StepThree
            mode={mode}
            formData={formData}
            setFormData={setFormData}
            isSubmitting={isSubmitting}
          />
        )}
      </form>
    </>
  );
}

import contracte from "@/lib/contracts.json";
import { useState } from "react";

export default function StepOne({ setNextStep, formData, setFormData, mode }) {
  const [errors, setErrors] = useState({});

  const contractsTypes = [
    {
      key: "pcsolution",
      label: "PC Solution",
    },
    {
      key: "service",
      label: "Service",
    },
    {
      key: "maintenance",
      label: "Maintenance",
    },
    {
      key: "consulting",
      label: "Consulting",
    },
  ];

  const validateField = (name, value) => {
    switch (name) {
      case "cui": {
        const val = String(value || "").trim();

        if (!val) {
          return "CUI-ul este obligatoriu.";
        }

        if (!/^(RO)?[1-9]\d{1,9}$/i.test(val)) {
          return "CUI-ul este invalid.";
        }

        return "";
      }

      case "contractType":
        if (!value) {
          return "Selectați cel puțin un tip de contract.";
        }

        return "";

      default:
        return "";
    }
  };

  const handleNextStep = () => {
    // if (mode === "view") {
    //   setNextStep(2);
    //   return;
    // }

    const newErrors = {};

    const cuiError = validateField("cui", formData.cui);
    const contractTypeError = validateField("contractType", formData.type);

    if (cuiError) {
      newErrors.cui = cuiError;
    }

    if (contractTypeError) {
      newErrors.contractType = contractTypeError;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setNextStep(2);
    }
  };

  return (
    <section className="mx-auto max-w-4xl rounded-[32px] border border-slate-200 bg-white p-10 shadow-sm shadow-slate-200/50">
      <h2 className="mb-8 text-3xl font-semibold tracking-tight text-slate-900">
        Tip contract
      </h2>
      {/* CUI */}
      <div className="mb-8">
        <label
          htmlFor="cui"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          CUI
        </label>

        <input
          type="text"
          id="cui"
          name="cui"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
          value={formData.cui || ""}
          disabled={mode === "view"}
          onChange={(e) => {
            const value = e.target.value;

            setFormData((prev) => ({
              ...prev,
              cui: value,
            }));

            setErrors((prev) => ({
              ...prev,
              cui: validateField("cui", value),
            }));
          }}
        />
        {errors.cui && (
          <p className="mt-1 text-sm text-red-600">{errors.cui}</p>
        )}
      </div>
      {/* Contract Type */}
      <p className="mb-4 text-base font-semibold text-slate-800">
        Tip contract
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {contractsTypes.map((item) => {
          const isSelected = formData.type === item.key;

          return (
            <label
              key={item.key}
              htmlFor={item.key}
              className={`flex cursor-pointer items-center gap-3 rounded-3xl border p-4 transition ${
                isSelected
                  ? "border-violet-500 bg-violet-50"
                  : "border-slate-200 bg-slate-50 hover:border-violet-300 hover:bg-slate-100"
              } ${mode === "view" ? "cursor-default" : ""}`}
            >
              <input
                type="radio"
                id={item.key}
                value={item.key}
                name="contractType"
                disabled={mode === "view"}
                checked={isSelected}
                onChange={() => {
                  setFormData((prev) => ({
                    ...prev,
                    type: item.key,
                  }));

                  setErrors((prev) => ({
                    ...prev,
                    contractType: "",
                  }));
                }}
              />

              <span className="text-gray-700">{item.label}</span>
            </label>
          );
        })}
        {errors.contractType && (
          <p className="mt-1 text-sm text-red-600">{errors.contractType}</p>
        )}
      </div>
      {/* Submit */}
      <div className="mt-10 flex justify-end">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full bg-violet-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-700"
          onClick={handleNextStep}
        >
          Pasul următor
        </button>
      </div>
    </section>
  );
}

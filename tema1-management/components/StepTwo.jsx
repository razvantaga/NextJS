"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function StepTwo({ setNextStep, formData, setFormData, mode }) {
  const [errors, setErrors] = useState({});

  const warrantiesOptions = [
    {
      key: "12 luni",
      label: "12 luni",
    },
    {
      key: "6 luni",
      label: "6 luni",
    },
    {
      key: "3 luni",
      label: "3 luni",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateField = (name, value) => {
    const val = String(value || "").trim();

    switch (name) {
      case "contract_number":
        if (!val) return "Numărul contractului este obligatoriu.";
        if (val.trim().length < 3) return "Numărul contractului este invalid.";
        if (!/^[0-9A-Za-z-\s]+$/.test(val.trim())) return "Numele este invalid";
        return "";

      case "date_picker":
        if (!val) return "Data contractului este obligatorie.";
        return "";

      case "agent_name":
        if (!val) return "Numele agentului este obligatoriu.";
        if (val.trim().length < 3) return "Introduceți un nume valid.";
        if (!/^[A-Za-zĂÂÎȘȚăâîșț-\s]+$/.test(val.trim()))
          return "Numele este invalid";
        return "";

      case "company_name":
        if (!val) return "Numele companiei este obligatoriu.";
        if (val.trim().length < 2) return "Introduceți un nume valid.";
        if (!/^[0-9A-Za-zĂÂÎȘȚăâîșț-\s]+$/.test(val.trim()))
          return "Numele este invalid";
        return "";

      case "cui":
        if (!val) return "CUI-ul este obligatoriu.";
        if (!/^(RO)?[1-9]\d{1,9}$/i.test(val.trim())) return "CUI invalid.";
        return "";

      case "company_number":
        if (!val) return "Numărul de înregistrare este obligatoriu.";
        if (!/^J\d{2}\/\d+\/\d{4}$/i.test(val.trim()))
          return "Format invalid. Exemplu: J40/1234/2024.";
        return "";

      case "company_address":
        if (!val) return "Adresa companiei este obligatorie.";
        return "";

      case "company_phone":
        if (!val) return "Telefonul companiei este obligatoriu.";
        if (!/^07[2-8][0-9]{7}$/.test(val.trim()))
          return "Număr de telefon invalid.";
        return "";

      case "fax":
        if (!val) return "Faxul este obligatoriu.";
        if (val && !/^(\+4)?0\d{9}$/.test(val.replace(/\s/g, "")))
          return "Număr fax invalid.";
        return "";

      case "legal_representative":
        if (!val) return "Numele reprezentantului legal este obligatoriu.";
        if (val.trim().length < 3) return "Introduceți un nume valid.";
        if (!/^[A-Za-zĂÂÎȘȚăâîșț-\s]+$/.test(val.trim()))
          return "Numele este invalid";
        return "";

      case "legal_representative_role":
        if (!val) return "Funcția reprezentantului este obligatorie.";
        if (!/^[A-Za-zĂÂÎȘȚăâîșț-\s]+$/.test(val.trim()))
          return "Numele este invalid";
        return "";

      case "id_series":
        if (!val) return "Seria CI este obligatorie.";
        if (!/^[a-zA-Z]{2}$/i.test(val.trim()))
          return "Seria trebuie să conțină două litere.";
        return "";

      case "id_number":
        if (!val) return "Numărul CI este obligatoriu.";
        if (!/^\d{6}$/.test(val.trim()))
          return "Numărul CI trebuie să conțină 6 cifre.";
        return "";

      case "cnp":
        if (!val) return "CNP-ul este obligatoriu.";
        if (
          !/^[1-9]\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])(0[1-9]|[1-4]\d|5[0-2]|99)\d{4}$/.test(
            val.trim(),
          )
        )
          return "CNP este invalid";
        return "";

      case "phone":
        if (!val) return "Telefonul este obligatoriu.";
        if (!/^07[2-8][0-9]{7}$/.test(val.replace(/\s/g, "")))
          return "Număr de telefon invalid.";
        return "";

      case "email":
        if (!val) return "Adresa de email este obligatorie.";
        if (!/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(val.trim()))
          return "Adresa de email este invalidă.";
        return "";

      case "invoice":
        if (!val) return "Selectați o opțiune pentru invoice.";
        return "";

      case "invoice_info":
        if (!val) return "Selectați o opțiune pentru invoice_info.";
        return "";

      case "iban":
        if (!val) return "IBAN-ul este obligatoriu.";
        if (!/^RO\d{2}[A-Z]{4}\d{16}$/i.test(val.replace(/\s/g, "")))
          return "IBAN invalid.";
        return "";

      case "bank_name":
        if (!val) return "Numele băncii este obligatoriu.";
        if (val.trim().length < 2) return "Introduceți o bancă validă.";
        if (!/^[A-Za-zĂÂÎȘȚăâîșț-\s]+$/.test(val.trim()))
          return "Numele este invalid";
        return "";

      case "bank_location":
        if (!val) return "Locația băncii este obligatorie.";
        return "";

      case "payment_method":
        if (!val) return "Selectați o opțiune pentru modalitate de plată.";
        return "";

      case "warranties":
        if (!value) {
          return "Selectați o garanție.";
        }
        return "";

      case "store_name":
        if (!val) return "Numele magazinului este obligatoriu.";
        if (val.trim().length < 2) return "Introduceți un nume valid.";
        if (!/^[0-9A-Za-zĂÂÎȘȚăâîșț-\s]+$/.test(val.trim()))
          return "Numele este invalid";
        return "";

      case "store_city":
        if (!val) return "Orașul magazinului este obligatoriu.";
        if (val.trim().length < 2) return "Introduceți un oraș valid.";
        if (!/^[A-Za-zĂÂÎȘȚăâîșț-\s]+$/.test(val.trim()))
          return "Numele este invalid";
        return "";

      case "store_county":
        if (!val) return "Județul este obligatoriu.";
        return "";

      case "store_address":
        if (!val) return "Adresa magazinului este obligatorie.";
        return "";

      case "store_number":
        if (!val) return "Numărul magazinului este obligatoriu.";
        if (!/^\d+$/.test(val.trim()))
          return "Numărul magazinului trebuie să conțină doar cifre.";
        return "";

      default:
        return "";
    }
  };

  const handleNextStep = () => {
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);

      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setNextStep(3);
      return;
    }

    const firstErrorField = Object.keys(newErrors)[0];

    document.getElementById(firstErrorField)?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    document.getElementById(firstErrorField)?.focus();
  };

  return (
    <section className="mx-auto max-w-4xl rounded-[32px] border border-slate-200 bg-white p-10 shadow-sm shadow-slate-200/60">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
            Date contract
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Completează datele principale ale contractului pentru a continua.
          </p>
        </div>
      </div>

      {/* Date contract */}
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label
            htmlFor="contract_number"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Nr. contract
          </label>

          <input
            type="text"
            id="contract_number"
            name="contract_number"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            disabled={mode === "view"}
            value={formData.contract_number}
            onChange={handleChange}
          />
          {errors.contract_number && (
            <p className="mt-1 text-sm text-red-600">
              {errors.contract_number}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="date_picker"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Data contract
          </label>

          <div className="relative">
            <DatePicker
              id="date_picker"
              name="date_picker"
              selected={formData.date_picker ?? null}
              onChange={(date) =>
                setFormData((prev) => ({
                  ...prev,
                  date_picker: date,
                }))
              }
              dateFormat="dd.MM.yyyy"
              placeholderText="Selectează data"
              disabled={mode === "view"}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            />

            <span className="absolute right-4 top-1/2 -translate-y-1/2">
              <img
                src="/images/icons/datepicker.svg"
                alt="datepicker"
                width="24"
                height="23"
              />
            </span>
          </div>

          {errors.date_picker && (
            <p className="mt-1 text-sm text-red-600">{errors.date_picker}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="agent_name"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Nume agent
          </label>

          <input
            type="text"
            id="agent_name"
            name="agent_name"
            disabled={mode === "view"}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            value={formData.agent_name}
            onChange={handleChange}
          />
          {errors.agent_name && (
            <p className="mt-1 text-sm text-red-600">{errors.agent_name}</p>
          )}
        </div>
      </div>

      {/* Date companie */}
      <h3 className="mb-6 mt-10 text-xl font-semibold text-slate-800">
        Date companie
      </h3>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label
            htmlFor="company_name"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Nume companie
          </label>

          <input
            type="text"
            id="company_name"
            name="company_name"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            disabled={mode === "view"}
            value={formData.company_name}
            onChange={handleChange}
          />
          {errors.company_name && (
            <p className="mt-1 text-sm text-red-600">{errors.company_name}</p>
          )}
        </div>

        <div>
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
            disabled={mode === "view"}
            value={formData.cui}
            onChange={handleChange}
          />
          {errors.cui && (
            <p className="mt-1 text-sm text-red-600">{errors.cui}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="company_number"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            J
          </label>

          <input
            type="text"
            id="company_number"
            name="company_number"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            disabled={mode === "view"}
            value={formData.company_number}
            onChange={handleChange}
          />
          {errors.company_number && (
            <p className="mt-1 text-sm text-red-600">{errors.company_number}</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <label
          htmlFor="company_address"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Adresă sediu social
        </label>

        <input
          type="text"
          id="company_address"
          name="company_address"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
          disabled={mode === "view"}
          value={formData.company_address}
          onChange={handleChange}
        />
        {errors.company_address && (
          <p className="mt-1 text-sm text-red-600">{errors.company_address}</p>
        )}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="company_phone"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Telefon companie
          </label>

          <input
            type="text"
            id="company_phone"
            name="company_phone"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            disabled={mode === "view"}
            value={formData.company_phone}
            onChange={handleChange}
          />
          {errors.company_phone && (
            <p className="mt-1 text-sm text-red-600">{errors.company_phone}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="fax"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Fax
          </label>

          <input
            type="text"
            id="fax"
            name="fax"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            disabled={mode === "view"}
            value={formData.fax}
            onChange={handleChange}
          />
          {errors.fax && (
            <p className="mt-1 text-sm text-red-600">{errors.fax}</p>
          )}
        </div>
      </div>

      {/* Reprezentant legal */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="legal_representative"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Nume reprezentant legal
          </label>

          <input
            type="text"
            id="legal_representative"
            name="legal_representative"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            disabled={mode === "view"}
            value={formData.legal_representative}
            onChange={handleChange}
          />
          {errors.legal_representative && (
            <p className="mt-1 text-sm text-red-600">
              {errors.legal_representative}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="legal_representative_role"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            În calitate de
          </label>

          <input
            type="text"
            id="legal_representative_role"
            name="legal_representative_role"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            disabled={mode === "view"}
            value={formData.legal_representative_role}
            onChange={handleChange}
          />
          {errors.legal_representative_role && (
            <p className="mt-1 text-sm text-red-600">
              {errors.legal_representative_role}
            </p>
          )}
        </div>
      </div>

      {/* CI / CNP */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div>
          <label
            htmlFor="id_series"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            BI/CI Seria
          </label>

          <input
            type="text"
            id="id_series"
            name="id_series"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            disabled={mode === "view"}
            value={formData.id_series}
            onChange={handleChange}
          />
          {errors.id_series && (
            <p className="mt-1 text-sm text-red-600">{errors.id_series}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="id_number"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Nr.
          </label>

          <input
            type="text"
            id="id_number"
            name="id_number"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            disabled={mode === "view"}
            value={formData.id_number}
            onChange={handleChange}
          />
          {errors.id_number && (
            <p className="mt-1 text-sm text-red-600">{errors.id_number}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="cnp"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            CNP
          </label>

          <input
            type="text"
            id="cnp"
            name="cnp"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            disabled={mode === "view"}
            value={formData.cnp}
            onChange={handleChange}
          />
          {errors.cnp && (
            <p className="mt-1 text-sm text-red-600">{errors.cnp}</p>
          )}
        </div>
      </div>

      {/* Contact */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Telefon
          </label>

          <input
            type="text"
            id="phone"
            name="phone"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            disabled={mode === "view"}
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Email
          </label>

          <input
            type="email"
            id="email"
            name="email"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            disabled={mode === "view"}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Select-uri */}
      <div className="mt-6 space-y-6 grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="invoice"
            className="mb-2 block text-sm font-medium text-slate-700 min-h-12"
          >
            Factura pentru serviciul de Încărcare Electronică se va trimite în
            original prin:
          </label>

          <select
            id="invoice"
            name="invoice"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            disabled={mode === "view"}
          >
            <option>E-mail</option>
            <option>Poștă</option>
          </select>
          {errors.invoice && (
            <p className="mt-1 text-sm text-red-600">{errors.invoice}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="invoice_info"
            className="mb-2 block text-sm font-medium text-slate-700 min-h-12"
          >
            Informările de plată vor fi trimise prin:
          </label>

          <select
            id="invoice_info"
            name="invoice_info"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            disabled={mode === "view"}
          >
            <option>SMS</option>
            <option>E-mail</option>
          </select>
          {errors.invoice_info && (
            <p className="mt-1 text-sm text-red-600">{errors.invoice_info}</p>
          )}
        </div>
      </div>

      {/* Bancă */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div>
          <label
            htmlFor="iban"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Nr. cont bancar
          </label>

          <input
            type="text"
            id="iban"
            name="iban"
            placeholder="ex: ROXXXXXXXXXXXXXX"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            disabled={mode === "view"}
            value={formData.iban}
            onChange={handleChange}
          />
          {errors.iban && (
            <p className="mt-1 text-sm text-red-600">{errors.iban}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="bank_name"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Banca
          </label>

          <input
            type="text"
            id="bank_name"
            name="bank_name"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            disabled={mode === "view"}
            value={formData.bank_name}
            onChange={handleChange}
          />
          {errors.bank_name && (
            <p className="mt-1 text-sm text-red-600">{errors.bank_name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="bank_location"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Sucursala
          </label>

          <input
            type="text"
            id="bank_location"
            name="bank_location"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            disabled={mode === "view"}
            value={formData.bank_location}
            onChange={handleChange}
          />
          {errors.bank_location && (
            <p className="mt-1 text-sm text-red-600">{errors.bank_location}</p>
          )}
        </div>
      </div>

      {/* Modalitate plata */}
      <div className="mt-6">
        <label
          htmlFor="payment_method"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Modalitate de plată:
        </label>

        <select
          id="payment_method"
          name="payment_method"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
          disabled={mode === "view"}
        >
          <option>Direct debit</option>
          <option>Transfer bancar</option>
        </select>
        {errors.payment_method && (
          <p className="mt-1 text-sm text-red-600">{errors.payment_method}</p>
        )}
      </div>

      {/* Garantii */}
      <div className="mt-10">
        <p className="mb-4 text-base font-semibold text-slate-800">Garanții:</p>

        <div className="space-y-3">
          {warrantiesOptions.map((item) => (
            <label
              key={item.key}
              className="flex cursor-pointer items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-slate-700 transition hover:border-violet-300 hover:bg-slate-100"
            >
              <input
                type="radio"
                name="warranties"
                disabled={mode === "view"}
                value={item.key}
                checked={formData.warranties === item.key}
                onChange={() =>
                  setFormData((prev) => ({
                    ...prev,
                    warranties: item.key,
                  }))
                }
              />

              <span>{item.label}</span>
            </label>
          ))}

          {errors.warranties && (
            <p className="mt-1 text-sm text-red-600">{errors.warranties}</p>
          )}
        </div>
      </div>

      <h3 className="mb-6 mt-10 text-xl font-semibold text-slate-800">
        Adresă magazin
      </h3>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label
            htmlFor="store_name"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Nume magazin
          </label>

          <input
            id="store_name"
            name="store_name"
            type="text"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            disabled={mode === "view"}
            value={formData.store_name}
            onChange={handleChange}
          />
          {errors.store_name && (
            <p className="mt-1 text-sm text-red-600">{errors.store_name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="store_county"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Județ (punct de lucru)
          </label>

          <input
            type="text"
            id="store_county"
            name="store_county"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            disabled={mode === "view"}
            value={formData.store_county}
            onChange={handleChange}
          />
          {errors.store_county && (
            <p className="mt-1 text-sm text-red-600">{errors.store_county}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="store_city"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Localitate (punct de lucru)
          </label>

          <input
            id="store_city"
            name="store_city"
            type="text"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            disabled={mode === "view"}
            value={formData.store_city}
            onChange={handleChange}
          />
          {errors.store_city && (
            <p className="mt-1 text-sm text-red-600">{errors.store_city}</p>
          )}
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-4">
        <div className="md:col-span-3">
          <label
            htmlFor="store_address"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Adresă (punct de lucru)
          </label>

          <input
            id="store_address"
            name="store_address"
            type="text"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            disabled={mode === "view"}
            value={formData.store_address}
            onChange={handleChange}
          />
          {errors.store_address && (
            <p className="mt-1 text-sm text-red-600">{errors.store_address}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="store_number"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Nr. punct de lucru
          </label>

          <input
            id="store_number"
            name="store_number"
            type="number"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            disabled={mode === "view"}
            value={formData.store_number}
            onChange={handleChange}
          />
          {errors.store_number && (
            <p className="mt-1 text-sm text-red-600">{errors.store_number}</p>
          )}
        </div>
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

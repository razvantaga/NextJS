"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function Profile({ profile }) {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [formData, setFormData] = useState({
    first_name: profile.first_name,
    last_name: profile.last_name,
    email: profile.email,
    phone: profile.phone,
  });

  const validateField = (name, value) => {
    const val = String(value || "").trim();

    switch (name) {
      case "first_name":
        if (!val) return "Prenumele este obligatoriu.";
        if (val.length < 2)
          return "Prenumele trebuie să aibă cel puțin 2 caractere.";
        if (val.length > 50)
          return "Prenumele nu poate depăși 50 de caractere.";
        if (!/^[A-Za-zĂÂÎȘȚăâîșțȘșȚțĂăÂâÎî\s-]+$/.test(val))
          return "Prenumele poate conține doar litere.";
        return "";

      case "last_name":
        if (!val) return "Numele de familie este obligatoriu.";
        if (val.length < 2)
          return "Numele de familie trebuie să aibă cel puțin 2 caractere.";
        if (val.length > 50)
          return "Numele de familie nu poate depăși 50 de caractere.";
        if (!/^[A-Za-zĂÂÎȘȚăâîșțȘșȚțĂăÂâÎî\s-]+$/.test(val))
          return "Numele de familie poate conține doar litere.";
        return "";

      case "email":
        if (!val) return "Email-ul este obligatoriu.";
        if (val.length > 100)
          return "Email-ul nu poate depăși 100 de caractere.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val))
          return "Introduceți o adresă de email validă.";
        return "";

      case "phone":
        if (!val) return "Numărul de telefon este obligatoriu.";
        const phone = val.replace(/\s/g, "");
        if (!/^(\+40|0)7\d{8}$/.test(phone))
          return "Introduceți un număr de telefon valid.";
        return "";

      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);

      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstError = Object.keys(newErrors)[0];
      document
        .getElementById(firstError)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    try {
      const { data, error } = await supabase.auth.updateUser({
        email: formData.email, // Email-ul se pune direct în rădăcină
        data: {
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone: formData.phone,
        },
      });

      if (error) throw error;

      const { error: dbError } = await supabase
        .from("profiles")
        .update({
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone: formData.phone,
          email: formData.email,
        })
        .eq("id", profile.id);
      if (dbError) throw dbError;

      setMessage({
        type: "success",
        text: "Profilul a fost actualizat cu succes!",
      });
      setLoading(true);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "A apărut o eroare la salvare.",
      });
    } finally {
      setLoading(false);
    }
  };

  const name = profile.first_name + " " + profile.last_name;
  const rezultat = name
    .split(" ")
    .map((c) => c[0])
    .join("");

  return (
    <section className="mb-6 rounded-[32px] border border-slate-200 bg-white shadow-sm shadow-slate-200/50">
      <div className="border-b border-slate-200 px-6 py-5 sm:px-8">
        <h2 className="text-xl font-semibold text-slate-800">Profile</h2>
      </div>

      <div className="p-6 sm:p-8">
        {/* User info */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xl font-semibold text-violet-700">
            {rezultat}
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900">
              {profile.first_name + " " + profile.last_name}
            </h3>

            <p className="mt-1 text-sm text-slate-500">{profile.email}</p>

            <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {profile.role}
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="first_name"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                First name
              </label>

              <input
                id="first_name"
                name="first_name"
                type="text"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100"
              />
              {errors.first_name && (
                <p style={{ color: "red", margin: 0, fontSize: "13px" }}>
                  {errors.first_name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="last_name"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Last name
              </label>

              <input
                id="last_name"
                name="last_name"
                type="text"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100"
              />
              {errors.last_name && (
                <p style={{ color: "red", margin: 0, fontSize: "13px" }}>
                  {errors.last_name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100"
              />
              {errors.email && (
                <p style={{ color: "red", margin: 0, fontSize: "13px" }}>
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Phone number
              </label>

              <input
                id="phone"
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100"
              />
              {errors.phone && (
                <p style={{ color: "red", margin: 0, fontSize: "13px" }}>
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              disabled={loading}
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-violet-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-700"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

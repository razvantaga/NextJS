"use client";

import LeftSide from "@/components/Auth/LeftSide";
import { FiEye } from "react-icons/fi";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const benefits = [
    "Unlimited contracts & documents",
    "Automatic contract tracking",
    "Role based access control",
  ];

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
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

      case "password":
        if (!val) return "Parola este obligatorie.";
        if (val.length < 8)
          return "Parola trebuie să aibă cel puțin 8 caractere.";
        if (val.length > 72) return "Parola nu poate depăși 72 de caractere.";
        if (!/[A-Z]/.test(val))
          return "Parola trebuie să conțină cel puțin o literă mare.";
        if (!/[a-z]/.test(val))
          return "Parola trebuie să conțină cel puțin o literă mică.";
        if (!/[0-9]/.test(val))
          return "Parola trebuie să conțină cel puțin o cifră.";
        if (!/[^A-Za-z0-9]/.test(val))
          return "Parola trebuie să conțină cel puțin un caracter special.";
        return "";

      case "confirm_password":
        if (!val) return "Confirmarea parolei este obligatorie.";

        if (val !== formData.password) return "Parolele nu coincid.";

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

    console.log("Form submitted successfully:", formData);

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone: formData.phone,
        },
      },
    });

    if (error) {
      console.error("Error signing up:", error.message);
    } else {
      console.log("Sign up successful:", data);
      router.push("/dashboard");
    }
  };

  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-slate-100">
      {/* Brand section */}
      <LeftSide
        benefits={benefits}
        title="Manage your contracts with confidence."
        subtitle="Create your workspace and start managing contracts, documents and approvals from one centralized platform."
      />

      {/* Form section */}
      <section className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <h2 className="font-serif text-3xl font-semibold text-slate-900">
            Create your account
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Start managing contracts in minutes.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  className="mb-2 block text-sm font-medium text-slate-700"
                  htmlFor="first_name"
                >
                  First name
                </label>

                <input
                  type="text"
                  placeholder="Alex"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                  name="first_name"
                  onChange={handleChange}
                />
                {errors.first_name && (
                  <p style={{ color: "red", margin: 0, fontSize: "13px" }}>
                    {errors.first_name}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-medium text-slate-700"
                  htmlFor="last_name"
                >
                  Last name
                </label>

                <input
                  type="text"
                  placeholder="Rivera"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                  name="last_name"
                  onChange={handleChange}
                />
                {errors.last_name && (
                  <p style={{ color: "red", margin: 0, fontSize: "13px" }}>
                    {errors.last_name}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  className="mb-2 block text-sm font-medium text-slate-700"
                  htmlFor="email"
                >
                  Email address
                </label>

                <input
                  type="email"
                  placeholder="you@company.com"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                  name="email"
                  onChange={handleChange}
                />
                {errors.email && (
                  <p style={{ color: "red", margin: 0, fontSize: "13px" }}>
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-medium text-slate-700"
                  htmlFor="phone"
                >
                  Phone
                </label>

                <input
                  type="text"
                  placeholder="0700000000"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                  name="phone"
                  onChange={handleChange}
                />
                {errors.phone && (
                  <p style={{ color: "red", margin: 0, fontSize: "13px" }}>
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  className="mb-2 block text-sm font-medium text-slate-700"
                  htmlFor="password"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    type="password"
                    placeholder="Create password"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 pr-12 text-sm text-slate-700 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                    name="password"
                    onChange={handleChange}
                  />

                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    <FiEye size={18} />
                  </button>

                  {errors.password && (
                    <p style={{ color: "red", margin: 0, fontSize: "13px" }}>
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-medium text-slate-700"
                  htmlFor="confirm_password"
                >
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    type="password"
                    placeholder="Create password"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 pr-12 text-sm text-slate-700 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                    name="confirm_password"
                    onChange={handleChange}
                  />

                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    <FiEye size={18} />
                  </button>

                  {errors.confirm_password && (
                    <p style={{ color: "red", margin: 0, fontSize: "13px" }}>
                      {errors.confirm_password}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div>
              {/* Password strength */}
              <div className="mt-3 flex gap-1">
                <span className="h-1 flex-1 rounded bg-amber-500" />
                <span className="h-1 flex-1 rounded bg-amber-500" />
                <span className="h-1 flex-1 rounded bg-slate-200" />
                <span className="h-1 flex-1 rounded bg-slate-200" />
              </div>

              <p className="mt-2 text-xs text-slate-500">
                Password strength:
                <span className="ml-1 font-medium text-amber-600">Medium</span>
              </p>
            </div>

            <label className="flex items-start gap-3 text-sm text-slate-500">
              <input type="checkbox" className="mt-1 accent-slate-900" />

              <span>
                I agree with the
                <a className="mx-1 font-medium text-slate-900">
                  Terms of Service
                </a>
                and
                <a className="ml-1 font-medium text-slate-900">
                  Privacy Policy
                </a>
              </span>
            </label>

            <button
              type="submit"
              className="w-full rounded-lg bg-slate-900 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Create account
            </button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-slate-400">
            <span className="h-px flex-1 bg-slate-200" />
            or continue with
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="rounded-lg border border-slate-200 bg-white py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400">
              Google
            </button>

            <button className="rounded-lg border border-slate-200 bg-white py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400">
              Microsoft
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?
            <a className="ml-1 font-medium text-slate-900">Log in</a>
          </p>
        </div>
      </section>
    </main>
  );
}

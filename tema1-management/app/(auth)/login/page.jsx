"use client";

import LeftSide from "@/components/Auth/LeftSide";
import { FiEye } from "react-icons/fi";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const beneifits = [
    "Centralized contract management",
    "Document tracking and approvals",
    "Role based access control",
  ];

  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const validateField = (name, value) => {
    const val = String(value || "").trim();

    switch (name) {
      case "email":
        if (!val) return "Email-ul este obligatoriu.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          return "Introduceți o adresă de email validă.";
        }
        return "";

      case "password":
        if (!val) return "Parola este obligatorie.";
        if (val.length < 8) {
          return "Parola trebuie să aibă cel puțin 8 caractere.";
        }
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

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      console.error("Error signing in:", error.message);
    } else {
      console.log("Sign in successful:", data);
      router.push("/dashboard");
    }
  };

  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-slate-100">
      <LeftSide
        benefits={beneifits}
        title="Every contract, exactly where it should be."
        subtitle="Track renewals, manage documents and keep your team aligned. Everything you need for professional contract management."
      />

      <section className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <h2 className="font-serif text-3xl font-semibold text-slate-900">
            Welcome back
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Log in to your account to continue.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@company.com"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
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
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 pr-12 text-sm text-slate-700 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                  onChange={handleChange}
                />
                {errors.password && (
                  <p style={{ color: "red", margin: 0, fontSize: "13px" }}>
                    {errors.password}
                  </p>
                )}
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  <FiEye size={18} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input type="checkbox" className="accent-slate-900" />
                Remember me
              </label>

              <a
                href="#"
                className="font-medium text-slate-900 hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-slate-900 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Log in
            </button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-slate-400">
            <span className="h-px flex-1 bg-slate-200" />
            or continue with
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className=" rounded-lg border border-slate-200 bg-white py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400">
              Google
            </button>

            <button className="rounded-lg border border-slate-200 bg-white py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400">
              Microsoft
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            Dont have an account?
            <a
              href="/signup"
              className="ml-1 font-medium text-slate-900 hover:underline"
            >
              Sign up
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}

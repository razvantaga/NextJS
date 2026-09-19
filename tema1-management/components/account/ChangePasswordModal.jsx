"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

export default function ChangePasswordModal({ onClose }) {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      setErrors((prevErr) => ({
        ...prevErr,
        [name]: validateField(name, value, updated),
        ...(name === "newPassword"
          ? {
              confirmNewPassword: validateField(
                "confirmNewPassword",
                updated.confirmNewPassword,
                updated,
              ),
            }
          : {}),
      }));

      return updated;
    });
  };

  const validateField = (name, value, allValues = formData) => {
    const val = String(value || "").trim();

    switch (name) {
      case "currentPassword":
        if (!val) return "Parola curentă este obligatorie.";
        return "";

      case "newPassword":
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

      case "confirmNewPassword":
        if (!val) return "Confirmarea parolei este obligatorie.";

        if (val !== allValues.newPassword) return "Parolele nu coincid.";

        return "";

      default:
        return "";
    }
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
      return;
    }

    try {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData?.user?.email) {
        console.error("User email not found.");
        return;
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: userData.user.email,
        password: formData.currentPassword,
      });

      if (signInError) {
        console.error("Current password is incorrect:", signInError);
        setErrors((prev) => ({
          ...prev,
          currentPassword: "Parola curentă este incorectă.",
        }));
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: formData.newPassword,
      });

      if (updateError) {
        console.error("Error updating password:", updateError);
        return;
      }

      console.log("Password updated successfully.");
      onClose();
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-2xl">
        <div className="border-b border-slate-200 px-6 py-5 sm:px-7">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Change password
              </h2>

              <p className="mt-1 text-sm leading-5 text-slate-500">
                Update your password to keep your account secure.
              </p>
            </div>
          </div>
        </div>

        <form className="px-6 py-6 sm:px-7" onSubmit={(e) => handleSubmit(e)}>
          <div className="space-y-5">
            <div>
              <label
                htmlFor="currentPassword"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Current password
              </label>

              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                placeholder="Enter your current password"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                value={formData.currentPassword}
                onChange={(e) => handleChange(e)}
              />
              {errors.currentPassword && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.currentPassword}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                New password
              </label>

              <input
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="Enter your new password"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                value={formData.newPassword}
                onChange={(e) => handleChange(e)}
              />
              {errors.newPassword && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.newPassword}
                </p>
              )}

              <p className="mt-2 text-xs text-slate-400">
                Use at least 8 characters with a mix of letters and numbers.
              </p>
            </div>

            <div>
              <label
                htmlFor="confirmNewPassword"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Confirm new password
              </label>

              <input
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                placeholder="Repeat your new password"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                value={formData.confirmNewPassword}
                onChange={(e) => handleChange(e)}
              />
              {errors.confirmNewPassword && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.confirmNewPassword}
                </p>
              )}
            </div>
          </div>

          <div className="mt-7 flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-100"
            >
              Change password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

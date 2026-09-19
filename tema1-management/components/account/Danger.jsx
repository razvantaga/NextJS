"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

export default function Danger() {
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      setUserId(data?.user?.id ?? null);
    })();
  }, []);

  const handleDeactivateAccount = async () => {
    if (!userId) {
      console.error("User not found.");
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        is_active: false,
      })
      .eq("id", userId);

    if (error) {
      console.error("Deactivate account error:", error);
      return;
    }

    console.log("Account deactivated successfully.");

    setShowModal(false);

    await supabase.auth.signOut();

    window.location.href = "/login";
  };
  return (
    <>
      <section className="rounded-[32px] border border-red-200 bg-white shadow-sm shadow-slate-200/50">
        <div className="border-b border-red-100 px-6 py-5 sm:px-8">
          <h2 className="text-xl font-semibold text-red-700">Danger zone</h2>
        </div>

        <div className="flex flex-col gap-5 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <h3 className="font-semibold text-slate-800">Deactivate account</h3>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
              Youll lose access to this workspace. An administrator can
              reactivate your account later.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="rounded-full border border-red-200 bg-white px-5 py-2.5 text-sm font-medium text-red-600 transition hover:border-red-300 hover:bg-red-50"
          >
            Deactivate
          </button>
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[28px] bg-white p-6 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-xl text-red-600">
              !
            </div>

            <h2 className="mt-5 text-xl font-semibold text-slate-900">
              Deactivate your account?
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Are you sure you want to deactivate your account? You will
              immediately lose access to the application.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                onClick={() => handleDeactivateAccount(userId)}
              >
                Deactivate account
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

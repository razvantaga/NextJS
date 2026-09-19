"use client";

import ChangePasswordModal from "./ChangePasswordModal";
import { useState } from "react";
import ManageSessionsModal from "./ManageSessionsModal";

export default function Security() {
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
  const [manageSessionsModalOpen, setManageSessionsModalOpen] = useState(false);

  return (
    <section className="mb-6 rounded-[32px] border border-slate-200 bg-white shadow-sm shadow-slate-200/50">
      <div className="border-b border-slate-200 px-6 py-5 sm:px-8">
        <h2 className="text-xl font-semibold text-slate-800">Security</h2>
      </div>

      <div className="divide-y divide-slate-200">
        <div className="flex flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <h3 className="font-semibold text-slate-800">Password</h3>
            <p className="mt-1 text-sm text-slate-500">
              Keep your account protected with a strong password.
            </p>
          </div>

          <button
            type="button"
            className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-violet-300 hover:bg-violet-50"
            onClick={() => setChangePasswordModalOpen(true)}
          >
            Change password
          </button>
        </div>

        <div className="flex flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <h3 className="font-semibold text-slate-800">
              Two-factor authentication
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Adds an extra layer of security when logging in.
            </p>
          </div>

          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Enabled
          </span>
        </div>

        <div className="flex flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <h3 className="font-semibold text-slate-800">Active sessions</h3>
            <p className="mt-1 text-sm text-slate-500">
              Manage devices currently signed in to your account.
            </p>
          </div>

          <button
            type="button"
            className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-violet-300 hover:bg-violet-50"
            onClick={() => setManageSessionsModalOpen(true)}
          >
            Manage sessions
          </button>
        </div>
      </div>

      {changePasswordModalOpen && (
        <ChangePasswordModal
          onClose={() => setChangePasswordModalOpen(false)}
        />
      )}

      {manageSessionsModalOpen && (
        <ManageSessionsModal
          onClose={() => setManageSessionsModalOpen(false)}
        />
      )}
    </section>
  );
}

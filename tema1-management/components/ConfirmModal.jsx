"use client";

import { FiAlertTriangle, FiX } from "react-icons/fi";

export default function ConfirmModal({
  open,
  title = "Confirmare",
  message,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
              <FiAlertTriangle size={24} />
            </div>

            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          </div>

          <button
            onClick={onCancel}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Content */}
        <p className="mt-5 text-sm text-slate-600">{message}</p>

        {/* Actions */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-full border border-slate-200 px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Anulează
          </button>

          <button
            onClick={onConfirm}
            className="rounded-full bg-red-600 px-5 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Șterge
          </button>
        </div>
      </div>
    </div>
  );
}

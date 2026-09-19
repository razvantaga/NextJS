"use client";

import { FiTrash2, FiEye, FiSend, FiLoader } from "react-icons/fi";
import { useRef } from "react";
import { supabase } from "@/lib/supabase/client";

const formatFileSize = (size) => {
  if (size < 1024) return `${size} B`;

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / 1024 / 1024).toFixed(1)} MB`;
};

export default function StepThree({
  formData,
  mode,
  setFormData,
  isSubmitting,
}) {
  const fileInputRef = useRef(null);

  const handleAddFile = async (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    try {
      const newFile = {
        id: crypto.randomUUID(),
        name: selectedFile.name,
        type: selectedFile.type,
        size: selectedFile.size,
        file: selectedFile,
      };

      setFormData((prev) => ({
        ...prev,
        files: [...(prev.files || []), newFile],
      }));

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("File upload error:", error);
      alert("A apărut o eroare la adăugarea fișierului.");
    }
  };

  const handleDeleteFile = async (file) => {
    try {
      if (file?.path) {
        const { error } = await supabase.storage
          .from("contract-files")
          .remove([file.path]);

        if (error) {
          console.error("Delete storage error:", error);
          alert("Fișierul nu a putut fi șters.");
          return;
        }
      }

      setFormData((prev) => ({
        ...prev,
        files: (prev.files || []).filter((item) => item.id !== file.id),
      }));
    } catch (error) {
      console.error("Delete file error:", error);
      alert("A apărut o eroare la ștergerea fișierului.");
    }
  };

  const handleViewFile = async (file) => {
    if (!file?.path) {
      alert("Fișierul nu poate fi vizualizat.");
      return;
    }

    try {
      const { data, error } = await supabase.storage
        .from("contract-files")
        .createSignedUrl(file.path, 60);

      if (error) {
        console.error("Preview error:", error);
        alert("Fișierul nu poate fi vizualizat.");
        return;
      }

      window.open(data.signedUrl, "_blank");
    } catch (error) {
      console.error("Preview error:", error);
      alert("A apărut o eroare la vizualizarea fișierului.");
    }
  };

  return (
    <section>
      {/* Contract Header */}

      <div className="rounded-[28px] bg-slate-100 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              {formData.company_name || "Contract nou"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Verifică detaliile contractului și atașează documentele necesare.
            </p>
          </div>

          <div className="inline-flex items-center gap-3 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm shadow-slate-200">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700">
              {formData.status || "rejected"}
            </span>

            <span>{formData.contract_number || "#0000"}</span>
          </div>
        </div>
      </div>

      {/* Documente */}

      <div className="mt-8">
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-slate-800">Documente</h3>

            <p className="text-sm text-slate-500">
              Încarcă sau previzualizează documentele relevante pentru contract.
            </p>
          </div>

          {mode !== "view" && (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleAddFile}
                className="hidden"
                aria-label="Adaugă fișier"
              />

              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full border border-violet-600 bg-white px-6 py-3 text-sm font-medium text-violet-600 transition hover:border-violet-500 hover:bg-violet-50 disabled:cursor-not-allowed disabled:border-slate-300 disabled:bg-slate-100 disabled:text-slate-400"
                onClick={() => fileInputRef.current?.click()}
              >
                Adaugă fișier
              </button>
            </div>
          )}
        </div>

        {/* Lista fișiere */}

        <div className="space-y-4">
          {(formData.files || []).length === 0 ? (
            <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
              Nu există fișiere încă. Adaugă unul pentru a continua.
            </div>
          ) : (
            formData.files.map((doc) => (
              <div
                key={doc.id}
                className="rounded-[28px] border border-slate-200 bg-slate-50 p-4 transition hover:border-violet-300 hover:bg-white"
              >
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div>
                    <p className="font-medium text-slate-800">{doc.name}</p>

                    <div className="mt-1 flex flex-wrap gap-3 text-sm text-slate-500">
                      {doc.type && <span>{doc.type}</span>}

                      <span>{formatFileSize(doc.size)}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-violet-300 hover:bg-slate-100"
                      onClick={() => handleViewFile(doc)}
                    >
                      <FiEye size={18} />
                      Vizualizează
                    </button>

                    {mode !== "view" && (
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 transition hover:border-red-300 hover:bg-red-50"
                        onClick={() => handleDeleteFile(doc)}
                      >
                        <FiTrash2 size={18} />
                        Șterge
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Submit */}

      {mode !== "view" && (
        <div className="mt-10 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-violet-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <FiLoader className="animate-spin" size={18} />
                Se trimite...
              </>
            ) : (
              <>
                <FiSend size={18} />
                Trimite spre aprobare
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
}

"use client";

import Link from "next/link";
import { deleteContract } from "@/app/(protected)/contracts/actions";
import { FiTrash2, FiEdit2, FiEye } from "react-icons/fi";
import { toast } from "sonner";
import ConfirmModal from "@/components/ConfirmModal";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

const permissions = {
  admin: ["view", "add", "edit", "delete"],
  manager: ["view", "add", "edit"],
  user: ["view", "add"],
};

const can = (role, action) => {
  return permissions[role]?.includes(action) ?? false;
};

export default function Contract({ contract }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const { data } = await supabase.auth.getUser();
        const user = data?.user;

        console.log("Contract: fetched user:", user);

        if (!user) {
          console.warn("Contract: no authenticated user found");
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        console.log(
          "Contract: fetched profile:",
          profile,
          "error:",
          profileError,
        );

        if (!mounted) return;
        setRole(profile?.role ?? null);
      } catch (err) {
        console.error("Contract: error fetching role:", err);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const handleDelete = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const result = await deleteContract(contract.id, user?.id ?? null);

      setShowDeleteModal(false);

      if (result.success) {
        toast.success("Contract șters cu succes!");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("A apărut o eroare la ștergerea contractului");
    }
  };

  return (
    <>
      <div className="relative rounded-[28px] border border-slate-200 bg-white px-6 py-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl">
        <div className="grid grid-cols-4 items-center gap-4">
          {/* Companie */}
          <div>
            <p className="font-semibold text-slate-800">
              {contract.company_name || "Fără companie"}
            </p>

            {contract.cui && (
              <p className="mt-1 text-xs text-slate-500">CUI: {contract.cui}</p>
            )}
          </div>

          {/* Tip contract */}
          <div className="text-center">
            <p className="text-sm text-slate-700">{contract.type || "-"}</p>
          </div>

          {/* Status */}
          <div className="text-center">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
                contract.status === "active"
                  ? "bg-emerald-100 text-emerald-700"
                  : contract.status === "pending"
                    ? "bg-amber-100 text-amber-700"
                    : contract.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-slate-100 text-slate-700"
              }`}
            >
              {contract.status}
            </span>
          </div>

          {/* Acțiuni */}
          <div className="flex justify-end gap-2">
            {/* Vizualizare */}
            {can(role, "view") && (
              <Link
                href={`/contracts/${contract.id}`}
                title="Vizualizare"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-violet-100 hover:text-violet-600"
              >
                <FiEye size={18} />
              </Link>
            )}

            {/* Modificare */}
            {can(role, "edit") && (
              <Link
                href={`/contracts/${contract.id}/edit`}
                title="Modifică"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-violet-100 hover:text-violet-600"
              >
                <FiEdit2 size={18} />
              </Link>
            )}

            {/* Ștergere */}
            {can(role, "delete") && (
              <button
                type="button"
                title="Șterge"
                onClick={() => setShowDeleteModal(true)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-red-100 hover:text-red-600"
              >
                <FiTrash2 size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      <ConfirmModal
        open={showDeleteModal}
        title="Ștergere contract"
        message={`Ești sigur că dorești să ștergi contractul ${
          contract.company_name || ""
        }?`}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}

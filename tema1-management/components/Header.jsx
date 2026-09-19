"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log("Logout error: ", error);
      return;
    }

    router.push("/login");
  };

  return (
    <>
      <header
        id="ppHeader"
        className="border-b border-slate-200 bg-white/95 backdrop-blur-xl shadow-sm"
      >
        <div className="mx-auto max-w-7xl px-4 py-5">
          <nav className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Zona Stanga: Logo si Titlu */}
            <Link href="/" className="flex items-center gap-4">
              {/* Logo-ul tau */}

              <div>
                <p className="text-lg font-semibold tracking-tight text-slate-900">
                  Contract Manager
                </p>
                <p className="text-sm text-slate-500">
                  Centralizează toate contractele și monitorizează performanța.
                </p>
              </div>
            </Link>

            {/* Zona Dreapta: Navigare si Logout */}
            <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-600">
              <Link
                href="/dashboard"
                className="transition hover:text-violet-600"
              >
                Dashboard
              </Link>
              <Link
                href="/contracts"
                className="transition hover:text-violet-600"
              >
                Contracts
              </Link>
              <Link
                href="/account"
                className="transition hover:text-violet-600"
              >
                My Account
              </Link>

              {/* Buton de Logout */}
              <button
                onClick={handleLogout} // Inlocuieste cu functia ta de logout
                className="rounded-full bg-slate-100 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-200"
              >
                Logout
              </button>

              {/* Butonul existent pentru Creare Contract */}
              <Link
                href="/contracts/create"
                className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-5 py-3 font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-700"
              >
                <img
                  src="/images/icons/add-white.svg"
                  alt="Contract nou"
                  width={16}
                  height={16}
                />
                Creează contract
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}

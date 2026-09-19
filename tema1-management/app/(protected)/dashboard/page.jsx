"use client";

import ContractTypeChart from "@/components/Dashboard/ContractTypeChar";
import StatusPieChart from "@/components/Dashboard/StatusPieChar";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import RecentContracts from "@/components/Dashboard/RecentContract";
import ActivityFeed from "@/components/Dashboard/AcivityFeed";
import Link from "next/link";
import ContractGrowthChart from "@/components/Dashboard/ContractGrouthChart";
import { supabase } from "@/lib/supabase/client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";

export default function Dashboard() {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    const getContracts = async () => {
      const { data, error } = await supabase
        .from("contracts")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        console.error("Eroare la încărcarea contractelor:", error);
        return;
      }

      setContracts(data || []);
    };

    getContracts();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      <Header />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
              Dashboard
            </h1>

            <p className="mt-2 text-slate-500">
              Overview of all contracts and recent activity.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contracts/create"
              className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-violet-700 hover:shadow-md"
            >
              + Adaugă contract
            </Link>

            <Link
              href="/contracts"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700"
            >
              Vezi contracte
            </Link>
          </div>
        </div>

        <DashboardHeader contracts={contracts} />

        <section className="mb-8 grid gap-6 xl:grid-cols-2">
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
            <div className="mb-8 flex items-start justify-between flex-col">
              <h2 className="text-xl font-semibold text-slate-900">
                Contracts by status
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Distribution of all contracts grouped by contract status.
              </p>
            </div>
            <StatusPieChart contracts={contracts} />
          </div>
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900">
                Contracts by type
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Distribution of all contracts grouped by contract type.
              </p>
            </div>
            <ContractTypeChart contracts={contracts} />;
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-2 mb-8">
          <ContractGrowthChart />
          <RecentContracts contracts={contracts} />
        </section>

        <section className="grid gap-6 xl:grid-cols-1">
          <ActivityFeed />
        </section>
      </div>
    </main>
  );
}

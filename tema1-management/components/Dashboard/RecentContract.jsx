"use client";

import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function RecentContracts({ contracts }) {
  const recentContracts = [...contracts].reverse().slice(0, 3);

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">
          Recent Contracts
        </h2>

        <Link
          href="/contracts"
          className="flex items-center gap-2 text-sm font-medium text-violet-600 hover:text-violet-700"
        >
          View all
          <FiArrowRight size={16} />
        </Link>
      </div>

      <div className="space-y-4">
        {recentContracts.map((contract) => (
          <div
            key={contract.id}
            className=" flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-violet-300 hover:bg-white"
          >
            <div>
              <p className="font-semibold text-slate-800">
                {contract.company_name}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {contract.contract_number}
              </p>
            </div>

            <div className="text-right">
              <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                {contract.status}
              </span>

              <p className="mt-2 text-sm text-slate-500">{contract.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

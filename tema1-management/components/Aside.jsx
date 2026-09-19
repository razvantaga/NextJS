"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Aside({ contracts, handleFilterChange }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);

  const typeLabels = {
    maintenance: "Maintenance",
    pcsolution: "PC Solution",
    consulting: "Consulting",
    service: "Services",
  };

  const statusLabel = {
    active: "Semnat",
    pending: "În așteptare",
    rejected: "Respins",
  };

  const contractsStatus = Array.from(
    contracts
      .reduce((map, contract) => {
        const key = contract.status;

        if (!map.has(key)) {
          map.set(key, {
            key,
            label: statusLabel[key] || key,
            count: 1,
          });
        } else {
          map.get(key).count++;
        }

        return map;
      }, new Map())
      .values(),
  );

  // afisare tipurilor unice si contorizare lor
  const contractsTypes = Array.from(
    contracts
      .reduce((map, contract) => {
        const key = contract.type;

        if (!map.has(key)) {
          map.set(key, {
            key,
            label: typeLabels[key] || key,
            count: 1,
          });
        } else {
          map.get(key).count++;
        }

        return map;
      }, new Map())
      .values(),
  );
  return (
    <>
      <aside
        id="filters"
        className="w-full rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm lg:w-72"
      >
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">Filtre</p>
            <p className="text-xs text-slate-500">
              Refinează lista după status și tip
            </p>
          </div>

          <button
            id="closeFilters"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition hover:bg-slate-100 lg:hidden"
          >
            <img
              src="/images/icons/close.svg"
              alt="close"
              width={14}
              height={14}
            />
          </button>
        </div>

        {/* Status contract */}
        <div className="border-b border-gray-200 pb-5">
          <button className="mb-4 flex w-full items-center justify-between text-left text-base font-semibold text-gray-800">
            Status contract
          </button>

          <div className="space-y-3">
            {Array.from(contractsStatus).map((itm, index) => (
              <div key={index} className="flex items-center gap-3">
                <label
                  htmlFor={index}
                  className="flex cursor-pointer items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition hover:border-violet-300"
                >
                  <input
                    type="checkbox"
                    id={index}
                    value={itm.key}
                    className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                    checked={searchParams.getAll("status").includes(itm.key)}
                    onChange={(e) =>
                      handleFilterChange("status", itm.key, e.target.checked)
                    }
                  />{" "}
                  {itm.label} ({itm.count})
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Tip contract */}
        <div className="border-b border-slate-200 py-5">
          <h2 className="mb-4 text-base font-semibold text-slate-900">
            Tip contract
          </h2>

          <div className="space-y-3">
            {Array.from(contractsTypes).map((itm, index) => (
              <label
                key={index}
                className="flex cursor-pointer items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition hover:border-violet-300"
              >
                <input
                  type="checkbox"
                  id={index}
                  value={itm.key}
                  className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                  checked={searchParams.getAll("type").includes(itm.key)}
                  onChange={(e) =>
                    handleFilterChange("type", itm.key, e.target.checked)
                  }
                />

                <span>
                  {itm.label}{" "}
                  <span className="text-slate-500">({itm.count})</span>
                </span>
              </label>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}

"use client";

import { FiFileText, FiCheckCircle, FiClock, FiXCircle } from "react-icons/fi";

export default function DashboardHeader({ contracts = [] }) {
  const totalContracts = contracts.length;

  const statusCount = contracts.reduce((acc, contract) => {
    const status = contract.status || "unknown";

    acc[status] = (acc[status] || 0) + 1;

    console.log(`Status: ${status}, Count: ${acc[status]}`); // Debugging line

    return acc;
  }, {});

  const stats = [
    {
      label: "Total Contracts",
      value: totalContracts,
      description: "All contracts",
      icon: FiFileText,
      iconStyle: "bg-slate-100 text-slate-600",
      valueStyle: "text-slate-900",
    },
    {
      label: "Active Contracts",
      value: statusCount.active || 0,
      description: "Currently active",
      icon: FiCheckCircle,
      iconStyle: "bg-emerald-100 text-emerald-600",
      valueStyle: "text-emerald-600",
    },
    {
      label: "Pending Contracts",
      value: statusCount.pending || 0,
      description: "Waiting approval",
      icon: FiClock,
      iconStyle: "bg-amber-100 text-amber-600",
      valueStyle: "text-amber-600",
    },
    {
      label: "Rejected Contracts",
      value: statusCount.rejected || 0,
      description: "Rejected contracts",
      icon: FiXCircle,
      iconStyle: "bg-red-100 text-red-600",
      valueStyle: "text-red-600",
    },
  ];

  return (
    <section className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50 transition duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500">{item.label}</p>

                <h2
                  className={`mt-3 text-4xl font-semibold ${item.valueStyle}`}
                >
                  {item.value}
                </h2>
              </div>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.iconStyle}`}
              >
                <Icon size={24} />
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-500">{item.description}</p>
          </div>
        );
      })}
    </section>
  );
}

"use client";

import contracts from "@/lib/contracts.json";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const months = [
  "Ian",
  "Feb",
  "Mar",
  "Apr",
  "Mai",
  "Iun",
  "Iul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function ContractGrowthChart() {
  const currentYear = new Date().getFullYear();

  const chartData = months.map((month) => ({
    month,
    contracts: 0,
  }));

  contracts.forEach((contract) => {
    if (!contract.datePicker) return;

    const date = new Date(contract.datePicker);
    const year = date.getFullYear();
    const month = date.getMonth();

    if (year === currentYear) {
      chartData[month].contracts++;
    }
  });

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-slate-900">
          Contract Growth
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Number of contracts created each month ({currentYear})
        </p>
      </div>

      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="contractGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.4} />

                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" />

            <XAxis
              dataKey="month"
              tick={{
                fill: "#64748b",
                fontSize: 13,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              allowDecimals={false}
              tick={{
                fill: "#64748b",
                fontSize: 13,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="contracts"
              stroke="#7c3aed"
              strokeWidth={3}
              fill="url(#contractGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#ef4444", "#f59e0b", "#22c55e"];

export default function StatusPieChart({ contracts = [] }) {
  const statusData = Object.values(
    contracts.reduce((acc, contract) => {
      const statusKey = contract.status || "unknown";
      const statusLabel = contract.status || "Necunoscut";

      if (!acc[statusKey]) {
        acc[statusKey] = {
          name: statusLabel,
          value: 0,
        };
      }

      acc[statusKey].value++;

      return acc;
    }, {}),
  );

  const total = statusData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="flex flex-col items-center gap-8 lg:flex-row">
      {/* Chart */}
      <div className="h-[260px] w-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={statusData}
              dataKey="value"
              innerRadius={65}
              outerRadius={90}
              paddingAngle={3}
            >
              {statusData.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex-1 space-y-4">
        {statusData.map((item, index) => {
          const percent = total ? ((item.value / total) * 100).toFixed(0) : 0;

          return (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-sm"
                  style={{
                    backgroundColor: COLORS[index % COLORS.length],
                  }}
                />

                <span className="text-sm text-slate-700">{item.name}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-500">{item.value}</span>

                <span className="font-semibold text-slate-900">{percent}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

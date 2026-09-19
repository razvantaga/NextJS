"use client";

export default function ContractTypeChart({ contracts = [] }) {
  // Grupează contractele după tip
  const groupedTypes = Object.values(
    contracts.reduce((acc, contract) => {
      const type = contract.type || "Necunoscut";

      if (!acc[type]) {
        acc[type] = {
          type,
          count: 0,
        };
      }

      acc[type].count++;

      return acc;
    }, {}),
  );

  // Sortează descrescător
  groupedTypes.sort((a, b) => b.count - a.count);

  const totalContracts = groupedTypes.reduce(
    (sum, item) => sum + item.count,
    0,
  );

  const maxCount = Math.max(...groupedTypes.map((item) => item.count), 1);

  return (
    <>
      {groupedTypes.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 py-12 text-center">
          <p className="text-sm text-slate-500">No contracts available.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {groupedTypes.map((item) => {
            const percentage = (item.count / totalContracts) * 100;

            return (
              <div key={item.type}>
                {/* Header */}
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium text-slate-700">
                    {item.type}
                  </span>

                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-500">
                      {percentage.toFixed(0)}%
                    </span>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {item.count}
                    </span>
                  </div>
                </div>

                {/* Progress */}
                <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-violet-600 transition-all duration-700"
                    style={{
                      width: `${(item.count / maxCount) * 100}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

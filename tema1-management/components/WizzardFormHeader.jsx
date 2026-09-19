export default function WizardFormHeader({ currStep }) {
  const steps = [
    { label: "Selecție contract", step: 1 },
    { label: "Date contract", step: 2 },
    { label: "Documente anexe", step: 3 },
  ];

  return (
    <div className="mb-10 rounded-[32px] border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-200/50">
      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((item) => {
          const state =
            item.step < currStep
              ? "completed"
              : item.step === currStep
                ? "current"
                : "upcoming";

          return (
            <div key={item.step} className="flex items-center gap-4">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-semibold ${
                  state === "completed"
                    ? "bg-violet-600 text-white"
                    : state === "current"
                      ? "border border-violet-600 bg-white text-violet-600 shadow-sm"
                      : "border border-slate-300 bg-white text-slate-400"
                }`}
              >
                {item.step}
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {item.label}
                </p>

                <p className="text-xs text-slate-500">
                  {state === "current"
                    ? "Completează detaliile contractului"
                    : state === "completed"
                      ? "Finalizat"
                      : "În așteptare"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

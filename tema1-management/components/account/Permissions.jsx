import { permissionsByRole } from "@/lib/permissions";

export default function Permissions({ role }) {
  const permissions = permissionsByRole[role] || {
    allowed: [],
    denied: [],
  };

  return (
    <section className="mb-6 rounded-[32px] border border-slate-200 bg-white shadow-sm shadow-slate-200/50">
      <div className="border-b border-slate-200 px-6 py-5 sm:px-8">
        <h2 className="text-xl font-semibold text-slate-800">
          Role & permissions
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Your access is determined by your workspace role.
        </p>
      </div>

      <div className="p-6 sm:p-8">
        <ul className="space-y-4">
          {permissions.allowed.map((permission) => (
            <li
              key={permission}
              className="flex items-center gap-3 text-sm text-slate-700"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                ✓
              </span>

              {permission}
            </li>
          ))}

          {permissions.denied.map((permission) => (
            <li
              key={permission}
              className="flex items-center gap-3 text-sm text-slate-400"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-red-500">
                ×
              </span>

              {permission}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

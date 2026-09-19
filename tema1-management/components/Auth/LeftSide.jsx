import { FiCheck, FiEye } from "react-icons/fi";

export default function LeftSide({ benefits, title, subtitle }) {
  return (
    <section className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-linear-to-br from-slate-900 via-slate-800 to-slate-950 p-12 text-white">
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[repeating-linear-gradient(135deg,white_0,white_2px,transparent_2px,transparent_26px)]" />
      </div>

      {/* Logo */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-amber-400 text-amber-400 font-serif text-xl">
          C
        </div>

        <span className="font-serif text-2xl font-semibold">Contractly</span>
      </div>

      <div className="relative z-10 max-w-md">
        <h1 className="font-serif text-4xl font-medium leading-tight">
          {title}
        </h1>

        <p className="mt-5 text-sm leading-7 text-slate-300">{subtitle}</p>

        <ul className="mt-8 space-y-4">
          {benefits.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 text-sm text-slate-200"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full text-amber-400">
                <FiCheck size={15} />
              </span>

              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative z-10 border-t border-white/20 pt-5 text-sm text-slate-300">
        <strong className="block text-white font-medium">
          Contract management became much easier.
        </strong>
        Legal Operations Team
      </div>
    </section>
  );
}

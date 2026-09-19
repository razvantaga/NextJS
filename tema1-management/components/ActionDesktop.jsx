import Search from "./Search";

export default function ActionDesktop({
  handleSearch,
  setLimits,
  setSortType,
}) {
  return (
    <>
      <div className="hidden items-center justify-between gap-6 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm lg:flex">
        <Search handleSearch={handleSearch} />

        <div className="flex flex-wrap items-center gap-4">
          <label
            htmlFor="sortByDesktop"
            className="whitespace-nowrap text-sm font-medium text-slate-700"
          >
            Ordonează după:
          </label>

          <select
            id="sortByDesktop"
            name="sortBy"
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-900 outline-none transition focus:border-violet-500"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="contractSeries">Serie contract</option>
            <option value="companyCUI">CUI</option>
            <option value="companyName">Nume companie</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <label
            htmlFor="perPage"
            className="whitespace-nowrap text-sm font-medium text-slate-700"
          >
            Afișează:
          </label>

          <select
            id="perPage"
            name="perPage"
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-900 outline-none transition focus:border-violet-500"
            onChange={(e) => setLimits(e.target.value)}
          >
            <option value="5">5 per pagină</option>
            <option value="10">10 per pagină</option>
          </select>
        </div>
      </div>
    </>
  );
}

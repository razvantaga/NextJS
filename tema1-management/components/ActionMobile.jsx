export default function ActionMobile() {
  return (
    <>
      <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm lg:hidden">
        <div className="flex flex-wrap items-center gap-3">
          {/* Filters */}
          <button
            id="openFilters"
            type="button"
            className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            <span>Filtrează</span>
            <span className="mt-1 block text-xs text-slate-500">
              <span id="activeFilters">0</span> filtre active
            </span>
          </button>

          {/* Sort */}
          <div className="min-w-[180px]">
            <label
              htmlFor="sortByMobile"
              className="mb-1 block text-xs font-medium text-slate-500"
            >
              Sortează
            </label>

            <select
              id="sortByMobile"
              name="sortBy"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-500"
            >
              <option value="contractSeries">Serie contract</option>
              <option value="companyCUI">CUI</option>
              <option value="companyName">Nume companie</option>
            </select>
          </div>

          {/* Search button */}
          <button
            id="openSearch"
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100"
          >
            <img
              src="/images/icons/search.svg"
              alt="Caută"
              width={16}
              height={16}
            />
          </button>
        </div>

        {/* Search form */}
        <form className="mt-4 flex gap-3">
          <input
            type="search"
            id="searchMessageMobile"
            name="searchMessageMobile"
            placeholder="Caută"
            className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-500"
          />

          <button
            type="submit"
            className="rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
          >
            Caută
          </button>
        </form>
      </div>
    </>
  );
}

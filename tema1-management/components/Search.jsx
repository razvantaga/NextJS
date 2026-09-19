export default function Search({ handleSearch }) {
  return (
    <>
      <form className="flex flex-1 max-w-md items-center">
        <div className="relative w-full">
          <input
            type="search"
            id="searchMessage"
            name="searchMessage"
            title="Caută"
            placeholder="Caută"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </form>
    </>
  );
}

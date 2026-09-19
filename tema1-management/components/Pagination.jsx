import Image from "next/image";
import ArrowPrev from "../public/images/icons/arrow-prev.svg";
import ArrowNext from "../public/images/icons/arrow-next.svg";

export default function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
}) {
  if (!totalPages || totalPages <= 1) return null;

  const pageNeighbors = 1;
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - pageNeighbors && i <= currentPage + pageNeighbors)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <nav className="my-10 flex justify-center">
      <ul className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-3 shadow-sm shadow-slate-200">
        {/* Previous */}
        <li>
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            aria-label="Pagina anterioară"
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
              currentPage === 1
                ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
                : "border-violet-200 bg-violet-50 text-violet-600 hover:border-violet-300 hover:bg-violet-100"
            }`}
          >
            <Image src={ArrowPrev} alt="Prev" width={9} height={15} />
          </button>
        </li>

        {/* Pages */}
        {pages.map((page, index) =>
          page === "..." ? (
            <li
              key={`ellipsis-${index}`}
              className="px-2 text-gray-500 select-none"
            >
              ...
            </li>
          ) : (
            <li key={page}>
              <button
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`flex h-10 min-w-[40px] items-center justify-center rounded-lg border px-3 text-sm font-medium transition ${
                  page === currentPage
                    ? "border-violet-600 bg-violet-600 text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:border-violet-600 hover:bg-violet-50 hover:text-violet-700"
                }`}
              >
                {page}
              </button>
            </li>
          ),
        )}

        {/* Next */}
        <li>
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            aria-label="Pagina următoare"
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
              currentPage === totalPages
                ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
                : "border-violet-200 bg-violet-50 text-violet-600 hover:border-violet-300 hover:bg-violet-100"
            }`}
          >
            <Image src={ArrowNext} alt="Next" width={9} height={15} />
          </button>
        </li>
      </ul>
    </nav>
  );
}

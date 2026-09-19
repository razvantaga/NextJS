"use client";

import ActionDesktop from "@/components/ActionDesktop";
import ActionMobile from "@/components/ActionMobile";
import Aside from "@/components/Aside";
import Contract from "@/components/Contract";
import Header from "@/components/Header";
import Pagination from "@/components/Pagination";
import contracte from "../../../lib/contracts.json";
import { supabase } from "@/lib/supabase/client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ContractListPage() {
  const [loading, setLoading] = useState(true);
  const [contracts, setContracts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limits, setLimits] = useState(5);
  const [findItem, setFindItem] = useState("");
  const [sortType, setSortType] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (key, value, checked) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentValues = params.getAll(key);

    // Dacă opțiunea este bifată, o adaugă în URL.
    if (checked) {
      params.append(key, value);
    } else {
      // Dacă este debifată, o elimină.
      const remainingValues = currentValues.filter((item) => item !== value);
      params.delete(key);
      remainingValues.forEach((item) => params.append(key, item));
    }

    // Actualizează URL-ul fără refresh și fără scroll.
    const query = params.toString();
    router.replace(query ? `/?${query}` : "/", { scroll: false });
  };

  useEffect(() => {
    const getContracts = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("contracts")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        console.error("Eroare la încărcarea contractelor:", error);
        setLoading(false);
        return;
      }

      setContracts(data || []);
      setLoading(false);
    };

    getContracts();
  }, []);

  const handleSearch = (value) => {
    setFindItem(value);
  };

  // REPARAT: Un singur useMemo pentru procesarea completă a datelor brute
  const sortedContracts = useMemo(() => {
    const selectedStatuses = searchParams.getAll("status");
    const selectedTypes = searchParams.getAll("type");

    // 1. Filtrare
    let list = contracts.filter((contract) => {
      const searchMatch = (contract.company_name || "")
        .toLowerCase()
        .includes(findItem.toLowerCase());

      const statusMatch =
        selectedStatuses.length === 0 ||
        selectedStatuses.includes(contract.status);

      const typeMatch =
        selectedTypes.length === 0 || selectedTypes.includes(contract.type);

      return searchMatch && statusMatch && typeMatch;
    });

    // 2. Sortare
    switch (sortType) {
      case "series":
        return [...list].sort((a, b) =>
          (a.series || "").localeCompare(b.series || ""),
        );

      case "cui":
        return [...list].sort((a, b) => {
          const cuiA = Number(String(a.cui || "").replace(/\D/g, ""));
          const cuiB = Number(String(b.cui || "").replace(/\D/g, ""));
          return cuiA - cuiB;
        });

      case "companyName":
        return [...list].sort((a, b) =>
          (a.company_name || "").localeCompare(b.company_name || "", "ro", {
            sensitivity: "base",
          }),
        );

      default:
        return list;
    }
  }, [contracts, findItem, sortType, searchParams]);

  // Calcule pentru paginare bazate pe datele finale procesate
  const totalPages = Math.ceil(sortedContracts.length / limits);
  const startIndex = (currentPage - 1) * limits;
  const endIndex = startIndex + limits;
  const paginatedData = sortedContracts.slice(startIndex, endIndex);

  const stats = useMemo(() => {
    const totalContracts = contracte.length;
    const signedContracts = contracte.filter(
      (contract) => contract.status?.key === "signed",
    ).length;
    const totalAmount = contracte.reduce(
      (sum, contract) => sum + (Number(contract.amount) || 0),
      0,
    );

    return {
      totalContracts,
      signedContracts,
      totalAmount,
    };
  }, []);

  const formattedTotalAmount = `$${stats.totalAmount.toLocaleString()}`;

  // REPARAT: Resetăm pagina la 1 și când se caută, dar și când se schimbă sortarea sau limita pe pagină
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [findItem, sortType, limits]);

  return (
    <>
      <Header />

      <main id="contracts" className="bg-slate-100 pt-20 pb-28">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[280px_1fr]">
            <Aside
              contracts={contracts}
              handleFilterChange={handleFilterChange}
            />

            <div>
              <div className="mb-8 rounded-[32px] bg-white p-8 shadow-sm shadow-slate-200/50">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
                      Contractele mele
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                      Gestionați toate contractele, filtrați rapid pe status și
                      urmăriți valoarea totală a portofoliului.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <ActionMobile handleSearch={handleSearch} />
                <ActionDesktop
                  handleSearch={handleSearch}
                  setLimits={setLimits}
                  setSortType={setSortType}
                />

                <div className=" rounded-[32px] border border-slate-200 bg-white shadow-sm">
                  <div className="border-b bg-gray-100 px-6 py-4">
                    <div className="grid grid-cols-4 gap-4 font-semibold text-gray-700">
                      <p>Companie</p>
                      <p className="text-center">Tip contract</p>
                      <p className="text-center">Status</p>
                      <p className="text-center">Actiune</p>
                    </div>
                  </div>

                  <div className="divide-y divide-gray-200">
                    {loading ? (
                      <div className="flex min-h-[300px] items-center justify-center">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-violet-600" />
                      </div>
                    ) : paginatedData.length > 0 ? (
                      paginatedData.map((contract) => (
                        <Contract key={contract.id} contract={contract} />
                      ))
                    ) : (
                      <p className="p-6 text-center text-gray-500">
                        Nu s-au găsit contracte care să corespundă criteriilor
                        specificate.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        )}
      </main>
    </>
  );
}

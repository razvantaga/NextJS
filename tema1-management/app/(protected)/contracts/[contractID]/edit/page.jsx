import WizzardForm from "@/components/WizzardForm";
import { getContractData } from "@/app/(protected)/contracts/actions";
import { notFound } from "next/navigation";

export default async function EditContract({ params }) {
  const { contractID } = await params;

  const result = await getContractData(contractID);

  if (!result.success || !result.contract) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <WizzardForm mode="edit" initialData={result.contract} />
      </div>
    </main>
  );
}

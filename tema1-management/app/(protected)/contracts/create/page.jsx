import WizzardForm from "@/components/WizzardForm";

export default function CreateContract() {
  return (
    <>
      <main className="min-h-screen bg-slate-50 py-10">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <WizzardForm mode="add" />
        </div>
      </main>
    </>
  );
}

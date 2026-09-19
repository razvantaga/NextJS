import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
  const supabase = await createClient();

  // 1. Verificăm autentificarea
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  // 2. Obținem profilul utilizatorului
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("is_active")
    .eq("id", user.id)
    .single();

  // 3. Verificăm dacă profilul există și este activ
  if (profileError || !profile || !profile.is_active) {
    redirect("/login");
  }

  return <>{children}</>;
}

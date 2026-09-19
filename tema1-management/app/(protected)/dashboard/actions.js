import { createClient } from "@/lib/supabase/server";

export async function actionsLog(
  action,
  userId,
  contractId = null,
  description = null,
) {
  console.log("actionsLog called with:", {
    action,
    userId,
    contractId,
    description,
  });

  const supabase = await createClient();

  if (!userId) {
    console.warn("actionsLog skipped: missing userId", {
      action,
      contractId,
    });

    return false;
  }

  const { error } = await supabase.from("activity_logs").insert([
    {
      action,
      user_id: userId,
      contract_id: contractId,
      description,
      created_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    console.error("Activity log insert failed:", error);
    return false;
  }

  return true;
}

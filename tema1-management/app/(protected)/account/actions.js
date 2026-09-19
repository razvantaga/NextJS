export default function userRecentActivity(userId) {
  return async function getRecentActivity() {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("activity_logs")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching recent activity:", error);
      return [];
    }

    return data;
  };
}

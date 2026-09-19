"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function Activity() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        console.error("No authenticated user found");
        setActivities([]);
        return;
      }

      const { data, error } = await supabase
        .from("activity_logs")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching recent activity:", error);
        setActivities([]);
        return;
      }

      setActivities(data || []);
    };

    fetchActivities();
  }, []);

  return (
    <section className="mb-6 rounded-[32px] border border-slate-200 bg-white shadow-sm shadow-slate-200/50">
      <div className="border-b border-slate-200 px-6 py-5 sm:px-8">
        <h2 className="text-xl font-semibold text-slate-800">
          Recent activity
        </h2>
      </div>

      <div className="divide-y divide-slate-200">
        {activities.length === 0 ? (
          <div className="px-6 py-5 text-sm text-slate-500 sm:px-8">
            No recent activity.
          </div>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id || `${activity.action}-${activity.created_at}`}
              className="flex gap-4 px-6 py-5 sm:px-8"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm text-violet-700">
                {activity.action?.slice(0, 1).toUpperCase() || "A"}
              </span>

              <div>
                <p className="text-sm text-slate-700">
                  {activity.description || activity.action || "Activity"}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {activity.created_at
                    ? new Date(activity.created_at).toLocaleString()
                    : "Recently"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

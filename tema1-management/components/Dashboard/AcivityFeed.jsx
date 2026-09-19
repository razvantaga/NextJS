"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

const actionStyles = {
  password_changed: {
    bg: "bg-rose-100",
    color: "text-rose-600",
    label: "Password changed",
  },
  contract_updated: {
    bg: "bg-violet-100",
    color: "text-violet-600",
    label: "Contract updated",
  },
  contract_deleted: {
    bg: "bg-red-100",
    color: "text-red-600",
    label: "Contract deleted",
  },
  contract_created: {
    bg: "bg-emerald-100",
    color: "text-emerald-600",
    label: "Contract created",
  },
  profile_updated: {
    bg: "bg-sky-100",
    color: "text-sky-600",
    label: "Profile updated",
  },
  notifications_updated: {
    bg: "bg-amber-100",
    color: "text-amber-600",
    label: "Notifications updated",
  },
  document_uploaded: {
    bg: "bg-indigo-100",
    color: "text-indigo-600",
    label: "Document uploaded",
  },
};

const formatTime = (timestamp) => {
  if (!timestamp) return "Just now";

  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "Just now";

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

export default function ActivityFeed() {
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const getActivityLogs = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("activity_logs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Eroare la încărcarea activităților:", error);
        setLoading(false);
        return;
      }

      setActivities(data || []);
      setLoading(false);
    };

    getActivityLogs();
  }, []);

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Recent Activity
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Latest actions performed in the system.
          </p>
        </div>

        <button className="text-sm font-medium text-violet-600 transition hover:text-violet-700">
          View all
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500">Loading recent activity...</p>
      ) : activities.length === 0 ? (
        <p className="text-sm text-slate-500">No recent activity yet.</p>
      ) : (
        <div className="space-y-6">
          {activities.map((activity) => {
            const style = actionStyles[activity.action] || {
              bg: "bg-slate-100",
              color: "text-slate-600",
              label: activity.action?.replace(/_/g, " ") || "Activity",
            };

            const userInitials = activity.user_id
              ? activity.user_id.slice(0, 2).toUpperCase()
              : "SYS";

            return (
              <div key={activity.id} className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700">
                  {userInitials}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="font-semibold text-slate-900">
                      {activity.user_id
                        ? activity.user_id.slice(0, 8)
                        : "System"}
                    </span>
                    <span>{style.label}</span>
                  </div>

                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {activity.description || "No description provided"}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {formatTime(activity.created_at)}
                  </p>
                </div>

                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full ${style.bg}`}
                >
                  <span className={`text-sm font-semibold ${style.color}`}>
                    {style.label.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

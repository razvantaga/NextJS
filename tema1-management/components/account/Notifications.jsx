"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";

const TEMPLATE = [
  {
    key: "renewal_reminders",
    title: "Contract renewal reminders",
    description: "Email me 30 days before a contract expires.",
    default: true,
  },
  {
    key: "weekly_digest",
    title: "Weekly digest",
    description: "A summary of activity across all contracts.",
    default: true,
  },
  {
    key: "team_activity",
    title: "Team activity",
    description: "Notify me when a teammate edits a shared contract.",
    default: false,
  },
  {
    key: "product_updates",
    title: "Product updates",
    description: "Occasional emails about new features.",
    default: false,
  },
];

export default function Notifications({ preferences }) {
  const [items, setItems] = useState(
    TEMPLATE.map((t) => ({ ...t, checked: preferences?.[t.key] ?? t.default })),
  );
  const [saving, setSaving] = useState(false);

  const savePreferences = async (newItems) => {
    setSaving(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;
      if (!user) {
        toast.error("You must be signed in to save preferences.");
        return;
      }

      const payload = { user_id: user.id };
      newItems.forEach((it) => {
        payload[it.key] = it.checked;
      });

      const { error } = await supabase
        .from("notification_preferences")
        .upsert(payload, { onConflict: "user_id" });

      if (error) {
        console.error("ERROR CODE:", error.code);
        console.error("ERROR MESSAGE:", error.message);
        console.error("ERROR DETAILS:", error.details);
        console.error("ERROR HINT:", error.hint);

        return;
      } else {
        toast.success("Notification preferences saved.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to save preferences.");
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = (key) => {
    setItems((prev) => {
      const newItems = prev.map((i) =>
        i.key === key ? { ...i, checked: !i.checked } : i,
      );
      // persist in background
      savePreferences(newItems);
      return newItems;
    });
  };

  return (
    <section className="mb-6 rounded-4xl border border-slate-200 bg-white shadow-sm shadow-slate-200/50">
      <div className="border-b border-slate-200 px-6 py-5 sm:px-8">
        <h2 className="text-xl font-semibold text-slate-800">Notifications</h2>

        <p className="mt-1 text-sm text-slate-500">
          Choose which notifications you want to receive.
        </p>
      </div>
      <div className="divide-y divide-slate-200">
        {items.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between gap-6 px-6 py-5 sm:px-8"
          >
            <div>
              <h3 className="font-semibold text-slate-800">{item.title}</h3>

              <p className="mt-1 text-sm text-slate-500">{item.description}</p>
            </div>

            <label className="relative inline-flex shrink-0 cursor-pointer items-center">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleToggle(item.key)}
                disabled={saving}
                className="peer sr-only"
              />

              <div className="h-6 w-11 rounded-full bg-slate-200 transition peer-checked:bg-violet-600 peer-focus:ring-4 peer-focus:ring-violet-100" />

              <div className="absolute left-1 h-4 w-4 rounded-full bg-white shadow-sm transition peer-checked:translate-x-5" />
            </label>
          </div>
        ))}
      </div>
    </section>
  );
}

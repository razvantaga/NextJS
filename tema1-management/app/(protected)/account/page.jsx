"use server";
import Activity from "@/components/account/Activity";
import Danger from "@/components/account/Danger";
import Notifications from "@/components/account/Notifications";
import Permissions from "@/components/account/Permissions";
import Profile from "@/components/account/Profile";
import Security from "@/components/account/Security";
import Header from "@/components/Header";
import { createClient } from "@/lib/supabase/server";

export default async function Account() {
  const supabase = await createClient();
  const { data: userData, error } = await supabase.auth.getUser();
  const user = userData?.user;

  if (!user) {
    console.error("No logged-in user found.");
    return <div>Please sign in.</div>;
  }
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  const { data: preferences, error: preferencesError } = await supabase
    .from("notification_preferences")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  console.log({
    error,
    profileError,
    preferencesError,
    userId: user.id,
    profile,
    preferences,
  });

  if (error || profileError || preferencesError) {
    console.error("Error fetching user data:", {
      error,
      profileError,
      preferencesError,
    });

    return <div>Error loading account information.</div>;
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <Header />
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
            My Account
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Manage your profile, security, and notification preferences.
          </p>
        </div>

        {/* Profile */}
        <Profile profile={profile} />

        {/* Security */}
        <Security />

        {/* Notifications */}
        <Notifications preferences={preferences} />

        {/* Role & Permissions */}
        <Permissions role={profile.role} />

        {/* Recent Activity */}
        <Activity />

        {/* Danger Zone */}
        <Danger />
      </div>
    </main>
  );
}

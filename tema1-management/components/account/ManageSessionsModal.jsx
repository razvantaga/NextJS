"use client";

import { useState } from "react";

export default function ManageSessionsModal({ onClose }) {
  const [sessions, setSessions] = useState([
    {
      id: 1,
      device: "MacBook Pro",
      location: "New York, USA",
      lastActive: "2024-06-01 10:30 AM",
    },
    {
      id: 2,
      device: "iPhone 12",
      location: "Los Angeles, USA",
      lastActive: "2024-06-02 02:15 PM",
    },
    {
      id: 3,
      device: "Windows PC",
      location: "Chicago, USA",
      lastActive: "2024-06-03 08:45 AM",
    },
  ]);

  const handleSignOut = (sessionId) => {
    setSessions((prevSessions) =>
      prevSessions.filter((session) => session.id !== sessionId),
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-slate-800">
          Active Sessions
        </h2>
        <ul className="space-y-4">
          {sessions.map((session) => (
            <li
              key={session.id}
              className="flex items-center justify-between rounded-lg border border-slate-200 p-4"
            >
              <div>
                <p className="font-medium text-slate-800">{session.device}</p>
                <p className="text-sm text-slate-500">
                  {session.location} - Last active: {session.lastActive}
                </p>
              </div>
              <button
                onClick={() => handleSignOut(session.id)}
                className="rounded-full bg-red-500 px-3 py-1 text-sm font-medium text-white transition hover:bg-red-600"
              >
                Sign Out
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-full bg-slate-200 px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

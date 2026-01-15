"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              OpenHouse Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">
                Welcome, {session.user?.name}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Events Card */}
          <Link
            href="/events"
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <div className="text-4xl mb-4">📅</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Events</h2>
            <p className="text-gray-600">
              Browse and register for upcoming volunteer events
            </p>
          </Link>

          {/* Profile Card */}
          <Link
            href="/profile"
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <div className="text-4xl mb-4">👤</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">My Profile</h2>
            <p className="text-gray-600">
              Manage your profile, skills, and availability
            </p>
          </Link>

          {/* Hours Card */}
          <Link
            href="/hours"
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <div className="text-4xl mb-4">⏱️</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              My Hours
            </h2>
            <p className="text-gray-600">
              Track and view your volunteer hours
            </p>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Quick Stats
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">0</div>
              <div className="text-gray-600">Upcoming Events</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">0</div>
              <div className="text-gray-600">Volunteer Hours</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">0</div>
              <div className="text-gray-600">Events Completed</div>
            </div>
          </div>
        </div>

        {/* Getting Started */}
        <div className="mt-8 bg-blue-50 border border-blue-200 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            🎉 Getting Started
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li>✓ Account created successfully!</li>
            <li>• Complete your profile to get personalized event recommendations</li>
            <li>• Browse available volunteer opportunities</li>
            <li>• Register for your first event</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

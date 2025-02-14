"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const settingsOptions = [
  { name: "Edit Profile", href: "/pruser/editprofile" },
  { name: "Bookmarks", href: "/pruser/bookmark" },
  { name: "Posts", href: "/pruser/posts" },
  { name: "Insights", href: "/pruser/insights" },
  { name: "Change Password", href: "/pruser/changepassword" },
  { name: "Subscription", href: "/pruser/subscription" },
  { name: "Delete Account", href: "/pruser/delete-account" },
];

export default function SettingsPage() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">⚙️ Settings</h1>

      <div className="w-full max-w-2xl space-y-4">
        {settingsOptions.map((option) => (
          <Link
            key={option.name}
            href={option.href}
            className={`block p-4 border rounded-lg bg-white shadow-md text-center text-lg font-medium transition-colors ${
              pathname === option.href
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-blue-100"
            }`}
          >
            {option.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

"use client";
export const dynamic = "force-dynamic"; // This forces dynamic rendering

import React, { Suspense, useState, useEffect } from "react";
import { useModelContext } from "../../context/Context";
import LAHEAD from "../../slidebar/LAHEAD";
import LAWYERSSTEMP from "../../templates/LAWYERSTEMP";
import FeaturedLawyer from "../../slidebar/feature-lawyer";
import { useSearchParams } from "next/navigation";
import Footer from "../../slidebar/FOOTER";
import { motion, AnimatePresence } from "framer-motion";

function HomepageContent() {
  const [allUsers, setAllUsers] = useState([]); // ✅ Store full dataset here
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const { searchterm } = useModelContext();
  const [selectedFilter, setSelectedFilter] = useState("");
  const filterFromUrl = searchParams.get("filter") || "";
  const [isHydrated, setIsHydrated] = useState(false);
  const usersPerPage = 9;

  // Ensure the page is fully hydrated before rendering content
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Set filter from URL
  useEffect(() => {
    setSelectedFilter(filterFromUrl);
  }, [filterFromUrl]);

  // Fetch ALL data once (on initial load)
  useEffect(() => {
    if (!isHydrated) return;

    fetch(`/api/laywers`, { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => {
        const allUsersData = data.users || data;
        setAllUsers(allUsersData); // ✅ Store all data for filtering
        setFilteredUsers(allUsersData); // Default to all data on initial load
        setTotalPages(Math.ceil(allUsersData.length / usersPerPage));
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, [isHydrated]);

  // 🔎 Filter data based on search term and filter logic
  useEffect(() => {
    let filteredResults = [...allUsers];

    // Search Logic
    if (searchterm) {
      filteredResults = filteredResults.filter((user) =>
          user.name?.toLowerCase().includes(searchterm.toLowerCase()) // ✅ Safe optional chaining
      );
  }
  

    // Filter Logic
    if (selectedFilter && selectedFilter !== "All") {
      filteredResults = filteredResults.filter(
        (user) => user.category === selectedFilter
      );
    }

    // Only display users with `islaywer === true`
    const lawyers = filteredResults.filter((user) => user.islaywer === true);

    // Sort so that users with `subscribe: true` appear first
    const sortedLawyers = [...lawyers].sort((a, b) => {
      return (b.subscribe ? 1 : 0) - (a.subscribe ? 1 : 0);
    });

    setFilteredUsers(sortedLawyers);
    const totalCount = sortedLawyers.length;
    setTotalPages(Math.ceil(totalCount / usersPerPage));
  }, [searchterm, selectedFilter, allUsers]);

  if (!isHydrated) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020B2C] to-[#0D1B4A]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl mx-auto flex-col px-4 py-8"
      >
        <FeaturedLawyer />

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mt-8"
        >
          {["All", "Corporate Law", "Immigration Law", "Family Law", "Criminal Law"].map(
            (filter, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedFilter === filter
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
                onClick={() => {
                  setSelectedFilter(filter === "All" ? "" : filter);
                  setPage(1); // Reset to first page on filter change
                }}
              >
                {filter}
              </motion.button>
            )
          )}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={page + selectedFilter + searchterm}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-8 w-11/12"
          >
            <LAWYERSSTEMP users={filteredUsers} />
          </motion.div>
        </AnimatePresence>

        {/* Pagination Controls */}
        <div className="flex justify-center space-x-4 mt-8">
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading homepage...</div>}>
      <HomepageContent />
    </Suspense>
  );
}

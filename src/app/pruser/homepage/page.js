"use client";
export const dynamic = "force-dynamic";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import FeaturedLawyer from "../../slidebar/feature-lawyer";
import LAWYERSSTEMP from "../../templates/LAWYERSTEMP";
import Footer from "../../slidebar/FOOTER";


const USERS_PER_PAGE = 9;
const FILTERS = ["All", "Corporate Law", "Immigration Law", "Family Law", "Criminal Law"];

function HomepageContent() {
  const searchParams = useSearchParams();

  const [users, setUsers] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [page, setPage] = useState(1);

  const filterFromUrl = searchParams.get("filter") || "";

  useEffect(() => {
    setSelectedFilter(filterFromUrl);
  }, [filterFromUrl]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/laywers`, { cache: "no-store" });
        const data = await res.json();
        const allUsers = (data.users || [])
          .filter(user => user.islaywer === true)
          .sort((a, b) => (b.subscribe ? 1 : 0) - (a.subscribe ? 1 : 0));
        setUsers(allUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Filtered + paginated users
  const filteredUsers = users.filter(user =>
    selectedFilter && selectedFilter !== "All" ? user.category === selectedFilter : true
  );
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const start = (page - 1) * USERS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(start, start + USERS_PER_PAGE);

  if (users.length === 0) {
    return <div className="text-white text-center py-10">Loading lawyers...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020B2C] to-[#0D1B4A]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl mx-auto flex-col px-4 py-8"
      >
        <FeaturedLawyer />

        {/* Filter Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mt-8"
        >
          {FILTERS.map(filter => (
            <motion.button
              key={filter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedFilter === filter
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
              onClick={() => {
                setSelectedFilter(filter === "All" ? "" : filter);
                setPage(1);
              }}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Lawyers Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={page + selectedFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-8 w-11/12"
          >
            <LAWYERSSTEMP users={paginatedUsers} />
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
    <Suspense fallback={<div className="text-white text-center py-10">Loading homepage...</div>}>
      <HomepageContent />
    </Suspense>
  );
}

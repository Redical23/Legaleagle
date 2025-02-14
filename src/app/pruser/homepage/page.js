"use client";
import React, { useState, useEffect } from "react";
import { useModelContext } from "../../context/Context";
import LAHEAD from "../../slidebar/LAHEAD";
import LAWYERSSTEMP from "../../templates/LAWYERSTEMP";
import FeaturedLawyer from "../../slidebar/feature-lawyer";

const Page = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { searchterm } = useModelContext();
  const [selectedFilter, setSelectedFilter] = useState("");

  useEffect(() => {
    fetch("/api/laywers")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  useEffect(() => {
    let filtered = users;

    // Filter by search term
    if (searchterm.length > 2) {
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(searchterm.toLowerCase())
      );
    }

    // Filter by practice area (fixing array filtering)
    if (selectedFilter) {
      filtered = filtered.filter((user) =>
        user.areasOfPractice && Array.isArray(user.areasOfPractice)
          ? user.areasOfPractice.some(
              (area) => area.toLowerCase() === selectedFilter.toLowerCase()
            )
          : false
      );
    }

    setFilteredUsers(filtered);
  }, [searchterm, users, selectedFilter]);

  const handleFilterClick = (filter) => {
    setSelectedFilter(selectedFilter === filter ? "" : filter);
  };

  const usersPerPage = 9;
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (page - 1) * usersPerPage;
  const selectedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  return (
    <div>
      <LAHEAD />
      <FeaturedLawyer />
      <div>
        {/* Filter Buttons */}
        <div className="filters pt-4 flex flex-wrap gap-2">
          {["All", "Corporate Law", "Immigration Law", "Family Law", "Criminal Law"].map(
            (filter, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full border ${
                  selectedFilter === filter ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => handleFilterClick(filter === "All" ? "" : filter)}
              >
                {filter}
              </button>
            )
          )}
        </div>

        {/* Display Lawyers */}
        <LAWYERSSTEMP users={selectedUsers} />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination-controls flex justify-center mt-5">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`mx-2 px-4 py-2 border rounded-lg text-lg ${
                  page === index + 1 ? "bg-blue-500 text-white" : "bg-gray-100 text-black"
                } hover:bg-gray-200`}
                onClick={() => setPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;

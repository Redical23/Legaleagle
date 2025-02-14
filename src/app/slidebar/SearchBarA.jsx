"use client";
import React from 'react';
import { useModelContext } from '../context/Context';

const SearchBarA = () => {
  const { searchterm, setsearchterm } = useModelContext();

  const handleSearch = (e) => {
    setsearchterm(e.target.value.trim());  // Trim unnecessary spaces
  };

  return (
    <div className="relative w-full md:w-64">
      <input
        type="text"
        value={searchterm || ""}
        onChange={handleSearch}
        className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-600 bg-[#001c5e] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Search..."
      />
      <svg
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
    </div>
  );
};

export default SearchBarA;

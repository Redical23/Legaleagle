"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useModelContext } from "../context/Context"

const SearchBarA = () => {
  const router = useRouter()
  const { searchterm, setsearchterm } = useModelContext()
  const [inputValue, setInputValue] = useState(searchterm || "")

  const handleSearch = (e) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmedValue = inputValue.trim()
    setsearchterm(trimmedValue)

    // Only navigate if there's a valid search term
    if (trimmedValue.length > 1) {
      router.push("/pruser/SEARCH")
    }
  }

  // Handle pressing Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full md:w-64">
      <input
        type="text"
        value={inputValue}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-600 bg-[#001c5e] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Search..."
      />
      <button
        type="submit"
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
        aria-label="Search"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </button>
    </form>
  )
}

export default SearchBarA

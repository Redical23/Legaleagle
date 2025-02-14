'use client'

const categories = [
  "All",
  "Technology",
  "Legal Updates",
  "Case Studies",
  "Industry News",
  "Interviews"
]

export function CategoryFilter({ setFilteredUsers, newss }) {
  // Handle category click
  const handleCategoryClick = (category) => {
    if (category === "All") {
      setFilteredUsers(newss); // Show all news if "All" is selected
    } else {
      const filtered = newss.filter(newsItem => newsItem.category === category);
      setFilteredUsers(filtered);
    }
  };

  return (
    <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-transparent">
      {categories.map((category) => (
        <div
          key={category}
          onClick={() => handleCategoryClick(category)} // Trigger category filtering
          className={`rounded-full px-6 cursor-pointer ${
            category === "All"
              ? "bg-blue-600 hover:bg-blue-700"
              : "border-blue-600/30 text-blue-100 hover:border-blue-600 hover:bg-blue-600/10"
          }`}
        >
          {category}
        </div>
      ))}
    </div>
  );
}

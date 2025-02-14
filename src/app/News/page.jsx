// pages/index.js or pages/news.js
"use client"
import React from 'react';
import LAHEAD from '../slidebar/LAHEAD';
import NEWSTEMP from '../templates/NEWSTEMP'
import { useState } from 'react';
import FeaturedArticle from '../slidebar/featured-articale'
import { useEffect } from 'react';
import { useModelContext } from '../context/Context';
import { CategoryFilter }  from '../slidebar/category-filter';
const Page = () => {
  const [newss, setnewss] = useState([]);
  const [page, setPage] = useState(1);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { searchterm, setsearchterm } = useModelContext();

  useEffect(() => {
    fetch('/api/news')
      .then(response => response.json())
      .then(data => {
        setnewss(data);
        setFilteredUsers(data); // Initially set filteredUsers to all users
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);


  useEffect(() => {
    // Filter news based on searchTerm
    if (searchterm.length > 2) {
      const filtered = newss.filter(newsItem =>
        newsItem.headline.toLowerCase().includes(searchterm.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(newss); // Reset to all news if search term is too short
    }
    setPage(1); // Reset to first page on new search
  }, [searchterm, newss]);
  const usersPerPage = 9;
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (page - 1) * usersPerPage;
  const selectedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  return (

    <div>
      <div>
        <LAHEAD  />
        <FeaturedArticle/>
        <CategoryFilter setFilteredUsers={setFilteredUsers} newss={newss} />
        
      </div>
      <NEWSTEMP news={selectedUsers} />
      <div className="pagination-controls flex pb-3  justify-center mt-5">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`page-btn mx-2 px-4 py-2 border rounded-lg text-lg ${page === index + 1 ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-100 text-black border-gray-300'
              } hover:bg-gray-200 focus:outline-none`}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

    </div>

  );
};

export default Page;

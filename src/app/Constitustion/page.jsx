"use client"
import React from 'react';
import { useEffect, useState } from 'react';
import LAHEAD from '../slidebar/LAHEAD';

import CONSTITUTIONTEMP from '../templates/CONSTITUTIONTEMP'
// import { Scale, Users } from 'lucide-react';

const page = () => {
  
      const [newss, setnewss] = useState([]);
      const [page, setPage] = useState(1);
      const [filteredUsers, setFilteredUsers] = useState([]);
      
      useEffect(() => {
        fetch('/api/consitution')
        .then(response => response.json())
        .then(data => {
          setnewss(data);
          setFilteredUsers(data); // Initially set filteredUsers to all users
        })
        .catch(error => console.error('Error fetching users:', error));
      }, []);
      console.log(newss)
      const usersPerPage = 9;
      const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
      const startIndex = (page - 1) * usersPerPage;
      const selectedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);
  return (
    <div>
    <LAHEAD/>
   <div>
     <CONSTITUTIONTEMP constitution ={selectedUsers} />
   </div>
   <div className="pagination-controls flex justify-center mt-5">
  {[...Array(totalPages)].map((_, index) => (
    <button
      key={index}
      className={`page-btn mx-2 px-4 py-2 border rounded-lg text-lg ${
        page === index + 1 ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-100 text-black border-gray-300'
      } hover:bg-gray-200 focus:outline-none`}
      onClick={() => setPage(index + 1)}
    >
      {index + 1}
    </button>
  ))}
        </div>
   </div>
  )
}

export default page


 
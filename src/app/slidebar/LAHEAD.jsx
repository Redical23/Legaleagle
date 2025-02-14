"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navigation from './Navigation';
import SearchBar from './SearchBarA';
import { useModelContext } from '../context/Context';
import { Menu, X } from 'lucide-react';

const LAHEAD = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isModelOpen, setIsModelOpen, email, updateAvtarURL, useravatar } = useModelContext();

  const handleAvatarClick = () => {
    setIsModelOpen(!isModelOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const decodedEmail = email;
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/users?email=${decodedEmail}`);
        const data = await res.json();

        if (res.ok) {
          setUser(data);
        } else {
          console.error("Error fetching user:", data.error);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    if (email) {
      fetchUserData();
    }
  }, [email]);

  return (
    <header className="bg-[#001c5e] shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex gap-6 items-center justify-between">
          <a href="/lawyer" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
            PROPER AID
          </a>
          <div className="hidden md:flex items-center space-x-6">
            <Navigation />
            <SearchBar />
            <button className="w-10 h-10 rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-400">
              <img src={user?.avatar || "/default-avatar.png"} alt="User avatar" className="w-full h-full object-cover" />
            </button>
            <button
             onClick={() => router.push("/pruser/setting")}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-semibold"
            >
              Settings
            </button>
            <button
              onClick={() => router.push("/pruser/profile")}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-semibold"
            >
              Profile
            </button>
          </div>
          <button className="md:hidden text-white" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <Navigation />
            <div className="mt-4">
              <SearchBar />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <button className="w-10 h-10 rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-400">
                <img src={user?.avatar || "/default-avatar.png"} alt="User avatar" className="w-full h-full object-cover" />
              </button>
              <button
                 onClick={() => router.push("/pruser/setting")}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-semibold"
              >
                Settings
              </button>
              <button
                onClick={() => router.push("/profile")}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-semibold"
              >
                Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default LAHEAD;

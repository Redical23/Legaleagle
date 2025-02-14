import React from "react";
import { useState,useEffect } from "react";
import { MoreVertical, Phone, Video, Scale, FileText } from "lucide-react";
import { useModelContext } from "../../context/Context";

export const ChatHeader = () => {
  const { currentchat } = useModelContext()
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const decodedEmail = currentchat ? decodeURIComponent(currentchat) : null

  useEffect(() => {
    const fetchUserData = async () => {
      if (!decodedEmail) return

      try {
        const res = await fetch(`/api/users?email=${encodeURIComponent(decodedEmail)}`)
        const data = await res.json()

        if (res.ok) {
          setUser(data)
        } else {
          throw new Error(data.error || "Failed to fetch user data")
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
        setError(error.message)
      }
    }

    fetchUserData()
  }, [decodedEmail])

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>
  }

  if (!user) {
    return <div className="text-gray-400 p-4">Loading...</div>
  }

  const { name, avatar, status, caseNumber, isLawyer } = user

 

  return (
    <div className="flex items-center justify-between p-4 bg-[#001845] border-b border-gray-700">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={avatar}
            alt={name}
            className="w-10 h-10 rounded-full object-cover"
          />
          {isLawyer && (
            <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-1">
              <Scale className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
        <div>
          <h2 className="font-semibold text-white">{name}</h2>
          {caseNumber && <p className="text-xs text-blue-400">Case #{caseNumber}</p>}
          <p className="text-sm text-gray-400">{status}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-[#002060] rounded-full transition-colors">
          <FileText className="w-5 h-5 text-gray-300" />
        </button>
        <button className="p-2 hover:bg-[#002060] rounded-full transition-colors">
          <Video className="w-5 h-5 text-gray-300" />
        </button>
        <button className="p-2 hover:bg-[#002060] rounded-full transition-colors">
          <Phone className="w-5 h-5 text-gray-300" />
        </button>
        <button className="p-2 hover:bg-[#002060] rounded-full transition-colors">
          <MoreVertical className="w-5 h-5 text-gray-300" />
        </button>
      </div>
    </div>
  );
};

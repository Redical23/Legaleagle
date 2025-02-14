"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { useModelContext } from "../../context/Context"


export const ChatList = () => {
  const { setcurrentchat, email } = useModelContext()
  const [clients, setClients] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!email) {
      console.warn("Email is not available in context")
      return
    }

    const fetchClients = async () => {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch(`/api/message?lawyer=${encodeURIComponent(email)}`)
        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status}`)
        }

        const data = await res.json()
        if (Array.isArray(data.clients)) {
          setClients(data.clients)
        } else {
          throw new Error("Invalid response format from server")
        }
      } catch (err) {
        console.error("Error fetching clients:", err.message)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchClients()
  }, [email])



  return (
    <div className="w-80 border-r border-gray-700 bg-[#001845] flex flex-col h-full">
      <div className="p-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Search clients"
            className="w-full p-2 pl-10 rounded-lg bg-[#002060] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border-none"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="text-gray-400 p-3">Loading clients...</div>
        ) : error ? (
          <div className="text-red-500 p-3">Error: {error}</div>
        ) : clients.length === 0 ? (
          <div className="text-gray-500 p-3">No clients found.</div>
        ) : (
          clients.map((client, index) => (
            <div
              onClick={() => {
                setcurrentchat(client)
                console.log("💬 Chat selected:", client)
              }}
              key={index}
              className="flex items-center gap-3 p-3 cursor-pointer hover:bg-[#002060] transition-colors"
            >
              <div className="relative">
                <img
                  src="/images/default-avatar.png"
                  alt="Client Avatar"
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white truncate">{decodeURIComponent(client)}</h3>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

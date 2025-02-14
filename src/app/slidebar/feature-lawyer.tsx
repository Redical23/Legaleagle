'use client'

import React, { useState, useEffect } from 'react'
import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface Lawyer {
  id: number
  name: string
  image: string
  rating: number
  casesWon: number
  satisfiedClients: number
  awards: number
}

const lawyers: Lawyer[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.8,
    casesWon: 127,
    satisfiedClients: 342,
    awards: 15,
  },
  {
    id: 2,
    name: "Michael Chen",
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.9,
    casesWon: 156,
    satisfiedClients: 421,
    awards: 23,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.7,
    casesWon: 98,
    satisfiedClients: 287,
    awards: 12,
  },
]

export default function FeaturedLawyer() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % lawyers.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const currentLawyer = lawyers[currentIndex]

  return (

        <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-lg overflow-hidden shadow-2xl">
          <div className="md:flex  body ">
            <div className="md:flex-shrink-0">
              <div className="h-64 w-full md:w-64 relative">
                <Image
                  src={currentLawyer.image || "/placeholder.svg"}
                  alt={`${currentLawyer.name}'s profile picture`}
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 text-sm font-semibold flex items-center text-blue-900">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                  {currentLawyer.rating}
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-blue-200 font-semibold">Featured Attorney</div>
              <h2 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white">{currentLawyer.name}</h2>
              <p className="mt-4 text-lg text-blue-200">
                {currentLawyer.name} is a highly skilled attorney with a proven track record of success.
                With expertise in various areas of law, {currentLawyer.name.split(' ')[0]} is dedicated to
                providing exceptional legal representation to all clients.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="bg-blue-800/50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-white">{currentLawyer.casesWon}</div>
                  <div className="text-sm text-blue-200">Cases Won</div>
                </div>
                <div className="bg-blue-800/50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-white">{currentLawyer.satisfiedClients}</div>
                  <div className="text-sm text-blue-200">Satisfied Clients</div>
                </div>
                <div className="bg-blue-800/50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-white">{currentLawyer.awards}</div>
                  <div className="text-sm text-blue-200">Awards</div>
                </div>
              </div>
              <div className="mt-8 flex space-x-4">
                <Link
                  href={`/lawyer/${currentLawyer.id}`}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center transition duration-300"
                >
                  View Profile
                </Link>
                <button
                  className="flex-1 border border-blue-400 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Contact
                </button>
              </div>
            </div>
          </div>
         
        </div>
    
  )
}


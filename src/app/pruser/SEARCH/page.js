"use client"
import { useState, useEffect } from "react"
import { useModelContext } from "../../context/Context"
import Footer from "../../slidebar/FOOTER"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function SearchPage() {
  const [lawyers, setLawyers] = useState([])
  const [news, setNews] = useState([])
  const [constitution, setConstitution] = useState([])
  const [cases, setCases] = useState([]) // <-- added
  const [isLoading, setIsLoading] = useState(true)
  const { searchterm } = useModelContext()
  const [filteredLawyers, setFilteredLawyers] = useState([])
  const [filteredNews, setFilteredNews] = useState([])
  const [filteredConstitution, setFilteredConstitution] = useState([])
  const [filteredCases, setFilteredCases] = useState([]) // <-- added

  // Fetch all data
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        // Fetch lawyers data
        const lawyersResponse = await fetch("/api/laywers", { cache: "no-store" })
        const lawyersData = await lawyersResponse.json()
        const allLawyers = lawyersData.users || lawyersData
        setLawyers(allLawyers.filter((user) => user.islaywer === true))

        // Fetch news data
        const newsResponse = await fetch("/api/news")
        const newsData = await newsResponse.json()
        setNews(newsData)

        // Fetch constitution data
        const constitutionResponse = await fetch("/api/consitution")
        const constitutionData = await constitutionResponse.json()
        setConstitution(constitutionData)

        // Fetch cases data
        const casesResponse = await fetch("/api/cases") // <-- added
        const casesData = await casesResponse.json()
        setCases(casesData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter data based on search term
  useEffect(() => {
    if (searchterm && searchterm.length > 1) {
      // Filter lawyers
      const matchedLawyers = lawyers.filter((lawyer) => lawyer.name?.toLowerCase().includes(searchterm.toLowerCase()))
      setFilteredLawyers(matchedLawyers)

      // Filter news
      const matchedNews = news.filter(
        (newsItem) =>
          newsItem.headline?.toLowerCase().includes(searchterm.toLowerCase()) ||
          newsItem.content?.toLowerCase().includes(searchterm.toLowerCase()),
      )
      setFilteredNews(matchedNews)

      // Filter constitution
      const matchedConstitution = constitution.filter(
        (item) =>
          item.applicationNo?.toLowerCase().includes(searchterm.toLowerCase()) ||
          item.applicant?.toLowerCase().includes(searchterm.toLowerCase()) ||
          item.courtNo?.toLowerCase().includes(searchterm.toLowerCase()) ||
          item.oppositeParty?.toLowerCase().includes(searchterm.toLowerCase()) ||
          item.counselForApplicant?.toLowerCase().includes(searchterm.toLowerCase()) ||
          item.counselForOppositeParty?.some((party) => party?.toLowerCase().includes(searchterm.toLowerCase())) ||
          item.Delivereddate?.toLowerCase().includes(searchterm.toLowerCase()) ||
          item["Equivalent citations"]?.some((citation) => citation?.toLowerCase().includes(searchterm.toLowerCase())),
      )
      setFilteredConstitution(matchedConstitution)

      // Filter cases
      const matchedCases = cases.filter(
        (item) =>
          item.applicationNo?.toLowerCase().includes(searchterm.toLowerCase()) ||
          item.applicant?.toLowerCase().includes(searchterm.toLowerCase()) ||
          item.oppositeParty?.toLowerCase().includes(searchterm.toLowerCase()) ||
          item.counselForApplicant?.toLowerCase().includes(searchterm.toLowerCase()) ||
          item.Delivereddate?.toLowerCase().includes(searchterm.toLowerCase()),
      )
      setFilteredCases(matchedCases)
    } else {
      setFilteredLawyers([])
      setFilteredNews([])
      setFilteredConstitution([])
      setFilteredCases([])
    }
  }, [searchterm, lawyers, news, constitution, cases])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020B2C] to-[#0D1B4A]">
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : searchterm && searchterm.length > 1 ? (
          <div className="flex flex-col gap-8">
            {/* Lawyers Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/5 rounded-xl p-6"
            >
              <h2 className="text-2xl font-semibold text-white mb-4 border-b border-blue-500 pb-2">
                Lawyers ({filteredLawyers.length})
              </h2>

              {filteredLawyers.length > 0 ? (
                <div className="space-y-4">
                  {filteredLawyers.map((lawyer) => (
                    <Link href={`/userid/${lawyer._id}`} key={lawyer._id}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-white/10 rounded-lg p-4 flex items-center gap-4 cursor-pointer hover:bg-white/15 transition-all"
                      >
                        <div className="relative h-16 w-16 rounded-full overflow-hidden">
                          <Image
                            src={lawyer.avatar || "/placeholder.svg"}
                            alt={lawyer.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-white font-medium">{lawyer.name}</h3>
                          <p className="text-blue-300">{lawyer.category}</p>
                          {lawyer.subscribe && (
                            <span className="inline-block bg-blue-600 text-xs text-white px-2 py-1 rounded mt-1">
                              Premium
                            </span>
                          )}
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">No lawyers found matching "{searchterm}"</p>
              )}
            </motion.div>

            {/* News Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/5 rounded-xl p-6"
            >
              <h2 className="text-2xl font-semibold text-white mb-4 border-b border-blue-500 pb-2">
                News ({filteredNews.length})
              </h2>

              {filteredNews.length > 0 ? (
                <div className="space-y-4">
                  {filteredNews.map((newsItem) => (
                    <Link href={`/news/${newsItem.id}`} key={newsItem.id}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-white/10 rounded-lg p-4 cursor-pointer hover:bg-white/15 transition-all"
                      >
                        <h3 className="text-white font-medium mb-2">{newsItem.headline}</h3>
                        <p className="text-gray-300 text-sm line-clamp-2">{newsItem.content}</p>
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-blue-300 text-xs">{newsItem.category}</span>
                          <span className="text-gray-400 text-xs">{newsItem.date}</span>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">No news found matching "{searchterm}"</p>
              )}
            </motion.div>

            {/* Constitution Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/5 rounded-xl p-6"
            >
              <h2 className="text-2xl font-semibold text-white mb-4 border-b border-blue-500 pb-2">
                Constitution ({filteredConstitution.length})
              </h2>

              {filteredConstitution.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredConstitution.map((item) => (
                    <Link href={`/constitution/${item._id}`} key={item._id} className="block">
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="relative group bg-gradient-to-br from-[#0A1A40] to-[#1A2B50] rounded-xl overflow-hidden shadow-lg border border-blue-900/30"
                      >
                        {/* Card Header */}
                        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-4">
                          <h3 className="text-xl font-bold text-white">Case Details</h3>
                          <div className="absolute top-3 right-3 bg-blue-600 text-xs text-white px-2 py-1 rounded-full">
                            Constitution
                          </div>
                        </div>

                        {/* Main Content */}
                        <div className="p-5 space-y-4">
                          {/* Case Information */}
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <div className="w-24 text-blue-300 text-sm">Court No:</div>
                              <div className="text-white font-medium">{item?.courtNo || "N/A"}</div>
                            </div>

                            <div className="flex items-center space-x-2">
                              <div className="w-24 text-blue-300 text-sm">Application:</div>
                              <div className="text-white font-medium">{item?.applicationNo || "N/A"}</div>
                            </div>

                            <div className="flex items-center space-x-2">
                              <div className="w-24 text-blue-300 text-sm">Delivered:</div>
                              <div className="text-white font-medium">{item?.Delivereddate || "N/A"}</div>
                            </div>
                          </div>

                          {/* Citations */}
                          <div className="pt-2 border-t border-blue-800/50">
                            <h4 className="text-sm font-semibold text-blue-300 mb-1">Equivalent Citations</h4>
                            <p className="text-white text-sm">
                              {Array.isArray(item?.["Equivalent citations"])
                                ? item["Equivalent citations"].join(", ")
                                : item?.["Equivalent citations"] || "N/A"}
                            </p>
                          </div>
                        </div>

                        {/* Hover Panel - Parties Information */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/95 to-blue-900/95 p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center">
                          <h3 className="text-xl font-bold text-white mb-4">Parties Involved</h3>

                          <div className="space-y-3 overflow-y-auto max-h-[calc(100%-2rem)]">
                            <div>
                              <h4 className="text-sm font-semibold text-blue-300">Applicant</h4>
                              <p className="text-white text-sm">{item?.applicant || "N/A"}</p>
                            </div>

                            <div>
                              <h4 className="text-sm font-semibold text-blue-300">Counsel for Applicant</h4>
                              <p className="text-white text-sm">{item?.counselForApplicant || "N/A"}</p>
                            </div>

                            <div>
                              <h4 className="text-sm font-semibold text-blue-300">Opposition Party</h4>
                              <p className="text-white text-sm">{item?.oppositeParty || "N/A"}</p>
                            </div>

                            <div>
                              <h4 className="text-sm font-semibold text-blue-300">Counsel for Opposite Party</h4>
                              {Array.isArray(item?.counselForOppositeParty) ? (
                                <ul className="space-y-1 text-white text-sm">
                                  {item.counselForOppositeParty.map((party, index) => (
                                    <li key={index}>{party}</li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-white text-sm">{item?.counselForOppositeParty || "N/A"}</p>
                              )}
                            </div>
                          </div>

                          <div className="absolute bottom-3 right-3">
                            <span className="text-xs text-blue-300 italic">Click for details</span>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="bg-white/5 rounded-lg p-8 text-center">
                  <p className="text-gray-400">
                    No constitution items found matching "<span className="italic text-blue-300">{searchterm}</span>"
                  </p>
                </div>
              )}
            </motion.div>
            {/* Cases Section */}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-white py-12">
            <p className="text-xl">Enter a search term to find lawyers and news</p>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  )
}

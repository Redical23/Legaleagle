"use client"
import { useRouter } from "next/navigation"

const CONSTITUTIONTEMP = ({ constitution }) => {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#00103a] py-10">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {constitution.map((constitutionItem, index) => (
            <div
              key={constitutionItem?._id || index}
              className="card perspective-1000 cursor-pointer"
              
              onClick={() => router.push(`/constitutionid/${constitutionItem?._id}`)}
            >
              <div className="card-inner relative w-full h-full transition-all duration-700 transform-style-preserve-3d group">
                {/* Front Side - Case Details */}
                <div style={{ backgroundImage: 'url("/c1.png")' }} className="card-front absolute w-full h-full backface-hidden rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white p-6 flex flex-col justify-between transition-all duration-700 group-hover:opacity-0">
                  <div className="space-y-4">
                    
                    <h2 className="text-2xl font-bold">Case Details</h2>
                    <div className="space-y-2">
                      <p className="text-sm truncate">
                        <span className="font-medium">Court No:</span> {constitutionItem?.courtNo || "N/A"}
                      </p>
                      <p className="text-sm truncate">
                        <span className="font-medium">Application No:</span> {constitutionItem?.applicationNo || "N/A"}
                      </p>
                      <p className="text-sm truncate">
                        <span className="font-medium">Delivered Date:</span> {constitutionItem?.Delivereddate || "N/A"}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-orange-200">Equivalent Citations</h3>
                      <p className="text-sm line-clamp-2">
                        {Array.isArray(constitutionItem?.["Equivalent citations"])
                          ? constitutionItem["Equivalent citations"].flat().join(", ")
                          : constitutionItem?.["Equivalent citations"] || "N/A"}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-indigo-200 italic mt-4">Hover to see more details</p>
                </div>

                {/* Back Side - Parties Involved */}
                <div style={{ backgroundImage: 'url("/c1.png")' }} className="card-back absolute w-full h-full backface-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-orange-700 text-white p-6 transition-all duration-700 opacity-0 group-hover:opacity-100">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Parties Involved</h2>
                    <div>
                      <h3 className="text-lg font-semibold text-orange-200">Applicant</h3>
                      <p className="text-sm truncate">{constitutionItem?.applicant || "N/A"}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-orange-200">Counsel for Applicant</h3>
                      <p className="text-sm truncate">{constitutionItem?.counselForApplicant || "N/A"}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-orange-200">Opposition Party</h3>
                      <p className="text-sm truncate">{constitutionItem?.oppositeParty || "N/A"}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-orange-200">Counsel for Opposite Party</h3>
                      {Array.isArray(constitutionItem?.counselForOppositeParty) ? (
                        <div className="space-y-1">
                          {constitutionItem.counselForOppositeParty.flat().map((party, index) => (
                            <p key={index} className="text-sm truncate">
                              {party}
                            </p>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm truncate">{constitutionItem?.counselForOppositeParty || "N/A"}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default CONSTITUTIONTEMP


"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

type Lawyer = {
  name: string
  title: string
  avatar: string
  bio: string
  firm: string
  location: string
  phone: string
  email: string
  education: { degree: string; institution: string; year: string }[]
  barAdmissions: string[]
  areasOfPractice: string[]
  awards: string[]
}

type Case = {
  id: number
  title: string
  year: string
  outcome: string
}

type Publication = {
  id: number
  title: string
  journal: string
  year: string
}

export default function EditProfile() {
  const router = useRouter()
  const [lawyer, setLawyer] = useState<Lawyer>({
    name: "Sarah J. Thompson",
    title: "Senior Partner",
    avatar: "/placeholder.svg?height=256&width=256",
    bio: "Experienced attorney specializing in corporate law and intellectual property with over 15 years of practice.",
    firm: "Thompson & Associates Law Firm",
    location: "New York, NY",
    phone: "+1 (555) 123-4567",
    email: "s.thompson@thompsonlaw.com",
    education: [
      { degree: "J.D.", institution: "Harvard Law School", year: "2005" },
      { degree: "B.A. in Political Science", institution: "Yale University", year: "2002" },
    ],
    barAdmissions: ["New York State Bar", "California State Bar"],
    areasOfPractice: ["Corporate Law", "Intellectual Property", "Mergers & Acquisitions"],
    awards: ["Super Lawyers Rising Star, 2015-2020", "Best Lawyers in America, Corporate Law, 2018-2023"],
  })

  const [recentCases, setRecentCases] = useState<Case[]>([
    {
      id: 1,
      title: "Tech Innovators, Inc. v. Global Systems",
      year: "2023",
      outcome: "Favorable settlement in patent infringement case",
    },
    {
      id: 2,
      title: "Merger of Apex Corp and Summit Industries",
      year: "2022",
      outcome: "Successfully negotiated $500M merger",
    },
    { id: 3, title: "StartUp Ventures Funding Round", year: "2022", outcome: "Secured $50M Series B funding" },
  ])

  const [publications, setPublications] = useState<Publication[]>([
    { id: 1, title: "The Future of AI in Legal Practice", journal: "Harvard Law Review", year: "2023" },
    {
      id: 2,
      title: "Navigating Intellectual Property in the Digital Age",
      journal: "Corporate Counsel Magazine",
      year: "2022",
    },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the form submission
    // For now, we'll just redirect back to the profile page
    router.push("/")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setLawyer((prev) => ({ ...prev, [name]: value }))
  }

  const handleArrayInputChange = (index, field, subfield = null) => (e) => {
    const { value } = e.target;
    setLawyer((prev) => {
      const newArray = [...prev[field]];
      if (subfield) {
        newArray[index] = { ...newArray[index], [subfield]: value };
      } else {
        newArray[index] = value;
      }
      return { ...prev, [field]: newArray };
    });
  };

    const handleAddArrayItem = (field) => () => {
      setLawyer((prev) => {
        const newArray = [...prev[field]];
        if (field === "education") {
          newArray.push({ degree: "", institution: "", year: "" });
        } else {
          newArray.push("");
        }
        return { ...prev, [field]: newArray };
      });
    };

  const handleRemoveArrayItem = (field, index) => () => {
    setLawyer((prev) => {
      const newArray = [...prev[field]];
      newArray.splice(index, 1);
      return { ...prev, [field]: newArray };
    });
  };

  const handleCaseChange = (index: number, field: keyof Case) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setRecentCases((prev) => {
      const newCases = [...prev]
      newCases[index] = { ...newCases[index], [field]: value }
      return newCases
    })
  }

  const handleAddCase = () => {
    setRecentCases((prev) => [...prev, { id: Date.now(), title: "", year: "", outcome: "" }])
  }

  const handleRemoveCase = (index: number) => {
    setRecentCases((prev) => prev.filter((_, i) => i !== index))
  }

  const handlePublicationChange =
    (index: number, field: keyof Publication) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      setPublications((prev) => {
        const newPublications = [...prev]
        newPublications[index] = { ...newPublications[index], [field]: value }
        return newPublications
      })
    }

  const handleAddPublication = () => {
    setPublications((prev) => [...prev, { id: Date.now(), title: "", journal: "", year: "" }])
  }

  const handleRemovePublication = (index: number) => {
    setPublications((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 border-4 border-white shadow-lg">
              <Image
                src={lawyer.avatar || "/placeholder.svg"}
                width={96}
                height={96}
                alt="Profile Picture"
                className="w-full h-full rounded-full"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold">{lawyer.name}</h2>
              <p className="text-blue-100">{lawyer.email}</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  value={lawyer.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  name="title"
                  value={lawyer.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={lawyer.bio}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="firm">Firm</label>
                <input
                  id="firm"
                  name="firm"
                  value={lawyer.firm}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  name="location"
                  value={lawyer.location}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  value={lawyer.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={lawyer.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label>Education</label>
              {lawyer.education.map((edu, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={handleArrayInputChange(index, "education", "degree")}
                    className="flex-1 p-2 border border-gray-300 rounded"
                  />
                  <input
                    placeholder="Institution"
                    value={edu.institution}
                    onChange={handleArrayInputChange(index, "education", "institution")}
                    className="flex-1 p-2 border border-gray-300 rounded"
                  />
                  <input
                    placeholder="Year"
                    value={edu.year}
                    onChange={handleArrayInputChange(index, "education", "year")}
                    className="w-24 p-2 border border-gray-300 rounded"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveArrayItem("education", index)}
                    className="p-2 bg-red-500 text-white rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddArrayItem("education")}
                className="p-2 bg-blue-500 text-white rounded"
              >
                Add Education
              </button>
            </div>

            <div className="space-y-2">
              <label>Bar Admissions</label>
              {lawyer.barAdmissions.map((admission, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    value={admission}
                    onChange={handleArrayInputChange(index, "barAdmissions")}
                    className="flex-1 p-2 border border-gray-300 rounded"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveArrayItem("barAdmissions", index)}
                    className="p-2 bg-red-500 text-white rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddArrayItem("barAdmissions")}
                className="p-2 bg-blue-500 text-white rounded"
              >
                Add Bar Admission
              </button>
            </div>

            <div className="space-y-2">
              <label>Areas of Practice</label>
              {lawyer.areasOfPractice.map((area, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    value={area}
                    onChange={handleArrayInputChange(index, "areasOfPractice")}
                    className="flex-1 p-2 border border-gray-300 rounded"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveArrayItem("areasOfPractice", index)}
                    className="p-2 bg-red-500 text-white rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddArrayItem("areasOfPractice")}
                className="p-2 bg-blue-500 text-white rounded"
              >
                Add Area of Practice
              </button>
            </div>

            <div className="space-y-2">
              <label>Awards</label>
              {lawyer.awards.map((award, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    value={award}
                    onChange={handleArrayInputChange(index, "awards")}
                    className="flex-1 p-2 border border-gray-300 rounded"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveArrayItem("awards", index)}
                    className="p-2 bg-red-500 text-white rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddArrayItem("awards")}
                className="p-2 bg-blue-500 text-white rounded"
              >
                Add Award
              </button>
            </div>

            <div className="space-y-2">
              <label>Recent Notable Cases</label>
              {recentCases.map((caseItem, index) => (
                <div key={caseItem.id} className="space-y-2 p-4 border border-gray-200 rounded">
                  <input
                    placeholder="Case Title"
                    value={caseItem.title}
                    onChange={handleCaseChange(index, "title")}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <input
                    placeholder="Year"
                    value={caseItem.year}
                    onChange={handleCaseChange(index, "year")}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <input
                    placeholder="Outcome"
                    value={caseItem.outcome}
                    onChange={handleCaseChange(index, "outcome")}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveCase(index)}
                    className="p-2 bg-red-500 text-white rounded"
                  >
                    Remove Case
                  </button>
                </div>
              ))}
              <button type="button" onClick={handleAddCase} className="p-2 bg-blue-500 text-white rounded">
                Add Case
              </button>
            </div>

            <div className="space-y-2">
              <label>Recent Publications</label>
              {publications.map((publication, index) => (
                <div key={publication.id} className="space-y-2 p-4 border border-gray-200 rounded">
                  <input
                    placeholder="Publication Title"
                    value={publication.title}
                    onChange={handlePublicationChange(index, "title")}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <input
                    placeholder="Journal"
                    value={publication.journal}
                    onChange={handlePublicationChange(index, "journal")}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <input
                    placeholder="Year"
                    value={publication.year}
                    onChange={handlePublicationChange(index, "year")}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemovePublication(index)}
                    className="p-2 bg-red-500 text-white rounded"
                  >
                    Remove Publication
                  </button>
                </div>
              ))}
              <button type="button" onClick={handleAddPublication} className="p-2 bg-blue-500 text-white rounded">
                Add Publication
              </button>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.push("/")}
                className="p-2 border border-gray-300 rounded bg-white text-gray-700"
              >
                Cancel
              </button>
              <button type="submit" className="p-2 border border-gray-300 rounded bg-blue-600 text-white">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}



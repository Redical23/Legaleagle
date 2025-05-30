"use client"
import { useState } from "react"
import SIGNOUT from "../signinout/SIGNOUT"
import Image from "next/image"
import { Zap, Users, DollarSign, Wallet, Clock, UserCog, Search } from "lucide-react"
import Sponsors from "./sponsors"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useSession } from "next-auth/react"
import ImageSlider from "./IMAGESLIDER"

// Add global styles for the component
const globalStyles = {
  fontFamily: "'Poppins', sans-serif",
}

const Home = () => {
  const loge2 = "/22.png"
  const h1 = "/profile.png"
  const h2 = "/Benefit.png"
  const h3 = "/News.png"
  const h4 = "/Intership.png"
  const h5 = "/chat.png"
  const h6 = "/53510.jpg"
  const h7 = "/H10.png"
  const h8 = "/h8.png"
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Hire in 48 hours!",
      description: "Access a range of portfolios for your selection.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Top 3.5% talents",
      description: "A robust network of 1M+ talents who are pre-vetted.",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "40% cost savings",
      description: "Save on costs for equivalent work compared to your locality.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Wallet className="w-8 h-8" />,
      title: "Fair & Transparent Legal Fees",
      description:
        "Our clients receive clear and upfront pricing, ensuring competitive legal fees with full transparency for all parties involved.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Works in your local time zone",
      description: "Get talents aligned with your schedule and time zone.",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: <UserCog className="w-8 h-8" />,
      title: "Post-Hiring Legal Assistance",
      description:
        "We provide ongoing legal support, ensuring compliance and smooth operations for all stakeholders on our platform.",
      color: "from-rose-500 to-red-500",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const [slides, setSlides] = useState([])
  const router = useRouter()
  const { data: session, status } = useSession()

  const faqData = [
    {
      question: "What are the advantages of hiring remote lawyer?",
      answer:
        "Hiring remote laywer offers access to a global talent pool, increased flexibility, potential cost savings, and diverse perspectives. It allows client to scale quickly and efficiently without geographical constraints.",
    },
    {
      question: "What kind of lawyers does Kanoonikarwayahi provide?",
      answer:
        "Kanoonikarwayahi connects users with a wide range of legal professionals, including corporate lawyers, criminal defense attorneys, intellectual property specialists, contract lawyers, and more. All our lawyers are thoroughly vetted for expertise, experience, and communication skills",
    },
    {
      question: "What other services does Kanoonikarwayahi offer?",
      answer:
        "Kanoonikarwayahi not only connects users with lawyers through our chat system but also provides legal news, case references, and internship opportunities posted by users. Our platform ensures seamless access to legal insights and professional growth opportunities",
    },
    {
      question: "Why should I choose ProperAid for legal assistance?",
      answer:
        "Kanoonikarwayahi stands out with its seamless lawyer connection via chat, access to legal news and case references, and user-posted internship opportunities. Our platform ensures reliable, transparent, and efficient legal support, making it easier to find the right legal expertise when you need it",
    },
    {
      question: "How long does it take to connect with a lawyer on Kanoonikarwayahi",
      answer:
        "With Kanoonikarwayahi, you can connect with a qualified lawyer instantly through our chat system. Our platform ensures quick access to legal professionals, significantly reducing the time spent searching for legal assistance compared to traditional methods.",
    },
  ]

  const [activeIndex, setActiveIndex] = useState(null)

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div style={globalStyles}>
      <div className="bg-[#00103a] text-white">
        <div className="mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8  h-24 ">
            <div className="flex items-center space-x-2">
              <div className="w-40 md:w-64">
                <Image
                  src={loge2 || "/placeholder.svg"}
                  alt="LegalConnect Logo"
                  width={200}
                  height={40}
                  className="rounded-full object-contain w-full h-auto"
                />
              </div>
            </div>

            <div className="hidden md:flex space-x-4">
              <button onClick={() => router.push("/termsofservice")} className="text-white hover:text-gray-300">
                Terms and Service
              </button>
              <button onClick={() => router.push("/privacypolicy")} className="text-white hover:text-gray-300">
                Privacy Policy
              </button>
              <button onClick={() => router.push("/about")} className="text-white hover:text-gray-300">
                About Us
              </button>
              <button onClick={() => router.push("/contact")} className="text-white hover:text-gray-300">
                Contact
              </button>
            </div>

            <div className="flex space-x-2">
              {status === "loading" ? (
                <p>Loading...</p>
              ) : session ? (
                <SIGNOUT />
              ) : (
                <button onClick={() => router.push("/Login")}>Login</button>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="text-4xl md:text-5xl font-bold mb-4 font-serif">Find the Right Lawyer for Your Case</div>
              <div className="text-xl mb-6 font-light">
                Connect with experienced attorneys in various practice areas.
              </div>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search by practice area or location"
                    className="w-full px-4 py-2 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Search className="absolute right-3 top-2.5 text-gray-500" />
                </div>
                <button
                  onClick={() => router.push("/pruser/homepage")}
                  className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold py-2 px-6 rounded-full"
                >
                  Find Lawyers
                </button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <Image
                src={h8 || "/placeholder.svg"}
                alt="Lawyer consultation illustration"
                width={500}
                height={500}
                className="rounded-lg shadow-lg w-full max-w-md h-auto"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="contentdescription">
        <div className="box1 flex flex-col md:flex-row">
          <div className="contentaid flex-1">
            <div className="content1">
              <h1 className="text-2xl font-bold mb-3 font-serif">WHAT IS Kanooni Karwayahi?</h1>
              <p className="comic-relief-regular text-justify ">
                Kanoonikarwayahi IS A SIDE With its aim of simplifying the recruitment and hiring process for any legal
                professional, the company enables users to browse an authentic database of lawyers; by expertise,
                location, and case type. Moreover, detailed lawyer profiles involve qualifications, experience, rating,
                and reviews. Features include direct communication options available for quick consultations via
                chatting, calling, or emails. The interface is easily understandable to book appointments for law
                experts or hire them regarding any specific legal needs as this will ensure a flawless and trustworthy
                user experience.
              </p>
            </div>
            <div className="image-box1 flex-1">
              <Image
                src={h7 || "/placeholder.svg"}
                width={500}
                height={300}
                className="box1image rounded-lg object-cover w-full max-w-md h-auto"
                alt="Kanoonikarwayahi overview"
              />
            </div>
          </div>
        </div>

        <div className="box1 flex flex-col md:flex-row-reverse">
          <div className="contentaid flex-1">
            <div className="image-box1 flex-1">
              <Image
                src={h6 || "/placeholder.svg"}
                width={500}
                height={300}
                className="box1image rounded-lg object-cover w-full max-w-md h-auto"
                alt="How to use Kanoonikarwayahi"
              />
            </div>
            <div className="content1">
              <h1 className="text-2xl font-bold mb-3 font-serif">HOW TO USE IT?</h1>
              <p className="comic-relief-regular text-justify">
                Visit the Homepage: Once logged in, head straight to the homepage where you'll find a curated list of
                lawyer profiles. <br/><br/>
                Find Your Lawyer: Browse through detailed profiles, review their specializations,
                ratings, and other relevant information to select the lawyer who best fits your needs.<br/>
                <br/> Initiate a Chat:
                Click on the chosen lawyer’s profile to start a conversation directly through our built-in chat feature.
<br/><br/>
                Direct Contact Option: Some lawyers also provide their phone numbers, giving you the option to call them
                for immediate assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="contenthome">
        <div className="contentitem">
          <h2 className="text-3xl font-bold mb-6 font-serif">Features</h2>
          <div className="contentitem-item">
            <img src={h1 || "/placeholder.svg"} alt="Hire a Lawyer" />
            <div>
              <p className="tuffy-bold-italic">
                <span>Hire a Lawyer:</span> feature description: With its aim of simplifying the recruitment and hiring
                process for any legal professional, the company enables users to browse an authentic database of lawyers
                by expertise, location, and case type. Moreover, detailed lawyer profiles involve qualifications,
                experience, rating, and reviews.
              </p>
            </div>
          </div>
          <div className="contentitem-item">
            <img src={h5 || "/placeholder.svg"} alt="Chat" />
            <div>
              <p className="tuffy-bold-italic">
                <span>Chat:</span> Our website aims to provide users with a convenient and reliable way to connect with
                lawyers. This platform helps users find the right lawyer for their legal matters and communicate with
                them effortlessly.
              </p>
            </div>
          </div>
          <div className="contentitem-item">
            <img src={h2 || "/placeholder.svg"} alt="Benefits" />
            <div>
              <p className="tuffy-bold-italic">
                <span>Benefits:</span> Saves time and effort. Enables users to connect with lawyers from anywhere.
                Provides reliable and expert legal assistance. This platform offers users transparent, accessible, and
                secure legal services through a digital medium.
              </p>
            </div>
          </div>
          <div className="contentitem-item">
            <img src={h3 || "/placeholder.svg"} alt="News" />
            <div>
              <p className="tuffy-bold-italic">
                <span>News:</span> Our website is designed to serve as a comprehensive platform for lawyers and legal
                professionals, providing access to all legal news and updates. Benefits: Stay informed with the latest
                legal news and gain quick access to critical information.
              </p>
            </div>
          </div>
          <div className="contentitem-item">
            <img src={h4 || "/placeholder.svg"} alt="Internship" />
            <div>
              <p className="tuffy-bold-italic">
                <span>Internship:</span> Our website aims to provide a platform for lawyers and law students where young
                individuals and students can access internship opportunities. This feature is designed to promote
                professional growth in the legal field.
              </p>
            </div>
          </div>
        </div>
      </div>
      <ImageSlider />
      <div>
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gray-900">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-blue-500/20 to-purple-500/20 rounded-full blur-3xl opacity-20"></div>
          </div>
          <div className="relative max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent font-sans">
                  With Kanoonikarwayahi, no more hiring on gut feeling or guesswork.
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
              </motion.div>
            </div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {features.map((feature, index) => (
                <motion.div key={index} variants={itemVariants} className="group relative">
                  <div className="relative p-6 bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}
                    ></div>
                    <div className="relative">
                      <div
                        className={`w-14 h-14 mb-4 rounded-xl bg-gradient-to-br ${feature.color} p-3 text-white flex items-center justify-center`}
                      >
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 font-sans">{feature.title}</h3>
                      <p className="text-gray-300">{feature.description}</p>
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <div className="flex flex-col items-center space-x-2 text-lg font-bold text-gray-700">
              <span className="text-blue-600">Sponsored by</span>
              <Sponsors />
            </div>
          </div>
        </section>
      </div>
      <section className="faq-section py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#00103a" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-extrabold text-center mb-4 text-white font-serif">Frequently Asked Questions</h2>
          <p className="text-center text-gray-300 mb-12 text-xl font-light">
            Unravel the mysteries of remote hiring with our FAQ
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-700"
              >
                <button
                  className="w-full text-left p-6 focus:outline-none"
                  onClick={() => toggleQuestion(index)}
                  aria-expanded={activeIndex === index}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-lg text-gray-100 font-sans">{faq.question}</span>
                    <span className="text-3xl text-blue-400 transition-transform duration-300 ease-in-out transform">
                      {activeIndex === index ? "−" : "+"}
                    </span>
                  </div>
                </button>
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="p-6 text-gray-300 bg-gray-900 border-t border-gray-700">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-800 text-white p-6">
      <div className="max-w-xl text-center space-y-6">
        <div className="text-5xl md:text-6xl font-extrabold drop-shadow-lg">
          Coming Soon
        </div>

        <div className="text-lg md:text-xl text-indigo-100">
          We are working hard to launch our new website. Stay tuned!
        </div>

        <div className="text-sm text-indigo-200 mt-8">
          © {new Date().getFullYear()} Your Company Name
        </div>
      </div>
    </div>
  )
}

export default page

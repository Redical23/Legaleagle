import Image from "next/image"

export default function AccountProfile() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 border-4 border-white shadow-lg">
              <Image src="/placeholder.svg?height=96&width=96" width={96}height={96} alt="Profile Picture" className="w-full h-full rounded-full" />
              <div className="hidden">JD</div>
            </div>
            <div>
              <h2 className="text-3xl font-bold">John Doe</h2>
              <p className="text-blue-100">johndoe@example.com</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name">Name</label>
                <input id="name" defaultValue="John Doe" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" defaultValue="johndoe@example.com" className="w-full p-2 border border-gray-300 rounded" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                placeholder="Tell us about yourself"
                className="w-full p-2 border border-gray-300 rounded min-h-[100px]"
                defaultValue="Web developer and tech enthusiast."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="location" className="flex items-center space-x-2">
                  <span className="w-4 h-4">📍</span>
                  <span>Location</span>
                </label>
                <input id="location" defaultValue="New York, USA" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div className="space-y-2">
                <label htmlFor="website" className="flex items-center space-x-2">
                  <span className="w-4 h-4">🌐</span>
                  <span>Website</span>
                </label>
                <input id="website" defaultValue="https://johndoe.com" className="w-full p-2 border border-gray-300 rounded" />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button className="p-2 border border-gray-300 rounded bg-white text-gray-700">Cancel</button>
              <button type="submit" className="p-2 border border-gray-300 rounded bg-blue-600 text-white">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

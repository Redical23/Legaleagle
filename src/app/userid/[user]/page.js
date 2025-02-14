import { MongoClient, ObjectId } from "mongodb";
import LAHEAD from "../../slidebar/LAHEAD";
import { ArrowLeft, Star, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import TrackVisit from "../../slidebar/TrackVisit"; // Import client component

async function getUserData(id) {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();
  const user = await db.collection("users").findOne({ _id: new ObjectId(id) });

  client.close();
  return user;
}

export default async function LawyerProfilePage({ params }) {
  const { user } = params;
  const userData = await getUserData(user);

  if (!userData) {
    return (
      <div className="min-h-screen bg-[#020B2C] text-white p-6">
        <h1>User not found</h1>
        <p>The profile you're looking for does not exist.</p>
      </div>
    );
  }

  const { name, email, yearsexp, charge, rating, avatar, recentCases, bio, areasOfPractice, location, phone } = userData;
  
  return (
    <div>
      <TrackVisit userId={user} /> {/* Client component to track visits */}
      <LAHEAD />
      <div className="min-h-screen bg-[#020B2C] text-white p-6">
        <Link href="/pruser/homepage" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Profiles
        </Link>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="md:col-span-1 bg-white/10 backdrop-blur p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <img src={avatar} alt="User avatar" className="w-full h-full object-cover rounded-full" />
              </div>
              <h1 className="text-2xl font-bold mb-2">{name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span>{rating}</span>
              </div>
              <div className="text-sm text-gray-300 mb-6">
                <p>{yearsexp} Years Experience</p>
                <p>${charge}/hour</p>
              </div>
              <Link href={`/lawyer/${email}`} className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-white">
                Schedule Consultation
              </Link>
              <div className="space-y-3 mt-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <span className="text-sm">{email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-blue-400" />
                  <span className="text-sm">{phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <span className="text-sm">{location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="md:col-span-2">
            <div className="bg-white/10 p-6 backdrop-blur">
              <h2 className="text-xl font-semibold mb-4">About Me</h2>
              <p className="text-gray-300 mb-6">{bio}</p>
              <h3 className="text-lg font-semibold mb-3">Specializations</h3>
              <ul>
                {areasOfPractice && areasOfPractice.length > 0 ? (
                  areasOfPractice.map((area, index) => <li key={index}>{area}</li>)
                ) : (
                  <p>No areas of practice available.</p>
                )}
              </ul>
            </div>

            <div className="bg-white/10 p-6 mt-6 backdrop-blur">
              <h2 className="text-xl font-semibold mb-4">Work Experience</h2>
              <ul>
                {recentCases && recentCases.length > 0 ? (
                  recentCases.map((caseItem, index) => <li key={index}>{caseItem}</li>)
                ) : (
                  <p>No recent cases available.</p>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

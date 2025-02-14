import { MongoClient, ObjectId } from 'mongodb';
import LAHEAD from '../slidebar/LAHEAD';

async function getVisitStats() {
  const client = await MongoClient.connect(process.env.MONGODB_URI as string);
  const db = client.db();

  const visitStats = await db.collection('visits').aggregate([
    {
      $group: {
        _id: '$userId',
        totalVisits: { $sum: 1 },
        lastVisit: { $max: '$timestamp' },
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'userInfo',
      },
    },
    {
      $unwind: '$userInfo',
    },
    {
      $project: {
        _id: 1,
        totalVisits: 1,
        lastVisit: 1,
        name: '$userInfo.name',
        email: '$userInfo.email',
      },
    },
    {
      $sort: { totalVisits: -1 },
    },
  ]).toArray();

  client.close();
  return visitStats;
}

export default async function InsightsPage() {
  const visitStats = await getVisitStats();

  return (
    <div>
      <LAHEAD />
      <div className="min-h-screen bg-[#020B2C] text-white p-6">
        <h1 className="text-3xl font-bold mb-6">Lawyer Profile Insights</h1>
        <div className="overflow-x-auto">
          <table className="w-full bg-white/10 backdrop-blur">
            <thead>
              <tr className="bg-blue-900">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Total Visits</th>
                <th className="p-3 text-left">Last Visit</th>
              </tr>
            </thead>
            <tbody>
              {visitStats.map((stat) => (
                <tr key={stat._id} className="border-b border-white/20">
                  <td className="p-3">{stat.name}</td>
                  <td className="p-3">{stat.email}</td>
                  <td className="p-3">{stat.totalVisits}</td>
                  <td className="p-3">{new Date(stat.lastVisit).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
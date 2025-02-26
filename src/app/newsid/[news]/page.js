import { MongoClient, ObjectId } from 'mongodb';
import LAHEAD from '../../slidebar/LAHEAD';
import { ArrowLeft, Clock, Calendar, Share2, Bookmark, ThumbsUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { RelatedArticle } from '../../slidebar/RelatedArticleProps';
import ShareBookmarkButtons from "../../slidebar/ShareBookmarkButtons"
import Footer from '../../slidebar/FOOTER';
async function getUserData(id) {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();
  const user = await db.collection('news').findOne({ _id: new ObjectId(id) });

  client.close();
  return user;
}

async function getNewsByCategory(category, excludeId) {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();

  const query = { 
    category, 
    _id: { $ne: new ObjectId(excludeId) }, // Exclude the given document
    feature: { $ne: true } // Exclude featured articles
  };

  const news = await db.collection("news")
    .find(query)
    .limit(2) // Limit to 4 articles
    .toArray();

  client.close();
  return news;
}


export default async function LawyerProfilePage({ params }) {
  const { news } = params;
  const newsData = await getUserData(news);

  if (!newsData) {
    return (
      <div className="min-h-screen bg-[#020B2C] text-white p-6">
        <h1>User not found</h1>
        <p>The profile you're looking for does not exist.</p>
      </div>
    );
  }

  const {
    image = "/placeholder.svg",
    headline = "No headline available",
    image2,
    description = "No description available",
    date = "No date provided",
    category = "Uncategorized",
    content = "No content available",
    readTime = "N/A",
    role = "Unknown role",
  } = newsData;
  const excludeId = news
const newsData2 = await getNewsByCategory(category, excludeId);
console.log(news,"toyou")
  return (
    <div>
     
    <div className="min-h-screen bg-[#020B2C] text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <Link
          href="/News"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 group transition-colors"
          >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to News
        </Link>

        <article className="bg-white/5 backdrop-blur rounded-xl overflow-hidden">
          <div className="relative h-[400px] w-full">
            <Image
              src={image}
              alt={headline}
              fill
              className="object-cover"
              priority
              />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020B2C] to-transparent" />
          </div>
          
          <div className="relative -mt-32 p-6 sm:p-8 lg:p-12">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{readTime}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>{date}</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white">{headline}</h1>

            {image2 && (
              <div className="relative h-[300px] mb-6 rounded-lg overflow-hidden">
                <Image
                  src={image2}
                  alt="Article detail"
                  fill
                  className="object-cover"
                  />
              </div>
            )}

            <p className="text-lg text-gray-300 mb-8">{description}</p>

            <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div>
                  <div className="font-semibold text-white">{role}</div>
                  <div className="text-sm text-gray-400">{date}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
              <ShareBookmarkButtons newsId={news} />
              
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Add related articles here */}
                <RelatedArticle articles={newsData2} />
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
     <Footer />
            </div>
  );
}

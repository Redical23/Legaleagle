import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Clock, Share2, Bookmark, ArrowRight } from 'lucide-react';
import Link from "next/link";
import Image from 'next/image';

const NEWSTEMP = ({ news }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [shuffledNews, setShuffledNews] = useState([]);

  useEffect(() => {
    // Shuffle the news array only once when the component mounts
    const shuffleArray = (array) => {
      const shuffled = array.slice(); // Create a copy of the array
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    setShuffledNews(shuffleArray(news));
  }, [news]);

  const handleCardClick = (news) => {
    router.push(`/newsid/${news._id}`); // Navigate to dynamic route using news._id
    console.log(news);
  };

  return (
    <div>
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {shuffledNews.map(news => (
            <div 
              key={news._id}
              className="group bg-white/5 hover:bg-white/10 backdrop-blur border-0 overflow-hidden 
              transition-all duration-300 hover:-translate-y-1"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="relative">
                <div className="absolute left-4 top-4 z-10 bg-blue-600 hover:bg-blue-700">
                  {news.category}
                </div>
                <div className="relative h-48 overflow-hidden">
                  <Image 
                    src={news.image || "/placeholder.svg"}
                    alt={news.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{news.readTime}</span>
                  </div>
                  <span>•</span>
                  <span>{news.date}</span>
                </div>
                <h2 className="text-xl font-semibold mb-3 text-white group-hover:text-blue-400 transition-colors">
                  {news.title}
                </h2>
                <p className="text-gray-400 line-clamp-2">
                  {news.description}
                </p>
              </div>
              <div className="p-6 pt-0 flex items-center justify-between">
                <Link 
                  href={`/newsid/${news._id}`}
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium 
                    transition-all group/link"
                >
                  Read more
                  <ArrowRight className={`w-4 h-4 transition-transform duration-300 
                    ${isHovered ? 'translate-x-1' : ''}`} 
                  />
                </Link>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                    <Share2 className="w-4 h-4 text-gray-400 hover:text-white" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                    <Bookmark className="w-4 h-4 text-gray-400 hover:text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default NEWSTEMP;

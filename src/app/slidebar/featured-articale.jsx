'use client';

import { useState, useEffect } from 'react';
import { Clock, Share2, Bookmark } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function FeaturedArticle() {
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

   useEffect(() => {
     fetch('/api/featured-article')
       .then(response => response.json())
       .then(data => {
         setArticle(data);
       // Initially set filteredUsers to all users
       })
       .catch(error => console.error('Error fetching users:', error));
         }, []);

 console.log(article)

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative overflow-hidden group mb-8 bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur border-0">
      <div className="relative h-[500px] w-full">
        <Image
          src={article.image || '/placeholder.svg'}
          alt={article.title || 'Featured Article'}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 p-8 w-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-500 hover:bg-blue-600">Featured</div>
            <div className="text-white border-white/20">{article.category || 'Category'}</div>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-white">
            {article.title || 'The Future of Legal Technology: AI and Law'}
          </h1>
          <div className="flex items-center gap-6 text-white/80 mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{article.readTime || '5 min read'}</span>
            </div>
            <span>•</span>
            <span>{article.date || 'January 17, 2025'}</span>
          </div>
          <p className="text-lg text-white/80 mb-6 max-w-2xl">
            {article.description || 'Explore how artificial intelligence is transforming the legal industry...'}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href={`/newsid/${article._id || 'featured'}`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full 
                transition-all hover:px-8"
            >
              Read Article
            </Link>
            <button className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <Share2 className="w-5 h-5 text-white" />
            </button>
            <button className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <Bookmark className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

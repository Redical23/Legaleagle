"use client";
import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ShareBookmarkButtons from './ShareBookmarkButtons';

export default function FeaturedArticle() {
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/featured-article')
      .then(response => response.json())
      .then(data => {
        setArticle(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching article:', error);
        setError('Failed to load featured article');
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[300px] sm:h-[400px] md:h-[500px] bg-gradient-to-r from-blue-900/50 to-purple-900/50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[300px] sm:h-[400px] md:h-[500px] bg-gradient-to-r from-blue-900/50 to-purple-900/50">
        <div className="text-red-500 bg-white/10 backdrop-blur p-4 rounded-lg">{error}</div>
      </div>
    );
  }

  if (!article) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden group mb-8 rounded-xl bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur"
    >
      <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full">
        <Image
          src={article.image || '/placeholder.svg'}
          alt={article.title || 'Featured Article'}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute bottom-0 p-4 sm:p-6 md:p-8 w-full"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-4 py-1 bg-blue-600 text-white rounded-full text-sm font-medium"
            >
              Featured
            </motion.div>
            <div className="px-4 py-1 border border-white/20 rounded-full text-sm text-white">
              {article.category || 'Category'}
            </div>
          </div>

          <motion.h1
            whileHover={{ x: 10 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-white"
          >
            {article.title || 'The Future of Legal Technology'}
          </motion.h1>

          <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm sm:text-base mb-3 sm:mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{article.readTime || '5 min read'}</span>
            </div>
            <span>•</span>
            <span>{article.date || 'January 17, 2025'}</span>
          </div>

          <p className="text-sm sm:text-base md:text-lg text-white/80 mb-4 sm:mb-6 max-w-2xl">
            {article.headline}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                href={`/newsid/${article._id}`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all hover:px-7"
              >
                Read Article
              </Link>
            </motion.div>

            <div className="flex items-center gap-2">
              <ShareBookmarkButtons newsId={article._id} />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

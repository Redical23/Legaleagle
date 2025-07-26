"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Clock, ArrowRight } from 'lucide-react';
import Link from "next/link";
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import ShareBookmarkButtons from '../slidebar/ShareBookmarkButtons';

const NEWSTEMP = ({ news }) => {
  const router = useRouter();
  const [shuffledNews, setShuffledNews] = useState([]);

  useEffect(() => {
    const shuffleArray = (array) => {
      const shuffled = array.slice();
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    setShuffledNews(shuffleArray(news));
  }, [news]);

  return (
    <div className="bg-gradient-to-b from-[#020B2C] to-[#0D1B4A]">
      <main className="max-w-7xl mx-auto px-2 sm:px-4 py-8 sm:py-12">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence>
            {shuffledNews.map((newsItem, index) => (
              <motion.div
                key={newsItem._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white/5 backdrop-blur rounded-xl overflow-hidden 
                          transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative">
                  <div className="absolute left-4 top-4 z-10">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-1 bg-blue-600 text-white rounded-full text-sm font-medium"
                    >
                      {newsItem.category}
                    </motion.div>
                  </div>
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <Image
                      src={newsItem.image || "/placeholder.svg"}
                      alt={newsItem.title || ""}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{newsItem.readTime || '5 min read'}</span>
                    </div>
                    <span>•</span>
                    <span>{newsItem.date}</span>
                  </div>

                  <motion.h2
                    className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-white group-hover:text-blue-400 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {newsItem.title}
                  </motion.h2>

                  <p className="text-gray-400 text-sm sm:text-base line-clamp-2">
                    {newsItem.headline}
                  </p>
                </div>

                <div className="p-4 sm:p-6 pt-0 flex items-center justify-between">
                  <Link
                    href={`/newsid/${newsItem._id}`}
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-all group"
                  >
                    <span>Read more</span>
                    <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </Link>

                  <div className="flex items-center gap-2">
                    <ShareBookmarkButtons newsId={newsItem._id} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
};

export default NEWSTEMP;

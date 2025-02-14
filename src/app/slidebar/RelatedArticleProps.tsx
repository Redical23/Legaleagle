import Image from 'next/image';
import Link from 'next/link';
import { Clock } from 'lucide-react';

interface RelatedArticleProps {
  articles: {
    _id: string;
    image: string;
    headline: string;
    readTime: string;
    description: string;
  }[];
}

export function RelatedArticle({ articles }: RelatedArticleProps) {
  if (!articles || articles.length === 0) {
    return <p className="text-gray-400">No related articles found.</p>;
  }

  return (
    <>
      {articles.map(({ _id, image, headline, readTime, description }) => (
        <Link key={_id} href={`/newsid/${_id}`} className="group">
          <article className="bg-white/5 rounded-lg overflow-hidden transition-transform hover:scale-[1.02]">
            <div className="relative h-48 w-full">
              <Image
                src={image || "/placeholder.svg"}
                alt={headline}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                <Clock className="w-4 h-4" />
                <span>{readTime || "N/A"}</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-blue-400">
                {headline}
              </h3>
              <p className="text-gray-400 text-sm line-clamp-2">{description}</p>
            </div>
          </article>
        </Link>
      ))}
    </>
  );
}

import Link from "next/link"

export default function ListNews ({ 
  listNews, 
  titleClass = "text-base text-gray-800",
  clamp = "line-clamp-2"
}) {
  if (!listNews?.length) return null;

  return (
    <div className="flex flex-col">
      {listNews.map((item) => (
        <Link 
          key={item.id} 
          href={`/news/news-details/${item.slug}`}
          className="block hover:underline border-t border-gray-300 mt-1"
        >
          <h4 className={`${titleClass} leading-snug wrap-break-words pt-1 ${clamp}`}>
            {item.title}
          </h4>
        </Link>
      ))}
    </div>
  );
}
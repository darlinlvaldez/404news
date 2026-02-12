import Link from "next/link"

export default function ListNews ({listNews}) {
    if (!listNews?.length) return null;

    return (
      <div className="flex flex-col">
        {listNews.map((item) => (
            <Link key={item.id} href={`/news-details/${item.slug}`}
              className="block hover:underline border-t border-gray-300 mt-1">
              <h4 className="text-base text-gray-800 leading-snug wrap-break-words pt-1 line-clamp-2">
                {item.title}
              </h4>
            </Link>
          ))}
      </div>
    );
}
import {Link} from "react-router-dom";

interface BlogCardProps {
    author: string;
    title: string;
    publishedDate: string;
    content: string;
    thumbnail: string;
    id: number;
}

function BlogCard({author, publishedDate, title, content, thumbnail, id}: BlogCardProps) {
    const placeholderImage = "https://plus.unsplash.com/premium_photo-1668774097940-f36dfdaee149?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2Vob2xkZXJ8ZW58MHx8MHx8fDA%3D";

    return (
        <div className="border-b border-gray-300 pb-4 mt-4 w-full lg:w-7/12 cursor-pointer">
            <Link to={`/blog/${id}`}>
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Left side: Image or Skeleton */}
                    <div className="w-full lg:w-1/3">
                        <img
                            src={thumbnail || placeholderImage}
                            alt={title}
                            className="h-40 lg:h-44 object-cover w-full rounded"
                        />
                    </div>
                    {/* Right side: Content or Skeleton */}
                    <div className="flex flex-col w-full lg:w-2/3 gap-2">
                        <div className="flex items-center gap-2.5 mb-2">
                            <Avatar author={author} size={10}/>
                            <div className="flex items-center gap-1">
                                <span className="font-light text-sm text-black">{author} &#8226;</span>
                                <span className="font-extralight text-sm text-zinc-500">{publishedDate}</span>
                            </div>
                        </div>
                        <div className="font-bold text-2xl lg:text-3xl">{title}</div>
                        <div className="text-zinc-600 text-sm font-serif">
                            {content.length > 100 ? content.slice(0, 100) + "..." : content}
                        </div>
                        <div className="text-sm text-zinc-800 py-1.5 px-2.5 rounded-full bg-zinc-200 w-fit">
                            {`${Math.ceil(content.length / 100)} min read`}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default BlogCard;

export function Avatar({author, size = 7}: { author: string, size?: number }) {
    return (
        <div //  size-${size}
            className={`relative inline-flex items-center justify-center h-${size} w-${size} overflow-hidden bg-gray-100
            rounded-full dark:bg-gray-600`}
        >
            <span
                className={`${size > 7 ? "text-sm" : "text-xs"} font-medium text-gray-600 dark:text-gray-300`}>
                {author && author.split(" ").map((w) => w.charAt(0)).join("")}
            </span>
        </div>
    )
}
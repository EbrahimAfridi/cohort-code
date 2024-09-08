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
    return (
        <div className={"border-b border-gray-300 pb-4 mt-4 w-full lg:w-7/12 cursor-pointer"}>
            <Link to={`/blog/${id}`}>
                <div className={"flex items-center gap-2.5 mb-4"}>
                    <Avatar author={author}/>
                    <div className={"flex items-center gap-1"}>
                <span className={"font-light text-sm text-black"}>
                    {author} &#8226;
                </span>
                        <span className={"font-extralight text-sm text-zinc-500"}>{publishedDate}</span>
                    </div>
                </div>
                <div className={"flex flex-col gap-2"}>
                    <div className={"font-bold text-3xl"}>{title}</div>
                    {thumbnail && <img src={thumbnail} alt={title} className="mb-4 rounded"/>}
                    <div
                        className={"text-zinc-600 text-sm  font-serif"}>{content.length > 100 ? content.slice(0, 100) + "..." : content}</div>
                    <div
                        className={"text-sm text-zinc-800 py-1.5 px-2.5 rounded-full bg-zinc-200 w-fit"}>
                        {`${Math.ceil(content.length / 100)} min read`}
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default BlogCard;

export function Avatar({author, size = 7}: { author: string, size?: number }) {
    return (
        <div
            className={`relative inline-flex items-center justify-center size-${size} overflow-hidden bg-gray-100
            rounded-full dark:bg-gray-600`}
        >
            <span
                className={`${size > 7 ? "text-lg" : "text-xs"} font-medium text-gray-600 dark:text-gray-300`}>
                {author && author.split(" ").map((w) => w.charAt(0)).join("")}
            </span>
        </div>
    )
}
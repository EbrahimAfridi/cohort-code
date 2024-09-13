import {Link} from "react-router-dom";
import OptionsModal from "./OptionsModal.tsx";
import {useEffect, useState} from "react";

interface BlogCardProps {
    author: string;
    title: string;
    publishedDate: string;
    content: string;
    thumbnail: string;
    id: string;
}

function BlogCard({author, publishedDate, title, content, thumbnail, id}: BlogCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const placeholderImage = "https://plus.unsplash.com/premium_photo-1668774097940-f36dfdaee149?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2Vob2xkZXJ8ZW58MHx8MHx8fDA%3D";

    const handleOutsideClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement; // Cast event.target to HTMLElement
        if (!target.closest(".options-modal")) {
            setIsOpen(false);
        }
    };

    // Add and remove click event listener
    useEffect(() => {
        if (isOpen) {
            document.addEventListener("click", handleOutsideClick);
        } else {
            document.removeEventListener("click", handleOutsideClick);
        }

        // cleanup function
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [isOpen]);

    return (
        <div className="border-b border-gray-300 pb-4 mt-4 w-full lg:w-7/12 cursor-pointer">
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Left side: Image or Skeleton */}
                <div className="w-full lg:w-1/3">
                    <Link to={`/blog/${id}`}>
                        <img
                            src={thumbnail || placeholderImage}
                            alt={title}
                            className="h-40 lg:h-44 object-cover w-full rounded"
                        />
                    </Link>
                </div>
                {/* Right side: Content or Skeleton */}
                <div className="flex flex-col w-full lg:w-2/3 gap-2">
                    <div className="flex items-baseline gap-2.5 mb-2">
                        <Avatar author={author} size={10}/>
                        <div className="flex items-center gap-1 mr-1">
                            <span className="font-light text-sm text-black">{author} &#8226;</span>
                            <span className="font-extralight text-sm text-zinc-500">{publishedDate}</span>
                        </div>
                        <div onClick={() => setIsOpen((prev) => !prev)} className={"relative options-modal"}>
                            ✏️ {isOpen && <OptionsModal id={id}/>}
                        </div>
                    </div>
                    <Link to={`/blog/${id}`}>
                        <div className="font-bold text-2xl lg:text-3xl mb-1">{title}</div>
                        <div className="text-zinc-600 text-sm font-serif mb-2">
                            {content.length > 100 ? content.slice(0, 100) + "..." : content}
                        </div>
                        <div className="text-xs text-zinc-800 py-1 px-2 rounded-full bg-zinc-200 w-fit">
                            {`${Math.ceil(content.length / 100)} min read`}
                        </div>
                    </Link>
                </div>
            </div>
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
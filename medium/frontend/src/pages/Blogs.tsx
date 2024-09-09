import BlogCard from "../components/BlogCard.tsx";
import Appbar from "../components/Appbar.tsx";
import {useBlogs} from "../hooks";
import BlogsSkeleton from "../components/BlogsSkeleton.tsx";
import {Link} from "react-router-dom";

export default function BlogsPage() {
    const {loading, blogs} = useBlogs();

    return (
        <section>
            <Appbar/>
            <div className={"flex flex-col flex-nowrap justify-center items-center w-full px-10"}>
                {loading ?
                    <>
                        <BlogsSkeleton/>
                        <BlogsSkeleton/>
                        <BlogsSkeleton/>
                        <BlogsSkeleton/>
                    </>
                    :
                    blogs.length === 0 ?
                        (
                            <div
                                className={"text-center text-5xl font-extrabold text-zinc-900 flex justify-center items-center h-96"}>
                                No Blogs Found,{" "}
                                <Link to={"/publish"} className={"text-blue-600 bg-blue-100 p-2"}>
                                    Create a blog 👨🏻‍💻
                                </Link>
                            </div>
                        )
                        :
                        blogs?.map((blog) => (
                            <BlogCard
                                id={blog.id}
                                key={blog.id}
                                author={blog.author?.name || "Unknown Author"}
                                title={blog.title}
                                publishedDate={blog.published ? "Published" : "Not Published"}
                                content={blog.content}
                                thumbnail={blog.thumbnail}
                            />
                        ))
                }
            </div>
        </section>
    )
}
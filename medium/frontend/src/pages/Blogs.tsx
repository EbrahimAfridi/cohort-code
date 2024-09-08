import BlogCard from "../components/BlogCard.tsx";
import Appbar from "../components/Appbar.tsx";
import {useBlogs} from "../hooks";

export default function BlogsPage() {
    const {loading, blogs} = useBlogs();

    if (loading) {
        return "Loading..."
    }

    if (blogs.length === 0) {
        return "No blogs found."
    }

    return (
        <section>
            <Appbar/>
            <div className={"flex flex-col flex-nowrap justify-center items-center w-full px-10"}>
                {blogs?.map((blog) => (
                    <BlogCard
                        id={blog.id}
                        key={blog.id}
                        author={blog.author?.name || "Unknown Author"}
                        title={blog.title}
                        publishedDate={blog.published ? "Published" : "Not Published"}
                        content={blog.content}
                        thumbnail={blog.thumbnail ?? null}
                    />
                ))}
            </div>
        </section>
    )
}
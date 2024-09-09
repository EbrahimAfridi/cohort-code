import {useBlog} from "../hooks";
import {useParams} from "react-router-dom";
import BlogTile from "../components/BlogTile.tsx";
import BlogsSkeleton from "../components/BlogsSkeleton.tsx";
import Appbar from "../components/Appbar.tsx";

export default function BlogPage() {
    const {id} = useParams();
    const {loading, blog} = useBlog({
        id: id || ""
    });

    if (loading || !blog) {
        return (
            <section className={"flex flex-col flex-nowrap justify-center items-center w-full"}>
                <Appbar/>
                <BlogsSkeleton/>
            </section>
        )
    }

    return (
        <div>
            <BlogTile blog={blog}/>
        </div>
    )
}
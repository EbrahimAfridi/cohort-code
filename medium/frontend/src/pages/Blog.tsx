import {useBlog} from "../hooks";
import {useParams} from "react-router-dom";
import BlogTile from "../components/BlogTile.tsx";
import BlogSkeleton from "../components/BlogSkeleton.tsx";

export default function BlogPage() {
    const { id } = useParams();
    const {loading, blog} = useBlog({ id: id || "" });

    if (loading) {
        return <BlogSkeleton />;
    }

    return (
        <div>
            <BlogTile blog={blog} />
        </div>
    )
}
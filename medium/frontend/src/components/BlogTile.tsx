import Appbar from "./Appbar.tsx";
import {Blog} from "../hooks";

function BlogTile({blog}: {blog: Blog}) {
    return (
        <div>
            <Appbar/>
            <div className={"grid grid-cols-12 px-10 w-full pt-4"}>
                <div className={"bg-red-400 col-span-8"}>
                    <div className="text-3xl font-extrabold">{blog?.title}</div>
                    <div className="text-lg font-medium">{blog?.content}</div>
                </div>
                <div className={"bg-blue-400 col-span-4"}>
                </div>
            </div>
        </div>
    );
}

export default BlogTile;
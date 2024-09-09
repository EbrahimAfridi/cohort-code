import Appbar from "./Appbar.tsx";
import {Blog} from "../hooks";
import {Avatar} from "./BlogCard.tsx";

function BlogTile({blog}: { blog: Blog }) {
    return (
        <div>
            <Appbar/>
            <div className={"grid grid-cols-12 px-10 w-full mt-10"}>
                <div className={"col-start-3 col-span-6"}>
                    <div className="text-5xl font-extrabold">{blog?.title}</div>
                    {/*<div className="text-black pt-2">{blog?.published}</div>*/}
                    <div className="text-black pt-2">{new Date().toISOString().split('T')[0]}</div>
                    <img className={"size-60"} src={blog?.thumbnail} alt={blog?.title}/>
                    <div className="text-lg font-medium pt-4">{blog?.content}</div>
                </div>
                <div className={"col-span-3 col-end-12"}>
                    <span className={"text-zinc-600 text-lg"}>Author</span>
                    <div className={"flex w-full mt-4"}>
                        <div className={"pr-3 flex flex-col justify-center"}>
                            <Avatar author={blog?.author.name} size={10}/>
                        </div>
                        <div>
                            <div className={"text-xl font-bold"}>
                                {blog?.author.name}
                            </div>
                            <div className={"pt-2 text-zinc-500"}>
                                Random catch phrase about the author to catch public attention and it does work.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogTile;
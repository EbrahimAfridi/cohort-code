import {Avatar} from "./BlogCard";
import {Link} from "react-router-dom";

function Appbar() {
    return (
        <nav className={"flex justify-between items-baseline w-full px-10 py-4 border-b border-zinc-100"}>
            <Link to={"/blogs"} className={"cursor-pointer"}>
                Medium
            </Link>
            <div>
                <Link to={"/publish"}>
                    <button
                        type="button"
                        className="mr-4 text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2
                    focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                        Create
                    </button>
                </Link>
                <Avatar size={10} author={"Ebrahim Afridi"}/>
            </div>
        </nav>
    );
}

export default Appbar;
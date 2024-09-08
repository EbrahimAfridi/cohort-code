import {Avatar} from "./BlogCard";
import {Link} from "react-router-dom";

function Appbar() {
    return (
        <nav className={"flex justify-between items-baseline w-full px-10 py-4 border-b border-zinc-100"}>
            <Link to={"/blogs"} className={"cursor-pointer"}>
                    Medium
            </Link>
            <div>
                <Avatar size={10} author={"Ebrahim Afridi"}/>
            </div>
        </nav>
    );
}

export default Appbar;
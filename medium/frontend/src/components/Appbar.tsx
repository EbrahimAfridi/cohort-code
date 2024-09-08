import { Avatar } from "./BlogCard";

function Appbar() {
    return (
        <nav className={"flex justify-between items-baseline w-full px-10 py-4 border-b border-zinc-100"}>
            <div>Medium</div>
            <div>
                <Avatar size={10} author={"Ebrahim Afridi"}/>
            </div>
        </nav>
    );
}

export default Appbar;
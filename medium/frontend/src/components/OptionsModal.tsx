import {Link} from "react-router-dom";

function OptionsModal({id}: {id: string}) {
    // z-2 absolute left-7 -top-1 TOP DIV
    return (
        <div className={"bg-zinc-100 shadow rounded "}>
            <button className={"w-full p-2 text-xs font-medium text-black hover:bg-blue-800 hover:text-white rounded"}>
                <Link to={`/blog/edit/${id}`}>
                    Edit
                </Link>
            </button>
            <button className={"w-full p-2 text-xs font-medium text-black hover:bg-red-800 hover:text-white rounded"}>
                <Link to={"/delete"}>
                    Delete
                </Link>
            </button>
        </div>
    );
}

export default OptionsModal;
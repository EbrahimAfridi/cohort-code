import {Link} from "react-router-dom";

function OptionsModal({id}: {id: string}) {
    return (
        <div className={"bg-zinc-100 shadow rounded "}>
            <button className={"w-full p-2 text-xs font-medium text-black hover:bg-blue-800 hover:text-white rounded"}>
                {/*<Link to={`/blog/edit/${id}`}>*/}
                {/*    Edit*/}
                {/*</Link>*/}
                <a href={`http://localhost:5173/blog/edit/${id}`}>Edit</a>
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
import {useNavigate} from "react-router-dom";
// import axios from "axios";
// import {BACKEND_URL} from "../config.ts";
import { useBlogs } from "../hooks";

function OptionsModal({id}: { id: string }) {
    const {handleDelete, loadingForDelete} = useBlogs()
    const navigate = useNavigate();

    return (
        <div className={"bg-zinc-100 shadow rounded "}>
            <button
                onClick={() => navigate(`/blog/edit/${id}`)}
                className={"w-full p-2 text-xs font-medium text-black hover:bg-blue-800 hover:text-white rounded"}
            >
                Edit
            </button>
            <button
                disabled={loadingForDelete}
                onClick={() => handleDelete(id)}
                className={"w-full p-2 text-xs font-medium text-black hover:bg-red-800 hover:text-white rounded"}
            >
                {loadingForDelete ? "Deleting..." : "Delete"}
            </button>
        </div>
    );
}

export default OptionsModal;
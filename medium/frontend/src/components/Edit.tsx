function Edit() {
    return (
        <div className={"bg-zinc-100 shadow rounded z-2 absolute left-7 -top-1"}>
            <div className={"w-20 p-2 text-xs font-medium text-black hover:bg-blue-800 hover:text-white rounded"}>
                Edit
            </div>
            <div
                className={"w-20 p-2 text-xs font-medium text-black hover:bg-red-800 hover:text-white rounded"}>
                Delete
            </div>
        </div>
    );
}

export default Edit;
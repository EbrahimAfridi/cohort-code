import Appbar from "../components/Appbar.tsx";
import {Form} from "../components/Form.tsx";
import {useParams} from "react-router-dom";

function EditBlog() {
    const { id } = useParams<{id: string}>();

    return (
        <section>
            <Appbar/>
            <Form id={id ?? ""}/>
        </section>
    );
}

export default EditBlog;
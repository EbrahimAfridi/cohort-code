import Appbar from "../components/Appbar.tsx";
import axios from "axios";
import {BACKEND_URL} from "../config.ts";
import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";

function PublishPage() {
    return (
        <section>
            <Appbar/>
            <BlogEditor/>
        </section>
    );
}

export default PublishPage;

export function BlogEditor() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleBlogSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                    title,
                    content,
                    thumbnail,
                }, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                }
            );
            setLoading(false);
            navigate(`/blog/${response.data.id}`);
        } catch (e) {
            console.error(e)
            throw new Error("Error while publishing.");
        }
    }

    return (
        <form onSubmit={handleBlogSubmit} className={"max-w-screen-lg mx-auto mt-6"}>
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">
                Title
            </label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                id="title"
                className="block mb-6 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter blog title here..."
                required={true}
            />
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">
                Your message
            </label>
            <textarea
                required={true}
                onChange={(e) => setContent(e.target.value)}
                id="message" rows={4} cols={32}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write your blog here..."
            ></textarea>
            <label htmlFor="thumbnail" className="block mt-6 mb-2 text-sm font-medium text-gray-900">
                Blog Cover Image URL
            </label>
            <input
                type="url"
                onChange={(e) => setThumbnail(e.target.value)}
                id="thumbnail"
                className="block mb-6 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter blog title here..."
            />
            <button
                className={"mt-6 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-light rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"}
                type="submit"
                disabled={loading}
            >
                Publish Blog
            </button>
        </form>
    )
}
import {useNavigate} from "react-router-dom";
import {FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {BACKEND_URL} from "../config.ts";
import LoadingButton from "../ui/loading-button.tsx";

export function Form({id}: { id?: string }) {
    const navigate = useNavigate();
    const [blogData, setBlogData] = useState({title: "", content: "", thumbnail: ""});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBlog = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`);
                console.log("blog edit", response);
                setBlogData(response.data);
            } catch (error) {
                console.error(error);
                throw new Error("Error while fetching blog data for editing.");
            } finally {
                setLoading(false);
            }
        }

        fetchBlog();
    }, [id]);

    async function handleBlogSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            setLoading(true);
            console.log("Click")
            const response = await axios.put(`${BACKEND_URL}/api/v1/blog/edit/${id}`, {
                    blogData
                }, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                }
            );
            navigate(`/blog/${response.data.id}`);
        } catch (e) {
            throw new Error("Error while publishing blog post");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleBlogSubmit} className={"max-w-screen-lg mx-auto mt-6"}>
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">
                Title
            </label>
            <input
                type="text"
                value={blogData.title}
                onChange={(e) => setBlogData({...blogData, title: e.target.value})}
                id="title"
                className="block mb-6 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter blog title here..."
                required={true}
            />
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">
                Your message
            </label>
            <textarea
                value={blogData.content}
                required={true}
                onChange={(e) => setBlogData({...blogData, content: e.target.value})}
                id="message" rows={4} cols={32}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write your blog here..."
            ></textarea>
            <label htmlFor="thumbnail" className="block mt-6 mb-2 text-sm font-medium text-gray-900">
                Blog Cover Image URL
            </label>
            <input
                value={blogData.thumbnail}
                type="url"
                onChange={(e) => setBlogData({...blogData, thumbnail: e.target.value})}
                id="thumbnail"
                className="block mb-6 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter blog title here..."
            />
            <button
                className={"mt-6 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-light rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"}
                type="submit"
                disabled={loading}
            >
                {loading ? <LoadingButton/> : "Publish Blog"}
            </button>
        </form>
    )
}
import {useEffect, useState} from "react";
import {BACKEND_URL} from "../config.ts";
import axios from "axios";

export interface Blog {
    id: string;
    title: string;
    content: string;
    author: {
        name: string;
    };
    published: boolean;
    thumbnail: string;
}

// Single Blog
export const useBlog = ({id}: { id: string }) => {
    const [loading, setLoading] = useState(false);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                    headers: {Authorization: localStorage.getItem("token")}
                })
                const data: Blog = response.data;
                setBlog(data);
            } catch (err) {
                console.error("Error fetching single blog.", err);
            } finally {
                setLoading(false)
            }
        }
        fetchBlog();
    }, [id]);

    return {
        loading,
        blog,
    }
}

// All Blogs
export const useBlogs = () => {
    const [loading, setLoading] = useState(false);
    const [loadingForDelete, setLoadingForDelete] = useState(false);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                headers: {Authorization: localStorage.getItem("token")}
            })
            const data = response.data;
            setBlogs(data);
        } catch (err) {
            console.error("Error fetching bulk blogs.", err);
        } finally {
            setLoading(false)
        }
    }

    async function handleDelete(id: string) {
        console.log("Blog ID to delete:", id);
        setLoadingForDelete(true);
        try {
            console.log("DELETE CLICKED");
            await axios.delete(`${BACKEND_URL}/api/v1/blog/delete/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                }
            );
            await fetchBlogs();
        } catch (error) {
            console.error(error);
            alert("Error while deleting blog post");
        } finally {
            setLoadingForDelete(false);
        }
    }

    useEffect(() => {
        fetchBlogs();
    }, []);

    return {
        loading,
        blogs,
        handleDelete,
        loadingForDelete
    }
}
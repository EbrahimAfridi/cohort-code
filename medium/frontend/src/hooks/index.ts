import {useEffect, useState} from "react";
import {BACKEND_URL} from "../config.ts";
import axios from "axios";

export interface Blog {
    id: number;
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
                const data = response.data;
                console.log("FROM Blog", data);
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
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                    headers: {Authorization: localStorage.getItem("token")}
                })
                const data = response.data;
                console.log(data);
                setBlogs(data);
            } catch (err) {
                console.error("Error fetching bulk blogs.", err);
            } finally {
                setLoading(false)
            }
        }
        fetchBlogs();
    }, []);

    return {
        loading,
        blogs,
    }
}
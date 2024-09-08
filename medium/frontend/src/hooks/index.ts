import {useEffect, useState} from "react";
import {BACKEND_URL} from "../config.ts";
import axios from "axios";

interface Blog {
    id: number;
    title: string;
    content: string;
    author: {
        name: string;
    };
    published: boolean;
    thumbnail: string;
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(false);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                    headers: { "Authorization": localStorage.getItem("token") }
                })
                const data = response.data;
                console.log(data);
                setBlogs(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false)
            }
        }
        fetchBlogs();
    }, []);

    console.log(blogs)
    return {
        loading,
        blogs,
    }
}
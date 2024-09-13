import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignUpPage from "./pages/SignUp.tsx"
import SignInPage from "./pages/SignIn.tsx"
import BlogPage from "./pages/Blog.tsx"
import BlogsPage from "./pages/Blogs.tsx"
import PublishPage from "./pages/Publish.tsx";
import EditBlog from "./pages/EditBlog.tsx";

function App() {
    return (
        // TODO: Remove classname from main tag.className={"bg-gray-800 h-screen"}
        <main>
            <BrowserRouter>
                <Routes>
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/signin" element={<SignInPage />} />
                    <Route path="/blogs" element={<BlogsPage />} />
                    <Route path="/blog/:id" element={<BlogPage />} />
                    <Route path="/publish" element={<PublishPage />} />
                    <Route path="/blog/edit/:id" element={<EditBlog />} />
                </Routes>
            </BrowserRouter>
        </main>
    )
}

export default App

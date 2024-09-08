import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignUpPage from "./pages/SignUp.tsx"
import SignInPage from "./pages/SignIn.tsx"
import BlogPage from "./pages/Blog.tsx"
import BlogsPage from "./pages/Blogs.tsx"

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/signin" element={<SignInPage />} />
                    <Route path="/blog/:id" element={<BlogPage />} />
                    <Route path="/blogs" element={<BlogsPage />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App

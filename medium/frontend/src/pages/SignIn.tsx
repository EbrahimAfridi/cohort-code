import Auth from "../components/Auth.tsx";
import Quote from "../components/Quote.tsx";

export default function SignInPage() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <Auth type={"signin"}/>
            </div>
            <div className="hidden lg:block">
                <Quote/>
            </div>
        </div>
    )
}
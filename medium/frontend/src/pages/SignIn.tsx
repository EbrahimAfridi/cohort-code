import Auth from "../components/Auth.tsx";
import Quote from "../components/Quote.tsx";

export default function SignInPage() {
    return (
        <div className="grid grid-cols-2">
            <div>
                <Auth type={"signin"}/>
            </div>
            <div className="none lg:block">
                <Quote/>
            </div>
        </div>
    )
}
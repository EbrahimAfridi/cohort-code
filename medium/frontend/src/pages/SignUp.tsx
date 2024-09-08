import Auth from "../components/Auth.tsx";
import Quote from "../components/Quote.tsx";

export default function SignUpPage() {
    return (
        <div className="grid grid-cols-2">
            <div>
                <Auth type={"signup"}/>
            </div>
            <div className="invisible lg:visible">
                <Quote/>
            </div>
        </div>
    )
}
import {Link, useNavigate} from "react-router-dom";
import {ChangeEvent, useState} from "react";
import {ZodSignUp} from "@ebrahimafridi/medium-common"
import axios from "axios";
import {BACKEND_URL} from "../config.ts";

function Auth({type}: { type: "signin" | "signup" }) {
    const [postInputs, setPostsInputs] = useState<ZodSignUp>({
        name: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    async function sendRequest() {
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
                postInputs  // postInputs also contains name field but Zod will ignore name field for sign in route.
            );
            const jwt = response.data; // NEW -> response.data is jwt token
            // const jwt = response.data.jwt; OLD
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch (e) {
            alert("Error while signing up.");
            console.error(e);
        }
    }

    return (
        <div className="h-screen flex flex-col justify-center gap-18">
            <div className="flex flex-col justify-center items-center">
                <div className="text-3xl mb-1.5 font-extrabold">
                    {type === "signup" ? "Create an account" : "Sign in your account"}
                </div>
                <div className="text-slate-400">
                    {type === "signup" ? "Already have an account?" : "Don't have an account"}
                    <Link
                        className="pl-2 underline"
                        to={type === "signin" ? "/signup" : "/signin"}
                    >
                        {type === "signin" ? "Sign up" : "Sign in"}
                    </Link>
                </div>
            </div>
            <div className={"w-full flex flex-col justify-center items-center -mt-18"}>
                {type === "signup" && <LabeledInput
                    label={"Name"}
                    placeholder={"Ebrahim Afridi"}
                    onChange={(e) => {
                        setPostsInputs((c) => ({
                            ...c,
                            name: e.target.value
                        }))
                    }}
                />}
                <LabeledInput
                    inputType={"email"}
                    label={"Email"}
                    placeholder={"afridiebrahimck@gmail.com"}
                    onChange={(e) => {
                        setPostsInputs((c) => ({
                            ...c,
                            email: e.target.value
                        }))
                    }}
                />
                <LabeledInput
                    inputType={"password"}
                    label={"Password"}
                    placeholder={"Password"}
                    onChange={(e) => {
                        setPostsInputs((c) => ({
                            ...c,
                            password: e.target.value
                        }))
                    }}
                />
                <button
                    onClick={sendRequest}
                    type="button"
                    className="mt-8 w-72 md:w-96 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 rounded-lg
                    text-sm focus:ring-gray-300 font-medium px-5 py-2.5 me-2 mb-2 dark:bg-gray-800
                    dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                    {type === "signup" ? "Signup" : "Signin"}
                </button>
            </div>
        </div>
    );
}

export default Auth;

interface LabelInputTypes {
    inputType?: string;
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LabeledInput({inputType = "text", label, placeholder, onChange}: LabelInputTypes) {
    return <div className={"w-72 md:w-96"}>
        <label htmlFor="first-name" className="block mt-4 mb-1.5 text-sm font-medium text-black">
            {label}
        </label>
        <input
            type={inputType} id="first-name" onChange={onChange} placeholder={placeholder} required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
            focus:border-blue-500 block w-full p-2.5"
        />
    </div>
}
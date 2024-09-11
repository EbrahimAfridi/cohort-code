import axios from "axios";

async function getUserDetails() {
    const response = await axios.get("http://localhost:3000/api/user");
    console.log(response);
    return response.data;
}

export default async function Home() {
    const userDetails = await getUserDetails();

    return (
        <div className={"text-center flex flex-col justify-center h-screen"}>
            <div className="flex justify-center">
                <div className="border p-8 rounded">
                    <div>
                        Hi there, {userDetails.name}
                    </div>
                    {userDetails.email}
                </div>
            </div>
        </div>
    );
}

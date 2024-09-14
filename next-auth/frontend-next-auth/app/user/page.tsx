import {getServerSession}  from "next-auth";
import {NEXT_AUTH} from "@/app/lib/auth";

async function Page() {
    const session = await getServerSession(NEXT_AUTH);

    return (
        <div>
            {/*{JSON.stringify(session.data.user.name)}*/}
            {JSON.stringify(session?.user?.name)}
        </div>
    );
}

export default Page;
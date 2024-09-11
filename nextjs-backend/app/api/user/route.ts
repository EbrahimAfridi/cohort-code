import {NextRequest} from "next/server";

export async function POST(req: NextRequest) {
    // extract the body from request
    const body = await req.json();

    // store in database
    console.log(body);

    return Response.json({
        message: "You are logged in",
    });
}
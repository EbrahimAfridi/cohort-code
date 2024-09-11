import {NextRequest} from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient(); // Prisma instance

export async function POST(req: NextRequest) {
    // extract the body from request
    const body = await req.json();
    try {
        // store in database
        const user = await prisma.user.create({
            data: {
                username: body.username,
                password: body.password,
            }
        });

        return Response.json({
            message: "You are signed in",
            id: user.id
        });
    } catch (error) {
        console.error(error);
        throw new Error("Something went wrong");
    }
}
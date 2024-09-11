"use server"
import prisma from "@/db";
import {NextResponse} from "next/server";

export async function signup(username: string, password: string) {
    try {
        await prisma.user.create({
            data: {
                username: username,
                password: password,
            }
        });
        return "Sign up successfully";
    } catch (error) {
        console.error(error);
        return NextResponse.json({message: "Error creating user"}, {status: 411});
    }
}
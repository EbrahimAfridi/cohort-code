import {NextRequest, NextResponse} from "next/server";

export function GET(req: NextRequest, {params}: { params: { authRoutes: string[] } }) {
    console.log("PARAMS", params.authRoutes);
    return NextResponse.json({
        "message": "It's working :)"
    });
}

export function POST() {
    return NextResponse.json({
        "message": "It's working :)"
    });
}
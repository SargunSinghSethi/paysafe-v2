import { NextResponse } from "next/server";
import db from "@repo/db/client";

export const GET = async () => {
    await db.user.create({
        data: {
            number: "sdasdsa",
            password: "Sargun",
        }
    });
    return NextResponse.json({
        message: "hi there"
    })
}
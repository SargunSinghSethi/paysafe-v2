"use server";

import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function createOnRampTransaction(provider: string, amount: number) {
    // Ideally the token should come from the banking provider (hdfc/axis)
    const session = await getServerSession(authOptions);
    if (!session?.user || !session.user?.id) {
        return {
            message: "Unauthenticated request"
        }
    }
    const token = (Math.random() * 1000).toString();
    await db.onRampTransaction.create({
        data: {
            status: "Processing",
            token, 
            provider,
            amount: amount * 100,
            startTime: new Date(),
            userId: Number(session?.user?.id)
        }
    });

    return {
        message: "Done"
    }
}
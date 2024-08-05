"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;
    if (!from) {
        return {
            message: "Error while sending: User not authenticated"
        };
    }

    const toUser = await db.user.findFirst({
        where: {
            number: to
        }
    });

    if (!toUser) {
        return {
            message: "User not found"
        };
    }

    try {
        await db.$transaction(async (tx) => {
            // Check and lock the balance row
            const fromBalance = await tx.balance.findUnique({
                where: { userId: Number(from) },
                select: { amount: true }
            });

            if (!fromBalance || fromBalance.amount < amount) {
                throw new Error('Insufficient funds');
            }

            // Update balances
            await tx.balance.update({
                where: { userId: Number(from) },
                data: { amount: { decrement: amount } },
            });

            await tx.balance.update({
                where: { userId: toUser.id },
                data: { amount: { increment: amount } },
            });

            // Create the transfer record
            await tx.p2pTransfer.create({
                data: {
                    timestamp: new Date(),
                    amount,
                    fromUserId: Number(from),
                    toUserId: Number(toUser.id),
                }
            });
        });

        return { message: "Transfer successful" };
    } catch (error ) {
        console.error("Error during transfer:", error);
        // return { message: `Error: ${error.message}` };
    }
}

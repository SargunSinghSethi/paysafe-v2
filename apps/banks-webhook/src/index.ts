import express from "express";
import db from "@repo/db/client";
import { z } from "zod";

const app = express();

app.use(express.json());

const paymentSchema = z.object({
    token: z.string(),
    user_identifier: z.number(),
    amount: z.number(),
    // secret?: z.string(),
})

app.post("/hdfcWebhook", async (req, res) => {
    const validationResult = paymentSchema.safeParse(req.body)
    if (!validationResult.success) {
        return res.status(400).json({
            message: "Invalid request data",
            errors: validationResult.error.errors,
        })
    }
    
    const paymentInformation = validationResult.data;
    
    //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
    // if (paymentInformation.secret !== process.env.HDFC_SECRET) {
    //     return res.status(403).json({
    //         message: "Invalid secret key",
    //     });
    // }
    try {
        await db.$transaction([
            db.balance.update({
                where: {
                    userId: paymentInformation.user_identifier,
                },
                data: {
                    amount: {
                        increment: paymentInformation.amount,
                    },
                },
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token,
                },
                data: {
                    status: "Success",
                },
            }),
        ]);
        res.status(200).json({
            message: "Captured"
        });
    } catch (error) {
        console.error(error);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }

})

app.listen(3003, () => {
    console.log("Server is running on port 3003");
  });
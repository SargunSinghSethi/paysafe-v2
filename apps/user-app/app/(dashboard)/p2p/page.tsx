import { SendMoney } from "../../../components/SendMoneyCard";
import { P2PTransactions } from "../../../components/P2PTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import db from "@repo/db/client";

async function getP2PTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await db.p2pTransfer.findMany({
        where: {
            OR: [
                { fromUserId: Number(session?.user?.id) },
                { toUserId: Number(session?.user?.id) },
            ],
        },
        include: {
            fromUser: true,
            toUser: true,
        },
    });

    return txns.map(t => ({
        id: t.id,
        amount: t.amount,
        type: t.fromUserId === Number(session?.user?.id) ? 'Sent' : 'Received',
        counterparty: t.fromUserId === Number(session?.user?.id) ? t.toUser.name : t.fromUser.name,
        time: t.timestamp,
    }));
}


export default async function () {
    const transactions = await getP2PTransactions();
    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            P2P
        </div>
        <div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
                <div>
                    <SendMoney />
                </div>
                <div>
                    <div className="pt-4">
                        <P2PTransactions transactions={transactions}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

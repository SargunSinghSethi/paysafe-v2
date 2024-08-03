"use client";

import { Appbar } from "@repo/ui/appbar";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const AppbarClient = () => {
    const session = useSession();
    const router = useRouter();

    return (
        <div>
            <Appbar
            onSignIn={signIn}
            user={session.data?.user}
            onSignOut={async () => {
                await signOut();
                router.push("api/auth/signin");
            }} 
            />
        </div>
    );
}
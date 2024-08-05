"use client";

import { Button } from "@repo/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const UserSettings = () => {
    const session = useSession();
    const router = useRouter();

    const image = session?.data?.user?.image || "https://github.com/shadcn.png";
    const user = session?.data?.user;
    return (
        <div className="flex justify-between border-b px-6 pt-2">
            <div className="text-xl flex flex-col justify-center">
                PaySafe
            </div>
            <div className="flex flex-col justify-center">
                <DropdownMenu>
                    <DropdownMenuTrigger className="focus:ring-0 focus:ring-offset-0 focus:outline-none" >
                        <Avatar>
                            <AvatarImage src={image} className="w-full h-full select-none" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="animate-fadeIn mr-20">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>
                            <Button 
                            onClick={user ? signOut : signIn}>
                                {user ? "Logout" : "LogIn"}
                            </Button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}


"use client";

import { Button } from "@repo/ui/button";
import { LogOut } from 'lucide-react';
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
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
        <div className="flex justify-between border-b px-6 py-2">
            <div className="flex flex-col justify-center">
                <DropdownMenu>
                    <DropdownMenuTrigger className="focus:ring-0 focus:ring-offset-0 focus:outline-none" >
                        <Avatar>
                            <AvatarImage src={image} className="w-full h-full select-none" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="animate-fadeIn">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>
                            <Button
                                onClick={signOut}>
                                {user ? "Logout" : "LogIn"}
                            </Button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="text-xl flex flex-col justify-center">
                {user?.name}
                {user?.email}
            </div>
            <div className="text-xl flex flex-col justify-center">
                <Button
                    onClick={signOut}>
                    <LogOut
                        className="cursor-pointer"
                    />
                </Button>
            </div>
        </div>
    );
}


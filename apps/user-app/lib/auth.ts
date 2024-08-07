import type { NextAuthOptions, Session } from "next-auth";
import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";

type Credentials = {
    phone: string;
    password: string;
};

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                phone: { label: "Phone number", type: "text", placeholder: "1231231231" },
                password: { label: "Password", type: "password" }
            },
            // TODO: User credentials type from next-auth
            async authorize(credentials) {
                if(!credentials) return null;
                // TODO Do zod validation, OTP validation here
                const { phone, password } = credentials as Credentials;
                const existingUser = await db.user.findFirst({
                    where: {
                        number: phone
                    }
                });
                
                if (existingUser) {
                    const passwordValidation = await bcrypt.compare(password, existingUser.password);
                    if (passwordValidation) {
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            number: existingUser.number,
                        }
                    }
                    return null;
                }


                const hashedPassword = await bcrypt.hash(password, 10);
                try {
                    const user = await db.user.create({
                        data: {
                            number: credentials.phone,
                            password: hashedPassword,
                        }
                    });

                    // TODO: send an otp to the user for validation

                    return {
                        id: user.id.toString(),
                        name: user.name,
                        number: user.number,
                    }
                } catch (error) {
                    console.error(error);
                }

                return null;
            },
        })
    ],
    pages: {
        signIn: '/sign-in',
        // signOut: '/auth/signout',
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    secret: process.env.NEXTAUTH_SECRET || "secret",
    callbacks: {
        // TODO: can u fix the type here? Using any is bad
        async session({ token, session }: {token : JWT; session: Session}) {
            if(session.user) {
                session.user.id = token.sub as string;
            }

            return session;
        }
    }
}


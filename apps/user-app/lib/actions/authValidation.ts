"use server";

import { z } from "zod";
import { authFormSchema } from "../utils";

const formSchema = authFormSchema("sign-up");

interface AuthValidationProps {
    type: 'sign-in' | 'sign-up';
    data: z.infer<typeof formSchema>;
}

export async function AuthValidation({
    type,
    data,
}: AuthValidationProps) {

}
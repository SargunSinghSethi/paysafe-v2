import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const authFormSchema = (type: string) => z.object({
  firstname: type === "sign-in" ? z.string().optional() : z.string().min(3, {
    message: "Required"
  }),
  lastname: type === "sign-in" ? z.string().optional() : z.string().min(3, {
    message: "Required"
  }),
  address: type === "sign-in" ? z.string().optional() : z.string().min(50, {
    message: "Required"
  }),
  state: type === "sign-in" ? z.string().optional() : z.string().min(2, {
    message: "Required"
  }).max(2, {
    message: "Required"
  }),
  postalCode: type === "sign-in" ? z.string().optional() : z.string().min(3, {
    message: "Required"
  }).max(8, {
    message: "Required"
  }),
  email: type === "sign-in" ? z.string().email().optional() : z.string().email({
    message: "Enter a valid email"
  }),
  dateOfBirth: type === "sign-in" ? z.string().optional() : z.string().min(3, {
    message: "Required"
  }),
  
  aadharCard: type === "sign-in" ? z.string().optional() : z.string().min(3, {
    message: "Required"
  }),

  // login
  phoneNumber: z.string().min(10, {
    message: "Enter a valid 10 digit Number"
  }).max(10, {
    message: "Enter a valid 10 digit Number"
  }),
  password: z.string().min(8, {
    message: "Password must be at of least 8 characters"
  })
})
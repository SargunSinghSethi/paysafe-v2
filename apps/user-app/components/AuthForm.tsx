"use client";

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import CustomFormInput from "./CustomFormInput";

export const formSchema = z.object({
  number: z.string().min(10, {
    message: "Enter a valid 10 digit Number."
  }).max(10, {
    message: "Enter a valid 10 digit Number."
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters."
  })
})



const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      number: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Horizon logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Horizon</h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? 'Link Account' : type == "sign-in" ? 'Sign In' : 'Sign Up'}
            <p className="text-16 text-gray-600 font-normal">
              {user ? 'Link Your Account to get Started' : 'Please enter your details'}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div>
          {/* PlaidLink */}
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <CustomFormInput
                control={form.control}
                name="number"
                label="Number"
                placeholder="Enter your Mobile Number"
              />

              <CustomFormInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your Password"
              />

              <Button
                type="submit"
                size="lg"
                className="bg-blue-500 border-2 text-white hover:bg-white hover:text-black hover:border-blue-500 transition">
                Submit
              </Button>
            </form>
          </Form>
        </>
      )}
    </section>
  )
}

export default AuthForm
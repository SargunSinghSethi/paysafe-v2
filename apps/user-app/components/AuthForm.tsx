"use client";

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Form } from "./ui/form";
import { Button } from "./ui/button";
import CustomFormInput from "./CustomFormInput";
import { Loader2 } from "lucide-react";
import { authFormSchema } from "../lib/utils";

const AuthForm = ({ type }: { type: 'sign-in' | 'sign-up' }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
    }
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    console.log(data);
    alert(data);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
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
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1 ">Horizon</h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3 -mt-4">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? 'Link Account' : type == "sign-in" ? 'Log in' : 'Sign up'}
            <p className="text-16 text-gray-600 font-normal mt-3">
              {user ? 'Link Your Account to get Started' : 'Welcome back! Please enter your details.'}
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomFormInput control={form.control}
                      name="firstname" label="First Name"
                      loading={isLoading}
                      placeholder="Enter your first name"
                    />

                    <CustomFormInput control={form.control}
                      name="lastname" label="Last Name"
                      loading={isLoading}
                      placeholder="Enter your last name"
                    />
                  </div>

                  <CustomFormInput control={form.control}
                    name="address" label="Address"
                    loading={isLoading}
                    placeholder="Enter your Specific address"
                  />
                  <div className="flex gap-4">
                    <CustomFormInput control={form.control}
                      name="state" label="State"
                      loading={isLoading}
                      placeholder="Example: NY"
                    />

                    <CustomFormInput control={form.control}
                      name="postalCode" label="Postal Code"
                      loading={isLoading}
                      placeholder="Example: 110011"
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomFormInput control={form.control}
                      name="dateOfBirth" label="Date of Birth"
                      loading={isLoading}
                      placeholder="yyyy-mm-dd"
                    />

                    <CustomFormInput control={form.control}
                      name="aadharCard" label="Aadhar Card"
                      loading={isLoading}
                      placeholder="Example: 1234"
                    />
                  </div>
                  <CustomFormInput control={form.control}
                    name="email" label="Email"
                    loading={isLoading}
                    placeholder="Enter your email"
                  />
                </>
              )}

              <CustomFormInput control={form.control}
                name="phoneNumber" label="Mobile Number"
                loading={isLoading}
                placeholder="Enter your Mobile Number"
              />

              <CustomFormInput control={form.control}
                name="password" label="Password"
                loading={isLoading}
                placeholder="Enter your Password"
              />
              <div className="flex flex-col gap-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="form-btn">
                  {isLoading ? (
                    <>
                      <Loader2
                        size={20}
                        className="animate-spin"
                      />&nbsp;
                      Loading...
                    </>
                  ) : type === "sign-in" ? "Login" : "Sign up"}

                </Button>
              </div>

            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? '/sign-up' : "/sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? 'Sign up' : "Login"}
            </Link>
          </footer>
        </>
      )}
    </section>
  )
}

export default AuthForm
"use client";
import * as z from "zod";

import { useForm } from "react-hook-form";
import { CardWrapper } from "@/src/components/auth/card-wrapper";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form";
import { LoginSchema } from "@/src/schemas";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { FormError } from "@/src/components/form-error";
import { FormSuccess } from "@/src/components/form-success";
import { useSearchParams } from "next/navigation";
import { login } from "@/src/actions/login";
import { useState, useTransition } from "react";
import Link from "next/link";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "../ui/input-otp";
export const LoginForm = () => {
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();

  const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email Already In Use With Diffrent Provider" : ""; 


  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { 
      email: "",
      password: ""
    }
  });


  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");  
    setSuccess("");

    startTransition(() => {

      login(values)
        .then((data) => {
          if(data?.error){
            form.reset();
            setError(data?.error);
          }
          if(data?.success){
            form.reset();
            setSuccess(data.success);
          }

          if(data?.twoFactor){
            setShowTwoFactor(true);
          }
          
        }).catch(()=>{
          setError("Something Went Wrong!");
        });
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {showTwoFactor && (
              <FormField control={form.control} name="code" render={({ field }) => (
              <FormItem className="justify-center">
                <FormLabel>Two Factor Auth</FormLabel>
                <FormControl>
                  <div className="">
                  <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                  </div>
              
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            
           ) }
          {!showTwoFactor &&
          (
            <>
              <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    {...field}
                    placeholder="john.doe@example.com"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    {...field}
                    placeholder="******"
                    type="password"
                  />
                </FormControl>
                <Button size={'sm'} variant={'link'} asChild className="px-0 font-normal">
                  <Link href="/auth/reset">
                    Forget Password?
                  </Link>
                </Button>
                <FormMessage />
              </FormItem>
            )} />
            </>
          )
          }
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">

           {showTwoFactor ? "Submit" : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>


  );
};


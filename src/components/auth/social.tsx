"use client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { Button } from "@/src/components/ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/src/routes";
export const Social = () => {

    const onClick = (provider: "google" | 'github') => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT
        });
    }

    return (
        <div className="flex items-center w-full   gap-x-2">
            <Button size='lg' className="w-full flex items-center justify-center gap-x-2" variant={'outline'} onClick={() => onClick('google')}>
                <FcGoogle />
                Google
            </Button>
            <Button variant="outline" size='lg' className="w-full flex items-center justify-center gap-x-2" type="button" onClick={() => onClick('github')}>
                <FaGithub />
                GitHub
            </Button>
        </div>
    );
};
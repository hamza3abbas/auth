"use client";



import { ReactNode } from "react";
import { Card, CardHeader, CardContent, CardFooter, } from "@/src/components/ui/card";
import { Header } from "@/src/components/auth/header";
import { Social } from "@/src/components/auth/social";
import { BackButton } from "@/src/components/auth/back-button";
interface CardWrapperProps {
    children: ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
};

export const CardWrapper = ({ children, headerLabel, backButtonLabel, backButtonHref, showSocial = false }: CardWrapperProps) => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label={headerLabel} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}
            <CardFooter>
                <BackButton label={backButtonLabel} href={backButtonHref  } />   
            </CardFooter>
        </Card>
    )
}



"use server";
import { getUserByEmail } from "@/src/data/user";
import { getVerificationTokenByToken } from "@/src/data/verification-token";
import db from "@/src/lib/db";

export const newVerification = async (token:string) => {
    
    const existingToken = await getVerificationTokenByToken(token);
   
    if(!existingToken){
        return {error : "Token Does Not Exist!"}
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if(hasExpired){
        return {error : "Token Has Expired"}
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if(!existingUser){
        return {error : "User Does Not Exist!"}
    }


    await db.user.update({
        where : {
            id: existingUser.id
        },
        data : {
            emailVerified : new Date(),
            email: existingToken.email
        }
    });


    await db.verificationToken.delete({
        where :{
            id: existingToken.id
        }
    });


    return {success: "Email verified!"}

}
"use server";
import { getPasswordResetTokenByToken } from "@/src/data/password-reset-token";
import { getUserByEmail } from "@/src/data/user";
import db from "@/src/lib/db";
import { NewPasswordSchema } from "@/src/schemas";
import bcrypt  from "bcryptjs";
import * as z from "zod";

export const newPassword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token?: string | null,
) => {
    if(!token){
        return {error : "Missing token!"};
    }

    const validatedFields = NewPasswordSchema.safeParse(values);

    if(!validatedFields.success){
        return {error : "Invalid Fields!"}
    }

    const {password} = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);

    if(!existingToken){
        return { error : "Invalid Token!"};
    }

    const hasExpired = new Date(existingToken.expires) < new Date();


    if(hasExpired){
        return {error : "Token Has Expired!"}
    }

    const existingUser = await getUserByEmail(existingToken.email);


    if(!existingUser){
        return {error : "Email Does Not Exist!"};
    }

    const hashedPassword = await bcrypt.hash(password,10);

    await db.user.update({
        where : {
            id : existingUser.id
        },
        data : {
            password : hashedPassword
        }
    });

    await db.passwordResetToken.delete({
        where: {
            id:existingToken.id
        }
    });

    return {success : "Password Updated!"}
};
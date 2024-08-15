"use server";
import * as z from "zod";
import db from "@/src/lib/db";
import { getUserByID } from "@/src/data/user";
import { settingSchema } from "@/src/schemas";
import { getCurrentUser } from "@/src/lib/auth";


export const settings = async (
    values : z.infer<typeof settingSchema> 
) => {
    const user = await getCurrentUser();


    if(!user){
        return {error : "Unauthorized"}
    }

    const dbUser = await getUserByID(user.id ?? '');

    if(!dbUser){
        return {error : "Unauthorized"}
    }

    await db.user.update({
        where:{
            id : dbUser.id
        },
        data : {
            ...values,
        }
    });

    return {success : "Settings Updated"}

}
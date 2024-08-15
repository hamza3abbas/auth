import {v4 as uuidv4} from "uuid"; 

import crypto from "crypto";
import db from "@/src/lib/db";
import { getVerificationTokenByEmail } from "@/src/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/src/data/password-reset-token";
import { getTwoFactorTokenByEmail } from "@/src/data/two-factor-token";
export const generateTwoFactorToken = async (email:string)=>{
    const token = crypto.randomInt(100_000,1_000_000).toString();
      
    //limit to 15 min
    const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

    const exisitngToken = await getTwoFactorTokenByEmail(email);

    if(exisitngToken){
        await db.twoFactorToken.delete({
            where : {
                id :exisitngToken.id,
            }
        })
    }

    const twoFactorToken = await db.twoFactorToken.create({
        data : {
            email,token,expires
        }
    });

    return twoFactorToken;


}
export const  generateVerificationToken = async (email:string) => {
    const token  = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);



    const exisitngToken = await getVerificationTokenByEmail(email);


    if(exisitngToken){
         await db.verificationToken.delete({
            where : {
                id : exisitngToken.id, 
            }
         })
    }

    const verificationToken = await db.verificationToken.create({
        data: {
        email,
        token,
        expires 
        }
    })
    return verificationToken;
}
export const  generatePasswordResetToken = async (email:string) => {
    const token  = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const exisitngToken = await getPasswordResetTokenByEmail(email);

    if(exisitngToken){
         await db.passwordResetToken.delete({
            where : {
                id : exisitngToken.id, 
            }
         })
    }

    const passwordResetToken = await db.passwordResetToken.create({
        data: {
        email,
        token,
        expires 
        }
    })
    return passwordResetToken;
}
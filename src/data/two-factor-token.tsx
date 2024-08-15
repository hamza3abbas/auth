import db from "@/src/lib/db";

export const getTwoFactorTokenByEmail = async(email:string) => {
    try {
        const twoFactorToken =  db.twoFactorToken.findFirst({
            where : {
                email
            }
        });

        return twoFactorToken; 
    } catch  {
        return null
    }
} 

export const getTwoFactorTokenByToken = async(token:string) => {
    try {
        console.log("Searching for token:", token);
        const twoFactorToken =  db.twoFactorToken.findUnique({
            where : {
               token
            }
        });

        console.log("Verification token found:", twoFactorToken);
        return twoFactorToken; 
    } catch (error) {
        console.error("Error retrieving verification token:", error);
        return null;
    }
} 

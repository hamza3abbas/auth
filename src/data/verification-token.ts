import db from "@/src/lib/db";

export const getVerificationTokenByEmail = async(email:string) => {
    try {
        const verificationToken =  db.verificationToken.findFirst({
            where : {
                email
            }
        });

        return verificationToken; 
    } catch  {
        return null
    }
} 

export const getVerificationTokenByToken = async(token:string) => {
    try {
        console.log("Searching for token:", token);
        const verificationToken =  db.verificationToken.findUnique({
            where : {
               token
            }
        });

        console.log("Verification token found:", verificationToken);
        return verificationToken; 
    } catch (error) {
        console.error("Error retrieving verification token:", error);
        return null;
    }
} 

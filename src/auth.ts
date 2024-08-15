import NextAuth  from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import  db  from "@/src/lib/db"
import authConfig from "@/src/auth.config"
import { getUserByID } from "@/src/data/user"
import { getTwoFactorConfirmationByUserId } from "@/src/data/two-factor-confirmation"
import { UserRole } from "@prisma/client"
 

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages : {
    signIn : "/auth/login",
    error : "/auth/error"
  },
  events : {
   async linkAccount ({user}) {
     await db.user.update({
      where : {id : user.id},
      data : {emailVerified : new Date()}
     })
   }
  },
  callbacks:{
    async signIn({user,account}){

   

      const existingUser = await getUserByID(user.id as string);




      if(!existingUser?.emailVerified) return false;


      if(existingUser.isTwoFactorEnabled){
      const twoFactorConfirmation =  await getTwoFactorConfirmationByUserId(existingUser.id);

      if(!twoFactorConfirmation) return false;

      await db.twoFactorConfirmation.delete({
        where : { id: twoFactorConfirmation.id}
      });  
    }
      return true;
    },
    
    async session({token,session}){
      if(token.sub &&  session.user){
        session.user.id = token.sub; 
      }
  
      if(token.role && session.user){
        session.user.role = token.role as UserRole;
      }

      if(session.user){
        session.user.isTwoFactorEnabled  = token.isTwoFactorEnabled as boolean;
      }

      if(session.user){
        session.user.isTwoFactorEnabled  = token.isTwoFactorEnabled as boolean;
      }

      if(session.user){
        session.user.name  = token.name;
        session.user.email  = token.email ??'';
      }

      return session;
    },
 
    async jwt({token}) { 
      console.log('im been calling again')
      if(!token.sub) return token;

      const existingUser = await getUserByID(token.sub);

      if(!existingUser) return token;


        token.name = existingUser.name; 

        token.email = existingUser.email; 
      
        token.role = existingUser.role; 

        token.isTwoFactorEnabled  = existingUser.isTwoFactorEnabled;

        

      return token;
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})
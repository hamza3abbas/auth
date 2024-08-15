"use server";

import * as z from "zod";

import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/src/schemas";

import { revalidatePath, revalidateTag } from "next/cache";
import db from "@/src/lib/db";
import { getUserByEmail } from "@/src/data/user";
import { generateVerificationToken } from "@/src/lib/tokens";
import { sendVerificationEmail } from "@/src/lib/mail";
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if(existingUser){
     return { error : "Email already in use"}
  }

  await db.user.create({
    data : {
      name,
      email,
      password:hashedPassword,
    }
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token,
  );


  //To Do Implment send 



  return { success: "Confirmation Email Sent" };
};

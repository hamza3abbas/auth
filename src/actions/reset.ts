"use server";
import * as z from "zod";
import { ResetSchema } from "@/src/schemas";
import { getUserByEmail } from "@/src/data/user";
import { generatePasswordResetToken } from "@/src/lib/tokens";
import { sendPasswordResetEmail } from "@/src/lib/mail";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid email!" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email Not Found!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  await sendPasswordResetEmail(
    passwordResetToken.email,
    existingUser.name ?? email,
    passwordResetToken.token,
    'ABS SOLUTIONS'
  );

  return {success : "Reset Email Sent!"};
  
};

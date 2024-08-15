import { sendEmail } from "../actions/sendEmail";

export const sendTwoFactorTokenEmail = async (
  email: string,
  username: string,
  authenticationCode: string,
  codeExpiryTime: string,
  companyName: string,
) => {
  try {
    await sendEmail({
      to: [email],
      subject: `2FA CODE`,
      templateId: 1, 
      params: {
        username,
        authenticationcode: authenticationCode,
        codeexpirytime: codeExpiryTime,
        companyname: companyName,
      },
    });
  } catch (error) {
    console.log(error);
  }
};


export const sendVerificationEmail = async (
  email: string,
  username: string,
  token: string,
  companyName: string,
) => {
  const defaultAuthPath = process.env.NEXT_BASE_URL_AUTH!;
  const confirmationLink = `${defaultAuthPath}new-verification?token=${token}`;

  try {
    await sendEmail({
      to: [email],
      subject: `Confirmation Link`,
      templateId: 2,
      params: {
        username,
        confirmationlink: confirmationLink,
        companyname: companyName,
      },
    });
  } catch (error) {
    console.log(error);
  }
};


export const sendPasswordResetEmail = async (
  email: string,
  username: string,
  token: string,
  companyName: string,
) => {
  const defaultAuthPath = process.env.NEXT_BASE_URL_AUTH!;
  const resetLink = `${defaultAuthPath}new-password?token=${token}`;

  try {
    await sendEmail({
      to: [email],
      subject: `Reset Your Password`,
      templateId: 3, 
      params: {
        username,
        passwordresetlink: resetLink,
        companyname: companyName,
      },
    });
  } catch (error) {
    console.log(error);
  }
};


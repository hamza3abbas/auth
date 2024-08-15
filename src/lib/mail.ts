import { sendEmail } from "../actions/sendEmail";


export const sendTwoFactorTokenEmail = async (
  email:string,
  token:string,
) => {

     try {
      await sendEmail({
        to: email,
        subject: `2FA CODE`,
        htmlContent: `<p>yYour 2FA Code : ${token}`,
      });
     } catch (error) {
      console.log(error);
     }

      
} 


export const sendVerificationEmail = async (
    email:string,
    token:string,
) => {

    const defaultAuthPath = process.env.NEXT_BASE_URL_AUTH!;

    const confirmLink = `${defaultAuthPath}new-verification?token=${token}`;


    console.log(confirmLink);
       try {
        await sendEmail({
        
          to: email,
          subject: `Confirmation Link`,
          htmlContent: `<p>Click <a href="${confirmLink}">here</a> to confirm email.`,
        });
       } catch (error) {
        console.log(error);
       }

        
} 

export const sendPasswordResetEmail = async (
  email:string,
  token:string,
) => {

  const defaultAuthPath = process.env.NEXT_BASE_URL_AUTH!;

  const resetLink = `${defaultAuthPath}new-password?token=${token}`;


  console.log(resetLink);
     try {
      await sendEmail({
        to: email,
        subject: `Reset Your Password`,
        htmlContent: `<p>Click <a href="${resetLink}">Here</a> To Reset Your Email.`,
      });
     } catch (error) {
      console.log(error);
     }

      
} 
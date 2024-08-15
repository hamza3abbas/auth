interface SendEmailProps {
  to: string[];
  subject: string;
  templateId: number;
  params?: Record<string, any>;
}

export async function sendEmail({
  to,
  subject,
  templateId,
  params = {},
}: SendEmailProps): Promise<{ success: boolean; data?: any; error?: any }> {
  const apiKey = process.env.BREVO_API_KEY;
  const apiEndpoint = 'https://api.brevo.com/v3/smtp/email';

  const emailData = {
    sender: { name: 'ABS Solution', email: 'hamza.abb1999@gmail.com' },
    to: to.map((email) => ({ email })),
    subject: subject,
    templateId: templateId,
    params: params,
  };

  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'api-key': apiKey!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error sending email');
    }

    const data = await response.json();
    console.log('Email sent successfully:', data);
    return { success: true, data };
  } catch (error: any) {
    console.error('Error sending email:', error.message);
    return { success: false, error: error.message };
  }
}

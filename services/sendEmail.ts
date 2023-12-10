import { SendEmailServiceMessages } from './enums';

type ResponseData = {
  msg: string;
  success: boolean;
};

type Data = {
  name: string;
  email: string;
  message: string;
};

export default async function sendEmail(data: Data): Promise<ResponseData> {
  try {
    const response = await fetch('/api/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData: ResponseData = await response.json();
      return responseData;
    } else {
      const errorData: ResponseData = await response.json();
      return errorData;
    }
  } catch (error) {
    throw new Error(SendEmailServiceMessages.Error);
  }
}

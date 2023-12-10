import { LoginServiceMessages } from './enums';

export default async function loginTranslator(data: {}) {
  try {
    const res = await fetch(`api/translators`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      throw new Error(LoginServiceMessages.Error);
    }
  } catch (err: any) {
    if (err instanceof Error) {
      throw new Error(LoginServiceMessages.UnknownError);
    } else {
      throw new Error(LoginServiceMessages.UnknownError);
    }
  }
}

import { GetTranslatorServiceMessages } from './enums';

async function getTranslator(email: any, exists: boolean = false) {
  try {
    let baseURL = `api/translators?email=${encodeURIComponent(email)}`;
    if (exists) {
      baseURL += `&exists=${encodeURIComponent(exists)}`;
    }
    const res = await fetch(baseURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      throw new Error(GetTranslatorServiceMessages.NotFound);
    }
  } catch (err: any) {
    if (err instanceof Error) {
      throw new Error(GetTranslatorServiceMessages.NotFound);
    } else {
      throw new Error(GetTranslatorServiceMessages.UnknownError);
    }
  }
}

export default getTranslator;

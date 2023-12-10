import { UpdateTranslatorServiceMessages } from './enums';

export default async function updateTranslator(id: string, data: {}) {
  try {
    const res = await fetch(`api/translators/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      throw new Error(UpdateTranslatorServiceMessages.Error);
    }
  } catch (err: any) {
    if (err instanceof Error) {
      throw new Error(UpdateTranslatorServiceMessages.UnknownError, err);
    } else {
      throw new Error(UpdateTranslatorServiceMessages.UnknownError);
    }
  }
}

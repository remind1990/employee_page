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
      throw new Error('user not found');
    }
  } catch (err: any) {
    if (err instanceof Error) {
      throw new Error('There is no such user in our database');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

export default getTranslator;

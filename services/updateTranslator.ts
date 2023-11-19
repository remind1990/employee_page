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
      throw new Error('user was not updated');
    }
  } catch (err: any) {
    if (err instanceof Error) {
      throw new Error('Some problem occurred during updating');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

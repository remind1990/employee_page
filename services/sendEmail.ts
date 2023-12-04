type data = {
  name: string;
  email: string;
  message: string;
};
export default async function sendEmail(data: data) {
  try {
    const response = await fetch('/api/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    throw new Error('Something whent wrong');
  }
}

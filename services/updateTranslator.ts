export default async function updateTranslator(
  email: String,
  password: String
) {
  try {
    await fetch('api/translators', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  } catch (err) {
    console.log(err);
  }
}

import { NextResponse } from 'next/server';
import { connectToDatabase, collections } from '../../../libs/mongoDB';

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const userEmail = searchParams.get('email');
  const existsParam = searchParams.get('exists');
  try {
    await connectToDatabase();
    const translatorsCollections = collections.get('collectionTranslators');
    const translators = await translatorsCollections
      .find({ email: userEmail })
      .toArray();

    if (translators.length > 0) {
      if (existsParam) {
        return NextResponse.json({
          msg: 'email was found in database',
          success: true,
          data: true,
        });
      } else {
        return NextResponse.json({
          msg: 'Successfully found a user',
          success: true,
          data: translators[0],
        });
      }
    }
  } catch (err) {
    console.error(err);
    throw new Error('Error downloading collection');
  }
}

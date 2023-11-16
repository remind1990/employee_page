import { NextResponse } from 'next/server';
import { connectToDatabase, collections } from '../../../libs/mongoDB';

export async function GET() {
  try {
    await connectToDatabase();
    const translatorsCollections = collections.get('collectionTranslators');
    const translators = await translatorsCollections
      .find({ email: 'pesnja25@gmail.com' })
      .toArray();

    return NextResponse.json({
      msg: ['collection downloaded successfully'],
      success: true,
      data: translators[0],
    });
  } catch (err) {
    throw new Error('Error downloading collection');
    NextResponse.error(err);
  }
}

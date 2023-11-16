import { NextResponse } from 'next/server';
import { connectToDatabase, collections } from '../../../libs/mongoDB';

export async function GET() {
  try {
    await connectToDatabase();
    const translatorsCollections = collections.get('collectionTranslators');
    const translators = await translatorsCollections.find().toArray();
    console.log(translators);

    return NextResponse.json({
      msg: ['collection downloaded successfully'],
      success: true,
    });
  } catch (err) {
    throw new Error('Error downloading collection');
    NextResponse.error(err);
  }
}

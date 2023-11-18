import { NextResponse } from 'next/server';
import { connectToDatabase, collections } from '../../../../libs/mongoDB';
import { ObjectId } from 'mongodb';

export async function PUT(req, { params }) {
  console.log('Updating translator');
  const { id } = params;
  const { email, password } = await req.json();
  try {
    await connectToDatabase();
    const objectId = new ObjectId(id);
    const translatorsCollections = collections.get('collectionTranslators');

    const updatedResult = await translatorsCollections.updateOne(
      { _id: objectId },
      { $set: { password: password } }
    );
    if (updatedResult.modifiedCount > 0) {
      console.log('Updated 🤗');
      const searchingTranslator = await translatorsCollections.findOne({
        _id: objectId,
      });

      return NextResponse.json({
        msg: 'Translator was updated with mongoose',
        success: true,
        data: searchingTranslator,
      });
    } else {
      return NextResponse.json({
        msg: 'No translator was updated',
        success: false,
      });
    }
  } catch (err) {
    console.log(err);
    throw new Error('Error in function:', err);
  }
}

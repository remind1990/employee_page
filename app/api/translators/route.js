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
          data: translators[0]._id,
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

// export async function POST(req) {
//   console.log('Posting translator');
//   try {
//     await connectToDatabase();
//     await mongooseConnectDB();

//     // Find documents in the collection
//     const translatorsCollections = collections.get('collectionTranslators');
//     const irina = await translatorsCollections
//       .find({ email: 'pesnja25@gmail.com' })
//       .toArray();
//     const newTranslator = irina[0];
//     const insertedTranslator =
//       await Translator.collection.insertOne(newTranslator);
//     return NextResponse.json({
//       msg: 'translators found using mongoose',
//       success: true,
//       data: newTranslator,
//     });
//   } catch (err) {
//     console.log(err);
//     throw new Error('Error in function:', err);
//   }
// }

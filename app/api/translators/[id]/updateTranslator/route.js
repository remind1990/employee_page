import { ApiError, ApiSuccess } from '@/app/enums/enums';
import {
  getCollections,
  mongooseConnectDB,
} from '@/libs/mongodbConnectWithMongoose';
import { NextResponse } from 'next/server';

export async function PUT(req, { params }) {
  const { card } = await req.json();
  const { id } = params;
  if (card) {
    try {
      await mongooseConnectDB();
      const collections = getCollections();
      const hasCollectionTranslators = collections.hasOwnProperty(
        'collectionTranslators'
      );
      if (!hasCollectionTranslators) {
        return NextResponse.json({
          status: 500,
          message: 'collections not found',
        });
      }
      const result = await collections.collectionTranslators?.updateOne(
        {
          _id: id,
        },
        {
          card: card,
        }
      );
      if (result.modifiedCount > 0) {
        return NextResponse.json({
          status: 200,
          message: 'translator is updated succesfully',
        });
      } else {
        return NextResponse.json({
          status: 200,
          message: 'translator is not updated',
        });
      }
    } catch (err) {
      return NextResponse.json({
        status: 500,
        message: 'something whent wrong in updating card',
      });
    }
  } else {
    return NextResponse.json({
      status: 500,
      message: 'No body was passed',
    });
  }
}

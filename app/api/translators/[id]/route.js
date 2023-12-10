import { NextResponse } from 'next/server';
import { connectToDatabase, collections } from '../../../../libs/mongoDB';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import { checkRateLimit } from '../../../../helpers/rateLimiter';
import { ApiError, ApiSuccess } from '@/app/enums/enums';

export async function PUT(req, { params }) {
  const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress;

  if (!checkRateLimit(ip)) {
    return NextResponse.json({
      msg: ApiError.RATE_LIMIT_EXCEEDED,
      success: false,
    });
  }

  const { id } = params;
  const { password } = await req.json();
  try {
    await connectToDatabase();
    const objectId = new ObjectId(id);
    const translatorsCollections = collections.get('collectionTranslators');
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedResult = await translatorsCollections.updateOne(
      { _id: objectId },
      { $set: { password: hashedPassword } }
    );
    if (updatedResult.modifiedCount > 0) {
      const searchingTranslator = await translatorsCollections.findOne({
        _id: objectId,
      });

      return NextResponse.json({
        msg: ApiSuccess.TRANSLATOR_UPDATED_SUCCESSFULLY,
        success: true,
        data: searchingTranslator,
      });
    } else {
      return NextResponse.json({
        msg: ApiError.TRANSLATOR_NOT_UPDATED,
        success: false,
      });
    }
  } catch (err) {
    console.log(err);
    throw new Error(`${ApiError.FUNCTION_ERROR}: ${err.message}`);
  }
}

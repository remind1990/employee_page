import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { checkRateLimit } from '../../../../helpers/rateLimiter';
import { ApiError, ApiSuccess } from '@/app/enums/enums';
import {
  getCollections,
  mongooseConnectDB,
} from '@/libs/mongodbConnectWithMongoose';

export async function PUT(req, { params }) {
  console.log('in put function');
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
    await mongooseConnectDB();
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await getCollections().collectionTranslators.updateOne(
      {
        _id: id,
      },
      {
        password: hashedPassword,
      }
    );
    if (result.modifiedCount > 0) {
      const searchingTranslator =
        await getCollections().collectionTranslators.findOne({
          _id: id,
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

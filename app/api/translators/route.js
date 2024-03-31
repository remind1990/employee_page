import { NextResponse } from 'next/server';
import { checkRateLimit } from '../../../helpers/rateLimiter';
import bcrypt from 'bcrypt';
import { ApiError, ApiSuccess } from '@/app/enums/enums';
import {
  mongooseConnectDB,
  getCollections,
} from '../../../libs/mongodbConnectWithMongoose';
import {
  getCurrentMonthEndDayInUTC,
  getCurrentMonthStartDayInUTC,
} from '@/helpers/dateCalcs/dateCalcs';

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const userEmail = searchParams.get('email');
  const existsParam = searchParams.get('exists');

  try {
    await mongooseConnectDB();
    const mongooseData = await getTranslatorsWithMongoose(userEmail);
    const { translator } = mongooseData;

    if (translator) {
      if (existsParam) {
        return NextResponse.json({
          msg: translator.password
            ? `${ApiSuccess.LOG_IN_MESSAGE}`
            : `${ApiSuccess.USER_FOUND_SUCCESSFULLY}`,
          success: true,
          data: {
            _id: translator._id,
            registered: translator.password ? true : false,
          },
        });
      } else {
        return NextResponse.json({
          msg: ApiSuccess.USER_FOUND_SUCCESSFULLY,
          success: true,
          data: translator,
        });
      }
    }
  } catch (err) {
    console.error(err);
    throw new Error(
      `${ApiError.FUNCTION_ERROR}: ${ApiError.DOWNLOAD_COLLECTION_ERROR}`
    );
  }
}

export async function POST(req) {
  const { email, password } = await req.json();
  const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress;

  if (!checkRateLimit(ip)) {
    return NextResponse.json({
      msg: ApiError.RATE_LIMIT_EXCEEDED,
      success: false,
    });
  }

  try {
    await mongooseConnectDB();
    const mongooseData = await getTranslatorsWithMongoose(email);
    if (!mongooseData) {
      return NextResponse.json({
        msg: ApiError.NO_TRANSLATOR_FOUND,
        success: false,
      });
    }
    const { translator } = mongooseData;
    console.log(password, translator.password);
    if (translator && translator.password) {
      const passwordsMatch = await bcrypt.compare(
        password,
        translator.password
      );
      console.log(passwordsMatch);
      if (passwordsMatch) {
        return NextResponse.json({
          msg: ApiSuccess.LOGIN_SUCCESSFUL,
          success: true,
          data: {},
          mongooseData: {
            mongooseData,
          },
        });
      } else {
        throw new Error(ApiError.AUTHENTICATION_ERROR);
      }
    }
  } catch (err) {
    console.error(err);
    throw new Error(`${ApiError.FUNCTION_ERROR}: ${err.message}`);
  }
}

async function getTranslatorsWithMongoose(email) {
  try {
    const translator = await getCollections()
      .collectionTranslators.findOne({
        email: email,
      })
      .populate('clients');
    if (translator) {
      const balanceDays = await getMonthBalanceDaysForTranslators(
        translator._id
      );
      const data = {
        translator,
        balanceDays,
      };
      return data;
    } else {
      console.log('No translators found.');
    }
  } catch (error) {
    console.error('Error finding translators:', error);
  }
}

async function getMonthBalanceDaysForTranslators(id) {
  const firstDayOfTheMonth = getCurrentMonthStartDayInUTC();
  const lastDayOfTheMonth = getCurrentMonthEndDayInUTC();
  let query = {};
  try {
    if (id) {
      query.translator = id;
    }
    query.dateTimeId = {
      $gte: firstDayOfTheMonth,
      $lte: lastDayOfTheMonth,
    };
    const BalanceDay = await getCollections().collectionBalanceDays;
    const currentMonthBalanceDays = await BalanceDay.find(query).exec();
    return currentMonthBalanceDays;
  } catch (err) {
    console.log(err);
    throw new error('Error: getting balance day', err);
  }
}

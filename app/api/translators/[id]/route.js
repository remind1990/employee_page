import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { checkRateLimit } from '../../../../helpers/rateLimiter';
import { ApiError, ApiSuccess } from '@/app/enums/enums';
import {
  getCollections,
  mongooseConnectDB,
} from '@/libs/mongodbConnectWithMongoose';

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

export async function POST(req, { params }) {
  const ip =
    req.headers.get('x-forwarded-for') ||
    req.headers.get('x-real-ip') ||
    req.connection.remoteAddress;

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      {
        msg: ApiError.RATE_LIMIT_EXCEEDED,
        success: false,
      },
      { status: 429 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch (err) {
    return NextResponse.json(
      {
        msg: ApiError.INVALID_REQUEST_BODY,
        success: false,
      },
      { status: 400 }
    );
  }

  const { id } = params;
  if (!body || !id) {
    return NextResponse.json(
      {
        msg: ApiError.TRANSLATOR_NO_DATES_PASSED,
        success: false,
      },
      { status: 400 }
    );
  }

  try {
    await mongooseConnectDB();
    const translator = await getCollections().collectionTranslators.findOne({
      _id: id,
    });

    if (!translator) {
      return NextResponse.json(
        {
          msg: ApiError.TRANSLATOR_NOT_FOUND,
          success: false,
        },
        { status: 404 }
      );
    }

    const balanceDays = await getBalanceDayForSelectedDates(
      translator._id,
      body
    );

    const data = {
      translator,
      balanceDays,
    };
    return NextResponse.json({
      msg: 'Success',
      success: true,
      data: data,
    });
  } catch (err) {
    console.error('Error in balance day update function:', err);
    return NextResponse.json(
      {
        msg: `${ApiError.FUNCTION_ERROR}: ${err.message}`,
        success: false,
      },
      { status: 500 }
    );
  }
}

async function getBalanceDayForSelectedDates(id, dates) {
  if (!dates || !dates.startDate || !dates.endDate) {
    throw new Error('Error: no dates picked');
  }

  let query = {};
  try {
    if (id) {
      query.translator = id;
    }
    query.dateTimeId = {
      $gte: new Date(dates.startDate),
      $lte: new Date(dates.endDate),
    };

    const BalanceDay = getCollections().collectionBalanceDays;
    const selectedMonthBalanceDay = await BalanceDay.find(query).exec();
    return selectedMonthBalanceDay;
  } catch (err) {
    console.error('Error in getBalanceDayForSelectedDates:', err);
    throw new Error('Something went wrong while fetching balance days');
  }
}

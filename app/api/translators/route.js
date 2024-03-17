import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { connectToDatabase, collections } from '../../../libs/mongoDB';
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
    await connectToDatabase();
    const translatorsCollections = collections.get('collectionTranslators');
    const translators = await translatorsCollections
      .find({ email: userEmail })
      .toArray();

    if (translators.length > 0) {
      if (existsParam) {
        return NextResponse.json({
          msg: translators[0].password
            ? `${ApiSuccess.LOG_IN_MESSAGE}`
            : `${ApiSuccess.USER_FOUND_SUCCESSFULLY}`,
          success: true,
          data: {
            _id: translators[0]._id,
            registered: translators[0].password ? true : false,
          },
        });
      } else {
        return NextResponse.json({
          msg: ApiSuccess.USER_FOUND_SUCCESSFULLY,
          success: true,
          data: translators[0],
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
    await connectToDatabase();
    await mongooseConnectDB();
    const translatorsCollections = collections.get('collectionTranslators');
    const mongooseData = await getTranslatorsWithMongoose(email);
    const searchingTranslator = await translatorsCollections.findOne({
      email: email,
    });
    if (!searchingTranslator) {
      return NextResponse.json({
        msg: ApiError.NO_TRANSLATOR_FOUND,
        success: false,
      });
    }
    const clientsCollection = collections.get('collectionClients');
    const clientsOnTranslators = searchingTranslator.clients.map(
      ({ _id }) => new ObjectId(_id)
    );
    const clientsFromCollectionClients = await clientsCollection
      .find(
        { _id: { $in: clientsOnTranslators } },
        { projection: { _id: 1, image: 1 } }
      )
      .toArray();
    const updatedClientsArray = searchingTranslator.clients.map((client) => {
      const clientFromCollection = clientsFromCollectionClients.find(
        (collectionClient) => collectionClient._id.toString() === client._id
      );

      if (clientFromCollection) {
        return {
          ...client,
          image: clientFromCollection.image,
        };
      }

      return client;
    });
    if (searchingTranslator && searchingTranslator.password) {
      const passwordsMatch = await bcrypt.compare(
        password,
        searchingTranslator.password
      );
      if (passwordsMatch) {
        return NextResponse.json({
          msg: ApiSuccess.LOGIN_SUCCESSFUL,
          success: true,
          data: {
            ...searchingTranslator,
            clients: updatedClientsArray,
          },
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

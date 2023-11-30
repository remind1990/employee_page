import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { connectToDatabase, collections } from '../../../libs/mongoDB';
import { checkRateLimit } from '../../../helpers/rateLimiter';
import bcrypt from 'bcrypt';

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
            ? `Hello ${translators[0].name}. Please log in`
            : 'email was found in database',
          success: true,
          data: {
            _id: translators[0]._id,
            registered: translators[0].password ? true : false,
          },
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

export async function POST(req) {
  const { email, password } = await req.json();
  const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress;

  if (!checkRateLimit(ip)) {
    return NextResponse.json({
      msg: 'Too many requests, please try again later.',
      success: false,
    });
  }

  try {
    await connectToDatabase();
    const translatorsCollections = collections.get('collectionTranslators');
    const searchingTranslator = await translatorsCollections.findOne({
      email: email,
    });
    if (!searchingTranslator) {
      return NextResponse.json({
        msg: 'No translator found',
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
      console.log(updatedClientsArray);
      if (passwordsMatch) {
        return NextResponse.json({
          msg: 'passwords match',
          success: true,
          data: {
            ...searchingTranslator,
            clients: updatedClientsArray,
          },
        });
      } else {
        throw new Error('There was a mistake in email or password');
      }
    }
  } catch (err) {
    console.error(err);
    throw new Error('Error in function:', err);
  }
}

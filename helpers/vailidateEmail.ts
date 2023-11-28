import { Document, Model } from 'mongoose';

interface Doc extends Document {
  _id: string;
}

export default function validateEmail(
  collection: Doc[],
  model: Model<Doc>
): void {
  collection.forEach(async (doc: Doc) => {
    try {
      await new model(doc).validate();
    } catch (error: any) {
      console.error('Validation error for document', doc._id, error.message);
    }
  });
}

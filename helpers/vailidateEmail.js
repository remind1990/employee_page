export default function validateEmail(collection, model) {
  console.log('validation started');
  collection.forEach(async (doc) => {
    try {
      await new model(doc).validate();
      console.log('Document is valid:', doc._id);
    } catch (error) {
      console.error('Validation error for document', doc._id, error.message);
    }
  });
}

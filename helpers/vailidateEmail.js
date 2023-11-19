export default function validateEmail(collection, model) {
  collection.forEach(async (doc) => {
    try {
      await new model(doc).validate();
    } catch (error) {
      console.error('Validation error for document', doc._id, error.message);
    }
  });
}

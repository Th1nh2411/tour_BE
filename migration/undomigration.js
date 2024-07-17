import mongoose from 'mongoose';

async function deleteCollection(collectionName) {
    mongoose.set('strictQuery', false);
    await mongoose.connect(
        'mongodb+srv://rinktvn2525:0905138221thinh@cluster0.dpawfmv.mongodb.net/tours_booking?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    );
    const db = mongoose.connection;
    const collection = db.collection(collectionName);

    try {
        await collection.drop();
        console.log(`Collection ${collectionName} deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting collection ${collectionName}:`, error);
    }
}

async function deleteCollections() {
    try {
        await Promise.all([
            deleteCollection('bookings'),
            deleteCollection('categories'),
            deleteCollection('guides'),
            deleteCollection('payments'),
            deleteCollection('reviews'),
            deleteCollection('tours'),
            deleteCollection('users'),
            deleteCollection('wishlists'),
            deleteCollection('messages'),
            deleteCollection('chats'),
            deleteCollection('feedbacks'),
            deleteCollection('usertemps'),
        ]);
        console.log('All collections deleted successfully.');
    } catch (error) {
        console.error('Error deleting collections:', error);
    } finally {
        mongoose.disconnect();
    }
}

deleteCollections();

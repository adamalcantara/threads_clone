import mongoose from 'mongoose';

// check the connection status
let isConnected = false;

export const connectToDB = async () => {
    // prevent unknown queries
    mongoose.set('strictQuery', true);

    // Throw an error if there is no URL
    if(!process.env.MONGODB_URL) return console.log('MONGODB_URL not found');
    if(isConnected) return console.log('Already connected to MongoDB');

    try {

    } catch (error) {
        
    }
}
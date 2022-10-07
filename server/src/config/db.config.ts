import mongoose from 'mongoose';
// enviroment viarbles
import dotenv from 'dotenv';
dotenv.config();

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */

const connectDB = async () => {
  try {
    // const connection = await mongoose.connect(enviroment.serverMongoUri as string);
    const connection = await mongoose.connect(process.env.MONGO_URI as string);

    const url = `${connection.connection.host}: ${connection.connection.port}`;
    console.log(`Connection successfully with Mongo DataBase in: ${url}`);
  } catch (error) {
    console.log(`error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;

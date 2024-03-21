import mongoose from 'mongoose';

const connection = {
  isConnected: false,
};
async function connectDB() {
    try {
        if (connection.isConnected) {
    return;
  }


  const mongodbURI = process.env.MONGODB_URI;
  if (!mongodbURI) {
    throw new Error('MongoDB URI is not defined in environment variables');
  }

  const db = await mongoose.connect(mongodbURI);
  connection.isConnected = db.connections[0].readyState === 1;

     console.log("DBconnected");

    } catch (error) {
        console.log("DB Error");
    }
}

export default connectDB;

async function disconnectDB() {
  try {
    if (!mongoose.connections || mongoose.connections.length === 0) {
      console.log("No active connections to disconnect.");
      return;
    }
    await Promise.all(
      mongoose.connections.map(async (connection) => {
        await connection.close();
      })
    );
    connection.isConnected = false;
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.log("Error disconnecting from MongoDB:", error);
  }
}

export { disconnectDB };



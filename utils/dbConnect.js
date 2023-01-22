import mongoose, { connection } from 'mongoose';

const connecion = {};

async function dbConnect() {
    if (connection.isConnected) {
        return;
    }

    mongoose.set('strictQuery', true);

    const db = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    connection.isConnected = db.connections[0].readyState;

    console.log('Successfuly connected to the database!');
}

export default dbConnect;
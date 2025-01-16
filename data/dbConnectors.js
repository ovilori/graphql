import mongoose from "mongoose";

//function to connect to mongoDB
async function connectMongo() {
    try {
        await mongoose.connect('mongodb://127.0.0.1/cars');
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error)
    }
}

connectMongo();

//create schema on the database
const carsSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    soldout: String,
    inventory: String,
    stores: Array,
});

//apply the schema to the cars database on the MongoDB

const Cars = mongoose.model('cars', carsSchema);

//export for use in resolvers

export { Cars };
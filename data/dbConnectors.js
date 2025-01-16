import mongoose from "mongoose";
import { Sequelize, DataTypes } from "sequelize";
import _ from 'lodash';
import casual from "casual"; //to generate some data

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

//create Sequelize connection
const sequelize = new Sequelize('sqlite::memory:')

//functions that will connect to Sequelize
//creating categories model for products i.e schema for a table categories in Category DB
const Categories = sequelize.define('categories', {
    category: DataTypes.STRING,
    description: DataTypes.STRING,
});

//making a connection to Sequelize
async function syncAndSeedCategories() {
    try {
        await sequelize.sync( {force: true });
        console.log('Connected to SQLite and Categories model is synced.')

        //Seed categories - creating elements inside the database
        await Promise.all(_.times(5, () => {
            return Categories.create({
                category: casual.word,
                description: casual.sentence,
            });
        }));
        console.log('Categories seeded');
    } catch (error) {
        console.log('Error with SQLite DB:', error)
    }
}
//run the seed function
syncAndSeedCategories();

//export for use in resolvers
export { Cars, Categories };
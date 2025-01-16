//resolver to user with MongoDB
// //resolvers - these are the functions that responds to queries and mutations, providing the result of the query.



//in memory objects to hold products

//import schema from dbConnectors.js file

import { Cars } from "./dbConnectors";

const productDatabase = {};

//function that returns information from the database
const resolvers = {
    getProduct: async ({ id }) => {
        try {
            const product = await Cars.findById(id);
            return product;
        } catch (error) {
            throw new Error(error);
        }
    },
    createProduct: ({ input }) => {
        // let id = require('crypto').randomBytes(10).toString('hex'); //generating product id randomly
        // productDatabase[id] = input;
        // return new Product(id, input) //returning the product with the ID

    }
}

export default resolvers;
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
    createProduct: async ({ input }) => {
        const newCars = new Cars({
            name: input.name,
            description: input.description,
            price: input.price,
            soldout: input.soldout,
            inventory: input.inventory,
            stores: input.stores,
        });
        
        newCars.id = newCars._id;
        try {
            await newCars.save();
            return newCars;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default resolvers;
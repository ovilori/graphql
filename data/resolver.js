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
    //creating items with mutation
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
    },
    //updating items with mutations
    updateProduct: async ( { input }) => {
        try{
            //find item by id, if found, update and if not create.
            const updateCars = await Cars.findByIdAndUpdate({ _id: input.id}, input, {new: true});
            return updateCars;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default resolvers;
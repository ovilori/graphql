//old resolver without MongoDB

//resolvers - these are the functions that responds to queries and mutations, providing the result of the query.

//declaring a class
class Product {
    constructor(id, {name, description, price, soldout, inventory, stores}){
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.soldout = soldout;
        this.inventory = inventory;
        this.stores = stores;
    }
}

//in memory objects to hold products

const productDatabase = {};

const resolvers = {
    getProduct: ({ id }) => {
        return new Product(id, productDatabase[id]);
    },

    createProduct: ({ input }) => {
        let id = require('crypto').randomBytes(10).toString('hex'); //generating product id randomly
        productDatabase[id] = input;
        return new Product(id, input) //returning the product with the ID

    }
}

export default resolvers;

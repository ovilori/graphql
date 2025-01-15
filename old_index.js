import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './data/schema';

const PORT = 8080;

const app = express();

app.get('/', (req, res) => {
    res.send('GraphQL is amazing!');
});

//declaring a class
class Product {
    constructor(id, {name, description, price, soldout, stores}){
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.soldout = soldout;
        this.stores = stores;
    }
}

//in memory objects to hold products

const productDatabase = {};

//resolvers - these are the functions that responds to queries and mutations, providing the result of the query.
//const root = {hello: () => "Hello, I am Alfie"} //resolver
const root = {
    product: () => {
        return {
            "id": 36646272772,
            "name": "Car",
            "description": "2020 Toyota Hybrid",
            "price": 30000.00,
            "soldout": false,
            "stores": [
                { store: "K-Cars"},
                { store: "Auto Fleet"},
                { store: "Drive well Cars Inc."}
            ],
        }
    },
        createProduct: ({ input }) => {
            let id = require('crypto').randomBytes(10).toString('hex'); //generating product id randomly
            productDatabase[id] = input;
            return new Product(id, input) //returning the product with the ID

        }
};

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(PORT, ( ) => console.log(`Running server on localhost:${PORT}/graphql`));


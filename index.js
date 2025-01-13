import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './data/schema';

const PORT = 8080;

const app = express();

app.get('/', (req, res) => {
    res.send('GraphQL is amazing!');
});

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
            ]
        }
    }};

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(PORT, ( ) => console.log(`Running server on localhost:${PORT}/graphql`));


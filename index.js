import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './data/schema';
import resolvers from './data/resolver';

const PORT = 8080;

const app = express();

app.get('/', (req, res) => {
    res.send('GraphQL is amazing!');
});

//const root = resolvers;

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    //rootValue: root,
    graphiql: true,
}));

app.listen(PORT, ( ) => console.log(`Running server on localhost:${PORT}/graphql`));


//blueprint of data that GraphQL will be accepting

import { buildSchema } from "graphql";

const schema = buildSchema(`

    type Product {
        id: ID
        name: String
        description: String
        price: Float
        #soldout: Boolean
        soldout: Soldout
        inventory: Int
        stores: [Store]! 
        }

        #restrcting soldout to either "soldout" or "onsale"
        enum Soldout {
            soldout
            onsale
        }

        type Store {
            store: String
        }

        type Query {
            getProduct(id: ID): Product
        }
        
        input StoreInput {
            store: String
        }

        input ProductInput {
            id: ID
            name: String
            description: String
            price: Float
            #soldout: Boolean
            soldout: Soldout
            inventory: Int
            stores: [StoreInput]!
        }
        
        type Mutation {
            createProduct(input: ProductInput): Product #create product resolver
            updateProduct(input: ProductInput): Product #update product resolver
            deleteProduct(id: ID!): String #delete product resolver
        }
    `);

export default schema;
import { makeExecutableSchema } from 'graphql-tools';

import resolvers from "./resolvers";


const typeDefs = [`
type Book {
    id: Int
    title: String
    author: String
    description: String
}

type Subscription{
    newBookAdded: Book
    bookDeleted : Book
}

type Query {
    allBooks:[Book]
    book(id: Int!) : Book
}

input BookInput {
    id: Int!
    title: String
    author: String
    description: String
}

type Mutation {
    addBook(input : BookInput)  : [Book]
    updateBook(input : BookInput)  : Book
    deleteBook(id: Int!) : [Book]
}

schema {
    query:Query
    mutation:Mutation
    subscription:Subscription
}


`];

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});



export default schema;
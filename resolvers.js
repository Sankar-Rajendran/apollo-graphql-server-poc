var _ = require('lodash');
import { PubSub } from 'graphql-subscriptions';

export const pubsub = new PubSub();

var booksData = [];

const BOOK_ADDED = 'BOOK_ADDED';

const resolvers = {
    Subscription: {
        newBookAdded: {
            subscribe: () => pubsub.asyncIterator(BOOK_ADDED),
        }
    },
    Query: {
        allBooks: () => {
            return booksData;
        },
        book: (root, { id }) => {
            return booksData.filter(book => {
                return book.id === id;
            })[0];
        }
    },
    Mutation: {
        addBook: (root, { input }) => {
            booksData.push(input);
            pubsub.publish(BOOK_ADDED, { newBookAdded : input });
            return booksData;
        },
        updateBook: (root, { input }) => {
            var index = booksData.findIndex(x => x.id === input.id);
            var element = booksData[index];
            booksData[index] = _.assign(element, input);
            return booksData[index];
        },
        deleteBook: (root, { id }) => {
            booksData.splice(booksData.findIndex(x => x.id === id), 1);
            return booksData;
        }
    }
}


export default resolvers;
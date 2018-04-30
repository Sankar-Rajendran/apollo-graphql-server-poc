var _ = require('lodash');
import { PubSub } from 'graphql-subscriptions';

export const pubsub = new PubSub();

var booksData = [];

const BOOK_ADDED = 'BOOK_ADDED';
const BOOK_REMOVED = 'BOOK_REMOVED';
const BOOK_UPDATED = 'BOOK_UPDATED';

const resolvers = {
    Subscription: {
        notifyUsers: {
            subscribe: () => pubsub.asyncIterator([BOOK_ADDED, BOOK_REMOVED, BOOK_UPDATED]),
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
            let Message = { message: 'Added', book: input };
            pubsub.publish(BOOK_ADDED, { notifyUsers: Message });
            return input;
        },
        updateBook: (root, { input }) => {
            var index = booksData.findIndex(x => x.id === input.id);
            var element = booksData[index];
            booksData[index] = _.assign(element, input);
            let Message = { message: 'Updated', book: input };
            pubsub.publish(BOOK_UPDATED, { notifyUsers: Message });
            return booksData[index];
        },
        deleteBook: (root, { id }) => {
            let bookToDelete = booksData.find(x => x.id === id);
            booksData.splice(booksData.findIndex(x => x.id === id), 1);
            let Message = { message: 'Removed', book: bookToDelete };
            pubsub.publish(BOOK_REMOVED, { notifyUsers: Message });
            return bookToDelete;
        }
    }
}


export default resolvers;
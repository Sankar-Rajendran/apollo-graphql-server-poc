# apollo-graphql-server-poc
apollo-graphql-server-poc

This projects contains simple CRUD operations and basic subscriptions using Graphql.

For detailed note kindly visit :
URL for blog post


To start ,

npm install

npm run dev

http://localhost:4000/graphiql open it in your browser

Use below queries and mutation for testing either in Graphiql or Insomnia.

Get All books:

{
	allBooks{
	title,author,id,description
}}

Add a Book:

mutation{
	addBook(input:{id:1,author:"author 1",title:"title 1",description:"description 2"}){
		id,
		title,
		author,
		description
	}
}

Get a book by Id:

{
	book(id:1){
id,title
}
}

Update a book:

mutation{
	updateBook(input:{id:1,author:"author changed"}){
		id,title,author,description
	}
}

Delete a book:

mutation{
	deleteBook(id:1){
		id,title,author,description
	}
}

For Subscription:

subscription {
  notifyUsers {    
    message
    book{
      id
      description
      title
      author
    }
  }
}







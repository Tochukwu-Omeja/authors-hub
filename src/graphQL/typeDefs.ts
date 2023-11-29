const typeDefs = `#graphql

# type Hello{
#   message: String!
# }

type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
# type Query {
#   authors: [Author]
#  author(input: GetInput): Author
#   book: [Book]
# }

# type Author {
#   id: String!
#   Name: String!
#   email: String!
#   password: String!
#   Number: String!
#   # books: [Book]
# }

# type Book {
#   id: String!
#   title: String!
#   datePublished: String!
#   description: String!
#   pageCount: Int!
#   genre: String!
#   publisher: String!
# }

# type Mutation {
#   signup(input: SignupInput): Author
#   updateAuthor(input: UpdateAuthorInput): Author
#   createBook(input: CreateBookInput): Book
#   updateBook(input: UpdateBookInput): Book
#   deleteBook(input: DeleteBookInput): Book
# }
`
export default typeDefs;
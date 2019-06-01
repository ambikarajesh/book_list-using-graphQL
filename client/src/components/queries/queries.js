import {gql} from 'apollo-boost';

export const getBooks = gql`
{
    books{
        id 
        name
    }
}`

export const getAuthors = gql`
{
    authors{
        name
        id
    }
}`

export const storeBookMutation = gql`
    mutation($name:String!, $category:String!, $authorId:ID!){
        addBook(name:$name, category:$category, authorId:$authorId){
            id
            name
        }
    }
`

export const getBook = gql`
query($id:ID!){
    book(id:$id){
        id
        name
        category
        author{
            id
            name
            birth
            book{
                id
                name 
                category
            }
        }
    }
}`
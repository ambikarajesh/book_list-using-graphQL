const {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLID, GraphQLList, GraphQLNonNull} = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

const books = [
    {id:"1", name:'Where the Wild Things Are', category:'Non-Fiction', authorId:'1'},
    {id:"2", name:"The Very Hungry Caterpillar",  category:'Fiction', authorId:'2'},
    {id:"3", name:"The Giving Tree",  category:'Fiction', authorId:'3'},
    {id:"4", name:"Where the Sidewalk Ends",  category:'Non-Fiction', authorId:'3'},
    {id:"5", name:"A Light in the Attic",  category:'Fiction', authorId:'3'},
    {id:"6", name:"The Very Busy Spider",  category:'Fiction', authorId:'2'},
    {id:"7", name:"The Grouchy Ladybug ",  category:'Fiction', authorId:'2'},
    {id:"8", name:"From Head to Toe",  category:'Non-Fiction', authorId:'2'},
    {id:"9", name:"The Cat in the Hat",  category:'Fiction', authorId:'4'},
    {id:"10", name:"Green Eggs and Ham",  category:'Fiction', authorId:'4'}
]

const authors = [
    {id:'1', name:'Maurice Sendak', birth:'June 10, 1928'},
    {id:'2', name:'Eric Carle', birth:'June 25, 1929'},
    {id:'3', name:'Shel Silverstein', birth:'Septemper 25, 1930'},
    {id:'4', name:'Dr. Seuss', birth:'March 2, 1904'}
]
const BookType = new GraphQLObjectType({
    name:'Book',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        category:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve(parentValue, args){
                return Author.findById(parentValue.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        birth:{type:GraphQLString},
        book:{
            type:new GraphQLList(BookType),
            resolve(parentValue, args){
                console.log(parentValue, args)
                return Book.find({authorId:parentValue._id})
            }
        }
    })
});
const RootQueryType = new GraphQLObjectType({
    name:'RootQuery',
    fields:{
        book:{
            type:BookType,
            args:{
                id:{
                    type:GraphQLID
                }
            },
            resolve(parentValue, args){
                return Book.findById(args.id)
            }
        },
        author:{
            type:AuthorType,
            args:{
                id:{
                    type:GraphQLID
                }
            },
            resolve(parentValue, args){
                return Author.findOne({id:args.id})
            }
        },
        books:{
            type:new GraphQLList(BookType),
            resolve(parentValue, args){
                return Book.find();
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parentValue, args){
                return Author.find()
            }
        }
    }
})

const mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addBook:{
            type:BookType,
            args:{
                name:{type: new GraphQLNonNull(GraphQLString)},
                category:{type: new GraphQLNonNull(GraphQLString)},
                authorId:{type: new GraphQLNonNull(GraphQLID)}            
            }, 
            resolve(parentValue, args){
                const book = new Book(args);
                return book.save();
            }
        },
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type: new GraphQLNonNull(GraphQLString)},
                birth:{type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, args){
                const author = new Author(args);
                return author.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQueryType,
    mutation
})
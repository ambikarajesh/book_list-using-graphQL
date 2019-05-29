const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();


app.use('/graphql', graphqlHTTP({
    graphiql:true
}))
app.listen(4000, ()=> {
    console.log('server start at 4000');
})
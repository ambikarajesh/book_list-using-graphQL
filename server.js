const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const schema = require('./schema/schema');
const PORT = process.env.PORT || 4000;
const app = express();
dotenv.config();
const mongoDB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@cluster0-btzl5.mongodb.net/${process.env.MONGO_DATABASE}`;

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true    
}))
mongoose.connect(encodeURI(mongoDB_URI)).then(result=>{
    app.listen(PORT, ()=> {
        console.log(`server start at ${PORT}`);
    })
}).catch(err=>{
    console.log(err)
})


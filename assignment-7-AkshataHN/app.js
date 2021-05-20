const express=require('express')

const mongoose = require('mongoose');

const route=require('./router/router')

const bodyparser = require('body-parser')


const app = express();

const port = 1998;

app.use(bodyparser.json());

//cors very important to interact with FE
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/',route);


//connecting to the mongoDB

//mongodb+srv://<username>:<password>@cluster0.pwsps.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

mongoose.connect(
    'mongodb+srv://mohan:abcd@cluster0.pwsps.mongodb.net/zomatoo?retryWrites=true&w=majority',
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
).then(success =>
    {
        console.log("connected to MongoDB");
        
        app.listen(port,()=> {
            console.log(`server is running on ${port}`)
        })

    }).catch(error =>
        {
            console.log("can't connect to MongoDB")
        });



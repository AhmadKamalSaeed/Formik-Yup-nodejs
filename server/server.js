const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
require('dotenv').config();

const users = require('./routes/api/users');
const { checkToken } = require('./middleware/auth');


const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}retryWrites=true&w=majority`

mongoose.connect(mongoUri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});


//MIDDLEWARE

app.use(bodyParser.json());
app.use(checkToken);
app.use(cookieParser());
app.use("/api/users",users);

app.use(express.static('client/build'));

if(process.env.NODE_ENV === 'production'){
    const path = require('path');
    app.get('/*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'../client','build','index.html'))
    })
}


const port = process.env.PORT || 3001;
app.listen(port, ()=>{
    console.log(`Started on port ${port}`);
})
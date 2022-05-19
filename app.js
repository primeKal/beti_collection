require('dotenv').config();

const item = require('./routes/item');
// const order = require('./routes/order')


const express = require('express');
const mongoose = require('mongoose');


const jwt = require('jsonwebtoken');
const app = express();

mongoose.connect('mongodb://localhost/beticollection', (err) => {
    console.log(err);
    console.log('connected succesfully');
})
app.use(express.urlencoded({ extended : true }));
app.use(express.static('public'));


// app.use('/api/item',atheticate,item);
app.use('/api/item',item);
// app.use('api/order', order)
function atheticate(req, res, next) {
    const authHeader = req.headers['authorization']
    console.log(req.headers['authorization'])
    const token = authHeader && authHeader.split(' ')[1];
    console.log('token',token);
    if (token == null) {res.sendStatus(401); console.log('not working'); retrun ;}
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user)=>{
        if (err) {res.sendStatus(403); console.log('not'); console.log("err is",err) ;}
        req.user = user
        console.log("user is",user) 
    })
    next()
}



var port = process.env.PORT  ;
if (port == undefined) { port = 3000; }
console.log(port);
app.listen(port, ()=>{
    console.log('Listening on port ' + port);
});

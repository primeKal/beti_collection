require('dotenv').config();

const item = require('./routes/item');
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(express.static('public'));


// app.use('/api/item',atheticate,item);
app.post('/login',(req, res)=>{
//authenticate
var refreshTokens = [] ;
const name = req.body.username;
console.log("love",name);
const user = {
    userId : name
}
console.log(user);
const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn : '1hr'});
const refreshToken = jwt.sign(user, process.env.ACCESS_TOKEN_REFRESH)
console.log(accessToken,refreshToken,"lovee")
res.json({ accessToken : accessToken,
            refreshToken : refreshToken })
})
app.post('/token', (req, res)=>{
    const authHeader = req.headers['authorization']
    console.log(req.headers['authorization'])
    const refreshtoken = authHeader && authHeader.split(' ') [1];
    if (refreshtoken == null) res.sendStatus(401);
    jwt.verify(refreshtoken, process.env.ACCESS_TOKEN_REFRESH,
        (err, user) => {
            if (err) res.sendStatus(401);
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn : '1hr'});
            res.json({
                accessToken : accessToken
            });
        });
})

var port = process.env.PORT  ;
if (port == undefined) { port = 4000; }
console.log(port);
app.listen(port, ()=>{
    console.log('Listening on port ' + port);
});

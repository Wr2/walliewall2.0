require('dotenv').config();
const path = require('path');
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const mainCtrl = require('./Controllers/mainCtrl');
const mailCtrl = require('./Controllers/mailCtrl');
const authCtrl = require('./Controllers/authCtrl');



const {SERVER_PORT,
    CONNECTION_STRING,
    SESSION_SECRET,
    NODE_ENV,
} = process.env

console.log(process.env.NODE_ENV);


const app =express();

app.use(express.json());

if(NODE_ENV === 'production') {
    app.use(express.static( `${__dirname}/../build`))
  
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../build/index.html'))
    })
  
  }




app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 21}
}));

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db);
    console.log('db ALL GOOD')
})



//Authorization 
app.post('/auth/register',  authCtrl.register);
app.post('/auth/Login', authCtrl.login);
app.get('/auth/logout', authCtrl.logout);
app.get('/auth/me', authCtrl.logMeIn);

//User endpoints
app.put('/api/profile/:id', mainCtrl.editProfile);
app.get('/api/users', mainCtrl.getUsers);

//Wallpaper endpoints
app.put('/api/wallpaper/:id', mainCtrl.updateWallpaper);



//Post endpoints
app.post('/api/post/:author_id', mainCtrl.createPost);
app.get('/api/post/:id', mainCtrl.getUserPosts);
app.get('/api/post', mainCtrl.getPosts)
app.delete('/api/post/:id',mainCtrl.deletePost);

//Nodemailer
app.post('/api/email', mailCtrl.email);

app.listen(SERVER_PORT, () => console.log('Good Vibes on 5050'))
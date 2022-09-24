const path = require('path');


const express = require('express');
const csrf = require('csurf');
const expressSession = require('express-session');


const createSessionConfig = require('./config/session');
//importing database
const db = require('./data/database');
const addCsrfTokenMiddleware = require('./miidlewares/csrf-token');
const addErrorHandlerMiddleware = require('./miidlewares/error-handler');
const authRoutes = require('./routes/auth-routes');

const app = express();

//set the view engine as EJS
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//Define the static file folder (static middleware)
app.use(express.static('public'));

app.use(express.urlencoded({extended: false}));

const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));
app.use(csrf());
app.use(addCsrfTokenMiddleware);

app.use(authRoutes);

app.use(addErrorHandlerMiddleware);

db.connectToDatabase()
    .then(function(){
        app.listen(3000);
    })
    .catch(function (error) {
        console.log('Failed to login to database');
        console.log(error);     
    });


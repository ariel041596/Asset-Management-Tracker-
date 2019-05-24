const express = require('express')
const moongose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const passport = require('passport');

//Initialize the app
const app = express();

//Middlewares
//Form data Middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
//Json body Middleware
app.use(bodyParser.json());
//Cors Middleware
app.use(cors());

//setting the static directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the passport middleware
app.use(passport.initialize());

// Bring in the Passport Strategy
require('./config/passport')(passport);

//Bring in the database configuration and connect with the databse
const db = require('./config/keys').mongoURI;
moongose.connect(db, { useNewUrlParser: true }).then(() => {
    console.log(`Connected to ${db}`)
}).catch(err => {
    console.log(`Unable to connect to databse ${err}`)
});

// app.get('/', (req, res) => {
//     return res.send("Hello World");
// });

// Bring in the Users route
const users = require('./routes/api/users');
app.use('/api/users', users);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})

// const http = require('http')

// const server = http.createServer((req, res) => {
//     if (req.url === '/') {
//         res.write("<h1>ibrahim salem</h1>")
//         res.end()
//     }
// });

// route.get('/', (req, res) => {
//     res.send("hello in book route")
// })

//npm 
const express = require('express')
const app = express()
const { notFuond, errorHanlder } = require('./middlewares/errors')
const logger = require("./middlewares/logger");
const dotenv = require('dotenv').config()
const connectToDB = require('./config/db')
const path = require("path");
const helmet = require('helmet')
const cors = require("cors");

// Static Folder
app.use(express.static(path.join(__dirname, "images")));


//Connection To Database
connectToDB()

//Applay Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logger);


// Helmet
app.use(helmet());

// Cors Policy
app.use(cors())

// Set View Engine
app.set('view engine', 'ejs');


//Route
app.use('/api/books', require('./route/books'))
app.use('/api/authors', require('./route/authors'))
app.use('/api/auth', require('./route/auth'))
app.use('/api/users', require('./route/users'))
app.use('/api/upload', require('./route/upload'))
app.use('/password', require('./route/password'))



//Error handler 
app.use(notFuond)
app.use(errorHanlder)



//Routing Servers
app.listen(process.env.PORT, console.log('start project port 5000'))
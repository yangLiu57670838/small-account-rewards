'use strict';
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()


const pkg = require('./package.json')
const helpers = require('./server/helpers')
const log = require('./logs/Log').create()
require('dotenv').config()

log.info('Welcome to small-account-rewards API %s, process.env.NODE_ENV: %s, POSTGRES_HOST: %s, POSTGRES_PORT: %s, POSTGRES_DATABASE: %s, POSTGRES_USER: %s,' +
    'POSTGRES_PASSWORD: %s',
    pkg.version, process.env.NODE_ENV, process.env.POSTGRES_HOST, process.env.POSTGRES_PORT, process.env.POSTGRES_DATABASE, process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD
);


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))


app.get('/', (req, res) => {
    res.redirect('/greeting');
})

app.get('/greeting', (req, res) => {
    res.json('Welcome to account rewards system version ' + pkg.version)
})



//test
app.use('/foo', require('./server/api/router/foo.js'));


app.post('/login', helpers.verifyUser, (req, res) => {
    console.log('redirecting to CMS pages')

})



// app.use('/register/', require('./api/users/router')())



var server = app.listen(3000, function() {
    console.log('Server running at:' + server.address().port)
})
'use strict';
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const expressValidator = require('express-validator')

const pkg = require('./package.json')
const helpers = require('./server/helpers')
const log = require('./logs/Log').create()
require('dotenv').config()

log.info('Welcome to small-account-rewards API %s, process.env.NODE_ENV: %s, POSTGRES_HOST: %s, POSTGRES_PORT: %s, POSTGRES_DATABASE: %s, POSTGRES_USER: %s,' +
    'POSTGRES_PASSWORD: %s',
    pkg.version, process.env.NODE_ENV, process.env.POSTGRES_HOST, process.env.POSTGRES_PORT, process.env.POSTGRES_DATABASE, process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD
);


app.use(cors());//enable cross origin resource sharing for this system
app.use(bodyParser.json());
app.use(expressValidator({
    customValidators: {
    }
}))
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.redirect('/greeting');
})
app.get('/greeting', (req, res) => {
    res.json('Welcome to account rewards system version ' + pkg.version)
})
app.use('/users/', require('./server/api/users/router')())

app.use(function (err, req, res, next) {
    log.error('app.use error handler %s: %s', new Date(), err.stack)
    res.status(500).send({error: err})
})

if (process.env.RUN_LOCAL_PORT) {
    const port = Number(process.env.RUN_LOCAL_PORT);
    var server = app.listen(port, function() {
        console.log('Server running at:' + server.address().port)
    })
}

module.exports = app
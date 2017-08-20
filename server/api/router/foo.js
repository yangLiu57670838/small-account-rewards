var express = require('express')
var bar = require('./bar')
var baz = require('./baz')
var router = express.Router()

router.get('/', function (req, res, next) {
    res.send('this is the index for foo')
})

router.get('/:number', function (req, res, next) {
    res.send('this is foo #' + req.params.number)
})

router.use('/bar', bar)

// GET /foo/42/baz
router.use('/:number/baz', baz)

module.exports = router
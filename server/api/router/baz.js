var express = require('express')
var router = express.Router({mergeParams: true})

// GET /foo/:42/baz
router.get('/', function (req, res, next) {
    // the param name is from the parent as well
    res.send('this is the baz from foo#' + req.params.number);
})

// GET /foo/:42/baz/123
router.get('/:id', function (req, res, next) {
    res.send('baz #' + req.params.id + ' from foo #' + req.params.number)
})

module.exports = router
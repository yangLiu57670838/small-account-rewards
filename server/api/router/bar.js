var express = require('express')
var router = express.Router()

// GET /foo/bar
router.get('/', function (req, res, next) {
    res.send('this is the index for bar')
});

module.exports = router

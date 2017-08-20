
//create multiple helper functions & middlewares here

//temporary verify users middleware, token, session whatever
function verifyUser (req, res, next) {
    //do the auth here
    console.log('verifying user', req.body.lUname)
    //if success
    next()

    //if fail
    // res.redirect('/')
}


//...
exports.verifyUser = verifyUser
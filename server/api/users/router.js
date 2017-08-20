"use strict";
const express = require('express')
const log = require('../../../logs/Log').create()
const createUser = require('./CreateUser')
// const findUserDetails = require('./FindUserDetails')
// const updateUserDetails = require('./UpdateUserDetails')
module.exports = (() => {
    log.info('users router start...')

    const router = express.Router()

    //Creating a member and reward
    router.route('/create')
        .post((req, res) => {
            const userDetails = req.body
            log.info('/create user details: %s', userDetails)

            return createUserDetails.create(userDetails)
                .then((created) => {
                    log.info('/create created: %j', created)
                    res.json(created)
                })
                .catch((err) => {
                    log.error('/create err: %j', err)
                    res.status(err.statusCode).send({text: err.text})
                })

        })



    return router;

})
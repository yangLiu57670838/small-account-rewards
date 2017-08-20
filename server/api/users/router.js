"use strict";
const express = require('express')
const log = require('../../../logs/Log').create()
const createUser = require('./CreateUser')
const findUser = require('./FindUser')
const updateUserRewards = require('./UpdateUserRewards')
const deleter = require('./DeleteUser')

module.exports = (() => {
    log.info('users router start...')

    const router = express.Router()

    //Creating a member and reward
    router.route('/create')
        .post((req, res) => {
            const userDetails = req.body
            log.info('/create user details: %s', userDetails)

            return createUser.create(userDetails)
                .then((created) => {
                    log.info('/create created: %j', created)
                    res.json(created)
                })
                .catch((err) => {
                    log.error('/create err: %j', err)
                    res.status(err.statusCode).send({text: err.text})
                })

        })

    //Retrieve a member and their rewards
    router.route('/find/:id')
        .get((req, res) => {
            const id = req.params.id
            return findUser.findById(id)
                .then((foundDetails) => {
                    log.info('/find found details: %s', id)
                    res.json(foundDetails)
                })
                .catch((err) => {
                    log.error('/find err: %j', err)
                    res.status(err.statusCode).send({text: err.text})

                })
        })

    //Associate a reward to a member
    router.route('/update')
        .put((req, res) => {
            const userDetails = req.body;
            log.info('/update user rewards: %s', userDetails)
            return updateUserRewards.update(userDetails)
                .then(() => {
                    log.info('/update reward points successfull: %s', userDetails.user_name)
                    res.json();
                })
                .catch((err) => {
                    log.error('/update err: %j', err)
                    res.status(err.statusCode).send({text: err.text})
                })

        })

    //Delete a member and reward
    router.route('/:id')
        .delete((req, res) => {
            const id = req.params.id
            log.info('/:id: %s', id)
            deleter.delete(id).then((data) => {
                log.info('/ user account deleted')
                res.json(data);
            })
                .catch((err) => {
                    log.error('/ err: %j', err)
                    res.status(err.statusCode).send({text: err.text})
                })
        })

    return router;

})
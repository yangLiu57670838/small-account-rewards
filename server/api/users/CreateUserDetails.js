// "use strict";
// const Q = require('q')
// const log = require('../logs/Log').create()
// const connection = require('../database/CreateConnection')
// const userCounter = require('./CountUserDetails')
// const profileFinder = require('../user-profiles/FindUserProfile')
//
// exports.CreateUserDetails = (() => {
//   const create = this
//   const db = connection.db()
//   const pgHelper = connection.pgpHelper()
//
//   create.create = (userDetails) => {
//     log.info('CreateUserDetail.create userDetails: %s', userDetails)
//     const params = transform(userDetails)
//
//     let query = pgHelper.insert(params, null, 'userdetails') + ' returning email';
//
//     return db.one(query)
//       .then((data) => {
//         log.info('CreateUserDetails.create created new user: %j ', data.email);
//         return profileFinder.findByEmail(data.email)
//       })
//       .then((found) => {
//         log.info('CreateUserDetails.create loaded userProfile: %j ', found);
//         return found
//       })
//       .catch((error) => {
//         log.error('CreateUserDetails.create error: %j, params: %j, userDetails: %j', error, params, userDetails);
//         return Q.reject({statusCode: 500, text: 'There is a database error'});
//       })
//       .finally(function () {
//         log.info('CreateUserDetails.create finally...')
//         connection.end()
//       });
//   }
//
//   const transform = (userDetails) => {
//     log.info('CreateUserDetails.transform userDetails: %j', userDetails)
//
//     return {
//       "email": userDetails.email,
//       "givenname": userDetails.givenName,
//       "surname": userDetails.surname,
//       "birthdate": userDetails.birthDate,
//       "licence": userDetails.licence ? userDetails.licence : null,
//       "datecreated": new Date().toISOString(),
//       "phonenumber": userDetails.phoneNumber,
//       "homestreet": userDetails.address.street,
//       "hometownsuburb": userDetails.address.townSuburb,
//       "homestate": userDetails.address.state,
//       "homepostcode": userDetails.address.postcode,
//       "deliverystreet": userDetails.deliveryAddress.street,
//       "deliverytownsuburb": userDetails.deliveryAddress.townSuburb,
//       "deliverystate": userDetails.deliveryAddress.state,
//       "deliverypostcode": userDetails.deliveryAddress.postcode
//     }
//
//   }
//
// })();
//

require('dotenv').config()

module.exports = (() => {
    const token = process.env.TEST_TOKEN
    return token;
})()
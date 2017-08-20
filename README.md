# Software requirements
* postgresql
* Node.js 8
* npm 5

# Installation instructions
* brew install postgresql
* npm install nodemon mocha -g

* Please run the sql commands in ./database/init.sql before you run this program or tests

# Run
npm start

# Run test files
npm test

# Scopes

## Creating a member and reward
Create a user account and initialize its reward points to 100
Path: /users/create
Parameters: user_name
Test: npm run test-create-user

## Associate a reward to a member

## Retrieve a member and their rewards

## Delete a member and reward

#Assumptions
*

# Further plans
* enable password during user creating and JSON Web Token
* reward points should be associated with different reward levels (beginner, short-term customer, long-term customer)
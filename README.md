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

# Scopes

## Creating a member and reward
* Create a user account and initialize its reward points to 100
* Path: /users/create
* Post
* Parameters: {user_name: $user_name}
* Test: npm run test-create-user

## Associate a reward to a member
* Update a user reward points
* Path: /users/update
* Put
* Parameters: {user_name: $user_name, rewards: $rewards}
* Test: npm run test-update-rewards

## Retrieve a member and their rewards
* Find a user account with its reward points depending on its id
* Path: /users/find/:id
* Get
* Test: npm run test-find-user

## Delete a member and reward
* Delete an user account depending on its id
* Path: /users/:id
* Delete
* Test: npm run test-del-account
(Warning: need to create a second account with id 2 before test this.)

# Assumptions
* create a new account with a username, and it will assign some initialized reward points to this account
* associate a reward to a member will add more reward points to its account
* retrieve a member will get all data of this account including its reward points
* delete a member will remove all data of this account including its reward points

# Further plans
* Associate a reward should add more reward points to its account instead of replacing the existing reword points
* enable password during user creating and JSON Web Token
* reward points should be associated with different reward levels (beginner, short-term customer, long-term customer)
* workflow of tests can be improved
* missing the express-validator part
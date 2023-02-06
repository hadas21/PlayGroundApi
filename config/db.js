"use strict";

// creating a base name for the mongodb
const mongooseBaseName = "PlayGroundApi";

// create the mongodb uri for development and test
const database = {
  development:
    "mongodb+srv://hadas:hadaspassword@cluster0.lbx8y.mongodb.net/?retryWrites=true&w=majority",
  // development: `mongodb://localhost/${mongooseBaseName}-development`,
  test: `mongodb://localhost/${mongooseBaseName}-test`,
};

// Identify if development environment is test or development
// select DB based on whether a test file was executed before `server.js`
const localDb = process.env.TESTENV ? database.test : database.development;

// Environment variable DB_URI will be available in
// heroku production evironment otherwise use test or development db
const currentDb = process.env.DB_URI || localDb;

module.exports = currentDb;

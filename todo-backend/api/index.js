// api/index.js
const serverless = require("serverless-http");
const app = require("../todo-backend/index");

module.exports.handler = serverless(app);

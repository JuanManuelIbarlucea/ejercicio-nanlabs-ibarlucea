var PrettyError = require('pretty-error');
new PrettyError().start();

const dotenv = require('dotenv').config();
const express = require('express');


const app = express();
const port = process.env.port || 9000;

require("./config/express")(app);
require('./routes')(app)


app.listen(port, () =>
  console.log(`Express server listening on ${port} port`)
);
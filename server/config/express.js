/**
Express configuration
 */

const express = require("express");
var cors = require("cors");
var compression = require("compression");

module.exports = (app) => {
  app.use(compression());
  app.use(
    express.json({
      extended: false,
      limit: '25mb'
    })
  );
  //Enable CORS Pre-flight
  app.use(cors());
};

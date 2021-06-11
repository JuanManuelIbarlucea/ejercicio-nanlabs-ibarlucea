/**
    Main application routes
*/

module.exports = (app) => {
  app.use("/tasks", require("./api/tasks"));
};

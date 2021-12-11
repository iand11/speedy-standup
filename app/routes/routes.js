module.exports = (app) => {
  const App = require("../controllers/controllers.js");

  app.post("/create", App.create);

  app.get("/get-all", App.findAll);

  app.get("/blocker/:blockerId", App.findOne);

  app.put("/blocker/:blockerId", App.update);

  app.delete("/blocker/:blockerId", App.delete);
};
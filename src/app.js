function makeApp(database) {
  const bodyParser = require("body-parser");
  const app = require("express")();

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
  });

  app.use(bodyParser.json());

  app.post("/api", async (req, res) => {
    try {
      const { name } = req.body;
      if (!name) {
        res.status(400).send({ data: { message: "No name passed" } });
      }

      const user = await database.setUser(name);
      res.status(201).send({ data: user });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.get("/api/:user_id", async (req, res) => {
    try {
      const { user_id } = req.params;
      if (!Number(user_id)) {
        res
          .status(400)
          .send({ data: { message: "user_id must be of type int" } });
      }

      const user = await database.getUser(user_id);
      if (!user) {
        res.status(404).send({
          data: { message: "user with id " + user_id + " not found" },
        });
      }

      res.status(200).send({ data: user });
    } catch (error) {
      console.log(error.message);
      res.sendStatus(500);
    }
  });

  app.put("/api/:user_id", async (req, res) => {
    try {
      const { user_id } = req.params;
      if (!Number(user_id)) {
        res
          .status(400)
          .send({ data: { message: "user_id must be of type int" } });
      }

      const { name } = req.body;
      if (!name) {
        res.status(400).send({ data: { message: "No name passed" } });
      }

      const user = await database.updateUser(user_id, name);
      if (!user) {
        res.status(404).send({
          data: { message: "user with id " + user_id + " not found" },
        });
      }

      res.status(200).send({
        data: user,
      });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.delete("/api/:user_id", async (req, res) => {
    try {
      const { user_id } = req.params;
      if (!Number(user_id)) {
        res
          .status(400)
          .send({ data: { message: "user_id must be of type int" } });
      }

      await database.deleteUser(user_id);
      res.sendStatus(204);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.all("*", (req, res) => {
    res.sendStatus(404);
  });

  return app;
}

module.exports = makeApp;

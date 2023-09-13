const makeApp = require("./src/app");
const database = require("./src/database");

const port = process.env.PORT || 3000;
const app = makeApp(database);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

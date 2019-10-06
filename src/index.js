require("dotenv").config();

const app = require("./app");

const main = () => {
  // Starting the server
  app.listen(app.get("port"), () => {
    console.log("Servidor en puerto: ", app.get("port"));
  });
};

main();

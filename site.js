module.exports = () => {
  const express = require("express");
  const app = express();
  const path = require("path");
  const hbs = require("hbs");
  const { readdirSync } = require("fs");

  app.use(express.static(path.join(__dirname, "views")));
  app.set("view engine", "hbs");
  app.get("/", (req, res) => {
    let command = {};
    readdirSync("./commands")
      .filter(folders => folders !== "Owner")
      .map(folders => {
        command[folders] = {};
        readdirSync(`./commands/${folders}`).map(files => {
          command[folders][
            files.replace(".js", "")
          ] = require(`./commands/${folders}/${files}`);
        });
      });
    res.render("index", { data: { command } });
  });

  app.listen(3000, console.log("site is ready"));
};

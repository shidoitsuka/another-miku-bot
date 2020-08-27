module.exports = () => {
  const http = require("http");
  const express = require("express");
  const app = express();
  const path = require("path");
  const hbs = require("hbs");
  const { readdirSync } = require("fs");

  app.use(express.static(path.join(__dirname, "views")));
  app.set("view engine", "hbs");
  app.get("/", (request, response) => {
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
    response.render("index", {
      data: { command }
    });
    console.log(Date.now() + " Ping Received");
  });

  app.listen(process.env.PORT, console.log("site is up"));

/*  setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
  }, 180000);*/
};

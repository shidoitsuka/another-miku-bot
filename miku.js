module.exports = () => {
  const Discord = require("discord.js");
  const bot = new Discord.Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION"]
  });
  const fs = require("fs");
  const Enmap = require("enmap");
  const chalk = require("chalk");
  const walker = require("walker");
  require("./util/eventLoader.js")(bot);
  require("./modules/function.js")(bot);
  bot.config = require("./config.js").config;
  bot.db = new Enmap({ name: "db" });
  bot.commands = new Enmap();
  bot.aliases = new Enmap();
  bot.cdTime = new Enmap();
  bot.commandsConf = new Enmap();

  // Initialization
  const init = async () => {
    const folder = walker(`./commands/`).on("file", file => {
      if (!file.endsWith(".js")) return;
      let response = bot.loadCommand(file);
      if (response) console.log(response);
    });
  };

  // Clean all cooldowns to avoid errors
  bot.db.set("cooldowns", {});

  // Initialization
  init();
  bot.login(bot.config.token);
};

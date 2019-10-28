const chalk = require("chalk");
const walker = require("walker");
const fs = require("fs");

module.exports = (bot, message) => {
  // NUMBER FORMATTER
  String.prototype.toMoney = function() {
    return Number(this)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };

  // RANDOM
  Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)];
  };

  // REMOVE BLANK VALUES IN ARRAY
  Array.prototype.blank = function() {
    return this.filter(entry => entry.trim() != "");
  };

  // LOAD COMMAND
  bot.loadCommand = commandName => {
    try {
      // walk through the sub folders using walker
      const folder = walker(`./commands/`).on("file", file => {
        if (!file.endsWith(".js")) return;
        const props = require(`../${file}`);
        if (props.init) {
          props.init(bot);
        }
        // set command's config
        bot.commandsConf.set(props.help.name, props.conf.guildOnly);
        // set the command's name
        bot.commands.set(props.help.name, props);
        // set the command's cooldown
        bot.cdTime.set(props.help.name, props.conf.cooldown * 1000);
        // then the aliases
        props.conf.aliases.forEach(alias => {
          bot.aliases.set(alias, props.help.name);
        });
      });
      console.log(chalk.bgWhite.black(`Loaded ${commandName}`));
      return false;
    } catch (e) {
      console.log(chalk.bgRed(`Unable to load command ${commandName}: ${e}`));
    }
  };

  // SLEEP FUNCTION
  sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  // CHECK ARRAY VALUES ARE **ALL** THE SAME
  same = arr => arr.every(x => x.toLowerCase() === arr[0].toLowerCase());

  // WRITE JSON FILES
  writeFile = (directory, varName) => {
    fs.writeFile(`${directory}.json`, JSON.stringify(varName), err => {
      if (err) console.log(err.stack);
    });
  };
};

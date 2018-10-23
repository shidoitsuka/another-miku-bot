const chalk = require('chalk');
const fs = require('fs');

module.exports = (bot, message) => {

  // RANDOM
  Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)]
  };

  // CHECK ARRAY VALUES ARE **ALL** THE SAME
  same = arr => arr.every(x => x.toLowerCase() === arr[0].toLowerCase());

  // REMOVE BLANK VALUES IN ARRAY
  Array.prototype.blank = function() {
    return this.filter(entry => entry.trim() != '');
  };

  // LOAD COMMAND
  bot.loadCommand = (commandName) => {
    try {
      const props = require(`../commands/${commandName}`);
      if (props.init) {
        props.init(bot);
      }
      bot.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        bot.aliases.set(alias, props.help.name);
      });
      console.log(chalk.bgWhite.black(`Loaded ${commandName}`));
      return false;
    } catch (e) {
      console.log(e.stack);
      console.log(chalk.bgRed(`Unable to load command ${commandName}: ${e}`));
    }
  };
  bot.loadCooldown = (commandName) => {
    try {
      const theCmd = require(`../commands/${commandName}`);
      bot.cdTime.set(theCmd, theCmd.conf.cooldown * 1000);
      return false;
    } catch (e) {
      console.log(chalk.bgRed(`Unable to load command ${commandName}\'s cooldown: ${e}`));
    }
  };

  // SLEEP FUNCTION
  sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
};
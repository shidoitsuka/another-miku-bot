const Discord = require('discord.js');
const chalk = require('chalk');
const walker = require('walker');

module.exports = (bot) => {

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
      // walk through the sub folders using walker module
      const folder = walker(`./commands/`)
        .on('file', (file) => {
          if (!file.endsWith(".js")) return;
          const props = require(`../${file}`);
          if (props.init) {
            props.init(bot);
          }
          // set the command's name
          bot.commands.set(props.help.name, props);
          // set the command's cooldown
          bot.cdTime.set(props, props.conf.cooldown * 1000);
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
  sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
};
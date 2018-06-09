module.exports = (bot, message) => {

  // RANDOM
  Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)]
  };

  // CHECK ARRAY VALUES ARE **ALL** THE SAME
  same = arr => arr.every(v => v === arr[0]);

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
      return false;
    } catch (e) {
      return `Unable to load command ${commandName}: ${e.stack}`;
    }
  };
  bot.loadCooldown = (commandName) => {
    try {
      const theCmd = require(`../commands/${commandName}`);
      bot.cdTime.set(theCmd, theCmd.conf.cooldown * 1000);
      return false;
    } catch (e) {
      return `Unable to load ${commandName}\'s cooldown: ${e.stack}`
    }
  };

  // SLEEP FUNCTION
  sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
};
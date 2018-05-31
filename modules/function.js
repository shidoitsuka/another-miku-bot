module.exports = (bot, message) => {

  // RANDOM
  Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)]
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

  // SLEEP FUNCTION
  sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
};
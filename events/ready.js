const chalk = require('chalk');
module.exports = bot => {
  console.log(chalk.bgGreen.white(`Logged in as ${bot.user.tag}!`));
  bot.user.setStatus("idle");
  bot.user.setActivity('in your room!');
};
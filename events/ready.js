const chalk = require('chalk');
module.exports = bot => {
  console.log(chalk.bgGreen.white("Hello There!"));
  bot.user.setStatus("idle");
  bot.user.setActivity('in your room!');
};
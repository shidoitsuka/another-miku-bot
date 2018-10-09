const chalk = require('chalk');
const plays = require('../assets/plays.json');
module.exports = bot => {
  console.log(chalk.bgGreen.white(`Logged in as ${bot.user.tag}!`));
  setInterval(() => {
    let currStat = plays.random();
    bot.user.setActivity(currStat.activity, {
      type: plays.type
    });
    bot.user.setStatus(currStat.status);
  }, 90 * 1000);
  console.log(chalk.bgGreen.white("Booted up!"));
};
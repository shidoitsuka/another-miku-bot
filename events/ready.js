const chalk = require("chalk");
const plays = require("../assets/plays.json");

module.exports = bot => {
  console.log(chalk.bgGreen.white(`Logged in as ${bot.user.tag}!`));
  setInterval(() => {
    let currStat = plays.random();
    // prettier-ignore
    bot.user.setPresence({ activity: { name: currStat.activity }, status: plays.status  })
  }, 90 * 1000);

  console.log(chalk.bgGreen.white("Booted up!"));
};

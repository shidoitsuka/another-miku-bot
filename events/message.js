const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('../config.json');
const chalk = require('chalk');
let answers = [
  "(#^.^#)",
  "(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄",
  "(✿ꈍ。 ꈍ✿)",
  "(ؑ‷ᵕؑ̇‷)◞✧",
  "(灬ºωº灬)♡"
];
let theAnswer = answers[Math.floor(Math.random() * answers.length)];
let hello = [
  "H-hello",
  "H-hi",
  "M-my prefix is \`m\`",
  "Miku desu!",
  "I'm Here!",
  "Hi!"
];
const badWords = [
  "fuck",
  "shit",
  "bitch"
];
let theHi = hello[Math.floor(Math.random() * hello.length)];

// SLEEP FUNCTION
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
module.exports = async function(message) {
  const msg = message.content;
  if (msg == "ur mom" || msg == "urmom" || msg == "your mom") {
    message.react("🇬");
    await sleep(500);
    message.react("🇦");
    await sleep(1000);
    message.react("🇾");
  }
  // if (message.content.includes(config.ownerID)) {
  //   message.channel.send(`\`${message.author.username}\`, Brian is sleeping right now. Try again later.`);
  // }
  // BAD WORDS DETECTOR
  if (badWords.some(word =>
      msg.toLowerCase().includes(word))) {
    message.channel.send(`**${message.author.username}**, Watch your language.`).then(response => response.delete(1000));
  }
  // if miku mentioned
  if (msg == `<@${config.botID}>`) {
    message.channel.send(`${theHi} ${theAnswer}`).then(
      delete require.cache[require.resolve('./message.js')]
    );
  }

  // if message without prefix
  if (!msg.startsWith(config.prefix)) return;

  // if message is bot
  if (message.author.bot) return;

  /**
   * To separate command and arguments
   * <config>example help
   * output=
   * command : example
   * argument : help
   **/
  const args = msg.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  try {
    // const cmd = bot.commands.get(command) || bot.commands.get(bot.aliases.get(command));
    // if (!cmd) return;
    // if (cmd) {
    //   cmd.run(bot, message, args)  bot.commands.get(command) || bot.commands.get(bot.aliases.get(command));
    // }
    var cmd = require(`../commands/${command}`);
    // if not command return
    if (!cmd) return;
    else {
      // else run the command
      cmd.run(bot, message, args);
    }
  } catch (err) {
    console.log(chalk.red(`Error: ${err.stack}`));
    const embed = new Discord.RichEmbed()
      .setAuthor("Miku -- Error")
      .setThumbnail("https://cdnjs.loli.net/ajax/libs/material-design-icons/1.0.0/alert/drawable-xxxhdpi/ic_error_red_48dp.png")
      .setColor(0xf44336)
      .setDescription(`Something went wrong!\n**Error**  : ${err.name} ${err.message}`)
      .setFooter("© 12042#5754");
    message.channel.send({
      embed
    });
  }
};
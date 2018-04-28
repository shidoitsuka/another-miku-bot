const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('../config.json');
module.exports = message => {
  if (message.content == `<@${config.botID}>`) {
    message.channel.send("x");
  }
  if (!message.content.startsWith(config.prefix)) return;
  if (message.author.bot) return;
  const args = message.content.split(' ');
  const cmd = args.shift().slice(config.prefix.length).toLowerCase();

  try {
    var commands = require(`../commands/${cmd}`);
    commands.run(bot, message, args);
  } catch (e) {
    console.log(`Error: ${e.stack}`);
  }
};

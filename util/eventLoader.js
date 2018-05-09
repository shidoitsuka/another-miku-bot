const Discord = require('discord.js');
const bot = new Discord.Client();
const eventReq = (event) => require(`../events/${event}`);
module.exports = bot => {
  bot.on('ready', () => eventReq('ready')(bot));
  bot.on('message', eventReq('message'));
};
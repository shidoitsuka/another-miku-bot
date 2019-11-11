const Discord = require('discord.js');
const bot = new Discord.Client();
const eventReq = (event) => require(`../events/${event}`);
module.exports = bot => {
  bot.on('ready', () => eventReq('ready')(bot));
  bot.on('guildMemberAdd', eventReq('guildMemberAdd'));
  bot.on('guildCreate', eventReq('guildCreate'));
  bot.on('guildDelete', eventReq('guildDelete'));
  bot.on('messageReactionAdd', eventReq('messageReactionAdd'));
  bot.on('message', eventReq('message'));
};

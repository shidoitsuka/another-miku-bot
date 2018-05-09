// TODO: Error: TypeError: Cannot read property 'setPresence' of null
const config = require('../config.json');
const Discord = require('discord.js');
const bot = new Discord.Client();
exports.run = function(bot, message, args) {
    const argrs = message.content.split(' ');
    const cmd = argrs.shift().slice(config.prefix.length).toLowerCase();
    const txt = message.content.slice(8);
    if (message.author.id != config.ownerID) {
        message.channel.send("You don\'t have permission to run this command.");
    } else {
        // TODO: SET GAME
        bot.user.setPresence({
          game: {
            name: `${txt}`
          },
          status: 'dnd'
        });
    }
};

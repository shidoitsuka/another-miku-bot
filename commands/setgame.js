// TODO: Error: TypeError: Cannot read property 'setPresence' of null
const config = require('../config.json');
const Discord = require('discord.js');
const bot = new Discord.Client();
exports.run = function(bot, message, args) {
    const argrs = message.content.split(' ');
    const cmd = argrs.shift().slice(config.prefix.length).toLowerCase();
    if (message.author.id != config.ownerID) {
        message.channel.send("You are not my owner!");
    } else {
        // TODO: SET GAME
    }
};

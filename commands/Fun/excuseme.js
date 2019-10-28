const Discord = require("discord.js");
const embed = new Discord.RichEmbed();

exports.run = (bot, message) => {
  embed.setImage("http://tinyurl.com/y9fl7nck");
  embed.setFooter("© Google Images");
  message.channel.send({ embed });
};

exports.conf = {
  aliases: [],
  cooldown: 1,
  guildOnly: false
};

exports.help = {
  name: "excuseme",
  category: "Fun",
  description: "Excuse me?",
  usage: "excuseme",
  param: "",
  aliases: ""
};

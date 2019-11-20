const Discord = require("discord.js");

exports.run = (bot, message) => {
  const embed = new Discord.MessageEmbed();
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
  description: "Excuse me WTF?",
  usage: "excuseme",
  param: "",
  aliases: ""
};

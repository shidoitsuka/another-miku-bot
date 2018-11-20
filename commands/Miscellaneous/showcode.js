const Discord = require('discord.js');
exports.run = (bot, message, args) => {
  const embed = new Discord.RichEmbed()
    .setColor(0xf5ab35)
    .setImage("https://behapy.s3.amazonaws.com/40/32/504032/default.jpg");
  message.channel.send({
    embed
  });
};
exports.conf = {
  aliases: ["code"],
  cooldown: 1,
  guildOnly: false
};

exports.help = {
  name: "showcode",
  category: "Miscellaneous",
  description: "",
  usage: "showcode",
  param: "",
  aliases: "code"
};
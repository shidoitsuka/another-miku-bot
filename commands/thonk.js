const Discord = require('discord.js');

exports.run = (bot, message, args) => {
  const embed = new Discord.RichEmbed()
    .setAuthor("Miku")
    .setColor(0x1a9ca8)
    .setImage("https://preview.ibb.co/ha8SzS/ohfuck.jpg")
    .setDescription(`Seems like ${message.author.username} is thinking too much.`);
  message.channel.send({
    embed
  });
};

exports.conf = {
  aliases: ["think", "thnk"],
  cooldown: 2
};
exports.help = {
  name: "thonk",
  category: "Fun",
  description: "DID YOU JUST THONKING ABOUT SOMETHING!?",
  usage: "thonk",
  param: "",
  aliases: "think, thnk"
};
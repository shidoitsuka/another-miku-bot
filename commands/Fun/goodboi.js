const Discord = require("discord.js");

exports.run = (bot, message, args) => {
  const embed = new Discord.MessageEmbed()
    .setAuthor(
      "Miku -- Good Boi!",
      "",
      "https://cdn.discordapp.com/attachments/424300803541696522/443085511729348608/226114699_9c9cc0b2.png"
    )
    .setColor(0x1a9ca8)
    .setDescription(`You\'re such a good boi, ${message.author.username}!`)
    .setImage(
      "https://cdn.discordapp.com/attachments/424300803541696522/443085511729348608/226114699_9c9cc0b2.png"
    );
  message.channel.send({ embed });
};

exports.conf = {
  aliases: ["goodboy", "gboi", "gboy", "gb"],
  cooldown: 2,
  guildOnly: false
};

exports.help = {
  name: "goodboi",
  category: "Fun",
  description: "Goodboi!! ( 0w0)-b",
  usage: "goodboi",
  param: "",
  aliases: "goodboy, gboy, gboi, gb"
};

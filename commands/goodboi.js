const Discord = require('discord.js');
exports.run = function(bot, message, args) {
  const embed = new Discord.RichEmbed()
    .setAuthor("Miku -- Good Boi!")
    .setColor(0x1a9ca8)
    .setDescription(`You\'re such a good boi, ${message.author.username}!`)
    .setImage("https://cdn.discordapp.com/attachments/424300803541696522/443085511729348608/226114699_9c9cc0b2.png")
    .setFooter("© 12042#5754", "https://tinyurl.com/MikuLogo");
  message.channel.send({
    embed
  });
};

exports.conf = {
  aliases: []
};

exports.help = {
  name: "goodboi",
  category: "Fun",
  description: "Goodboi!! ( 0w0)-b",
  usage: "goodboi"
};
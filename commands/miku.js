const Discord = require('discord.js');
const number = Math.floor((Math.random() * 40) + 1);
const images = `https://ohlookitsderpy.space/images/miku/image(${number}).jpg`;
exports.run = function(bot, message, args) {
  const embed = new Discord.RichEmbed()
    .setAuthor("Miku - Images")
    .setColor(0x1a9ca8)
    .setImage(images)
    .setDescription("No picture? Please try again.")
    .setFooter("© 12042#5754 | Images from ohlookitsderpy.space", "https://tinyurl.com/MikuLogo");
  message.channel.send("Under maintenance.");
  delete require.cache[require.resolve('./miku.js')];
};

exports.conf = {
  aliases: []
};

exports.help = {
  name: "miku",
  category: "Fun",
  description: "I\'ll show you how cute i am! :D",
  usage: "miku",
  param: "",
  aliases: ""
};
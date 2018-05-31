const Discord = require('discord.js');
const number = Math.floor((Math.random() * 40) + 1);
const images = `https://ohlookitsderpy.space/images/miku/image(${number}).jpg`;

exports.run = (bot, message, args) => {
  const embed = new Discord.RichEmbed()
    .setAuthor("Miku - Images")
    .setColor(0x1a9ca8)
    .setImage(images)
    .setDescription("No picture? Please try again.")
    .setFooter("Images from ohlookitsderpy.space");
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
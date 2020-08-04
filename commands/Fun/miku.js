const Discord = require("discord.js");
const number = Math.floor(Math.random() * 40 + 1);
const images = `https://ohlookitsderpy.space/images/miku/image(${number}).jpg`;

exports.run = (message, args) => {
  return message.channel.send("Under maintenance.");
  const embed = new Discord.MessageEmbed()
    .setAuthor("Miku - Images")
    .setColor(0x1a9ca8)
    .setImage(images)
    .setDescription("No picture? Please try again.")
    .setFooter("Images from ohlookitsderpy.space");
};

exports.conf = {
  aliases: [],
  cooldown: 5,
  guildOnly: false,
  userPerm: [""],
  botPerm: ["EMBED_LINKS"]
};

exports.help = {
  name: "miku",
  category: "Fun",
  description: "I'll show you how cute i am! :D",
  usage: "miku",
  param: ""
};

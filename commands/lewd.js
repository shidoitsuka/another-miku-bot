const Discord = require('discord.js');
const lewdLink = require('../assets/lewd.json');

exports.run = async (bot, message, args) => {
  const image = lewdLink.random();
  const embed = new Discord.RichEmbed()
    .setAuthor("Miku -- Lewd")
    .setColor(0x1a9ca8)
    .setDescription(`${!args[0] ? `Look at ${message.author.username}!\nThey\'re thinking about lewd things! >////<` : ""}`)
    .setImage(image)
    .setFooter("Google Images");
  message.channel.send("**Loading Image...**").then(m => m.edit({
    embed
  }));
  delete require.cache[require.resolve('./lewd.js')];
};

exports.conf = {
  aliases: ["l"],
  cooldown: 6
};

exports.help = {
  name: "lewd",
  category: "Fun",
  description: ">////< y so lewd!?`",
  usage: "lewd",
  param: "",
  aliases: "l"
};
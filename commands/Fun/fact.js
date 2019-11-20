const Discord = require("discord.js");
const nekoclient = require("nekos.life");
const neko = new nekoclient();

exports.run = async (bot, message, args) => {
  const embed = new Discord.MessageEmbed();
  const facts = await neko.sfw.fact();
  embed.setAuthor("Miku -- Fact");
  embed.setColor(0x1a9ca8);
  embed.setDescription(facts.fact);
  embed.setFooter("Powered by nekos.life");
  message.channel.send({ embed });
}; // END exports

exports.conf = {
  aliases: ["funfact"],
  cooldown: 3,
  guildOnly: false
};

exports.help = {
  name: "fact",
  category: "Fun",
  description: "Generate random facts",
  usage: "fact",
  param: "",
  aliases: "funfact"
};

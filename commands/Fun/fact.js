const Discord = require('discord.js');
const embed = new Discord.RichEmbed();
const nekoclient = require('nekos.life');
const neko = new nekoclient();

exports.run = async (bot, message, args) => {
  const facts = await neko.getSFWFact();
  embed.setAuthor("Miku -- Fact")
  embed.setColor(0x1a9ca8)
  embed.setDescription(facts.fact)
  embed.setFooter("Powered by nekos.life");
  message.channel.send({
    embed
  });
}; // END exports

exports.conf = {
  aliases: ["funfact"],
  cooldown: 3
};

exports.help = {
  name: "fact",
  category: "Fun",
  description: "Are you bored enough to run this command?",
  usage: "fact",
  param: "",
  aliases: "funfact"
};
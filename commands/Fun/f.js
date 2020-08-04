const Discord = require("discord.js");
const fs = require("fs");

exports.run = (bot, message, args) => {
  if (!bot.db.has("respects")) bot.db.set("respects", 1);
  bot.db.set("respects", bot.db.get("respects") + 1);
  const embed = new Discord.MessageEmbed()
    .setDescription(`**${message.author.username}** has paid their respect!`)
    .setColor(0x1a9ca8)
    .setFooter(`Total respect paid: ${bot.db.get("respects")}.`);
  message.channel.send({ embed });
};

exports.conf = {
  aliases: [],
  cooldown: 10,
  guildOnly: false,
  userPerm: [""],
  botPerm: ["EMBED_LINKS"]
};

exports.help = {
  name: "f",
  category: "Fun",
  description: "Pay respect.",
  usage: "f",
  param: ""
};

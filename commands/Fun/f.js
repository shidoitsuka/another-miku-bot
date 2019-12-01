const Discord = require("discord.js");
const fs = require("fs");

exports.run = (bot, message, args) => {
  let file = readFile("./assets/f");
  if (!file) file = { total: 0 };
  const total = file.total + 1;
  file = {
    total: total
  };
  writeFile("./assets/f", file);
  const embed = new Discord.MesageEmbed()
    .setDescription(`**${message.author.username}** has paid their respect!`)
    .setColor(0x1a9ca8)
    .setFooter(`Total respect paid: ${file.total}.`);
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

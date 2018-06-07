const Discord = require('discord.js');
const fs = require('fs');
let file = JSON.parse(fs.readFileSync("./commands/f.json", "utf8"));

exports.run = (bot, message, args) => {
  if (!file) {
    file = {
      total: 0
    }
  }
  const total = file.total + 1;
  file = {
    total: total
  }
  fs.writeFile('./commands/f.json', JSON.stringify(file), (err) => {
    if (err) console.log(err.stack)
  });
  const embed = new Discord.RichEmbed()
    .setDescription(`${message.author.username} has paid their respect!`)
    .setColor(0x1a9ca8)
    .setFooter(`Total respect paid: ${file.total}.`);
  message.channel.send({
    embed
  });
};

exports.conf = {
  aliases: []
};

exports.help = {
  name: "f",
  category: "Fun",
  description: "Pay your respect!",
  usage: "f",
  param: "",
  aliases: ""
};
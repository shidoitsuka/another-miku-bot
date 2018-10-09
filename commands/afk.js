const fs = require('fs');

exports.run = async (bot, message, args) => {
  let data = JSON.parse(fs.readFileSync('./assets/afk.json', 'utf8'));
  if (data.includes(message.author.id)) return message.channel.send("You are in AFK mode already!");
  data.push(message.author.id);
  message.channel.send("You are in AFK mode now!");
  fs.writeFile('./assets/afk.json', JSON.stringify(data), (err) => {
    if (err) console.log(err.stack)
  });
};

exports.conf = {
  aliases: [],
  cooldown: 1
};

exports.help = {
  name: "afk",
  category: "Misc.",
  description: "Run this so that I can tell them you're not around.",
  usage: "afk",
  param: "",
  aliases: ""
};
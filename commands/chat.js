const Discord = require('discord.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();

exports.run = async (bot, message, args) => {
  const theChat = await neko.getSFWChat({
    text: args.join(" ")
  });
  message.channel.send(theChat.response);
};

exports.conf = {
  aliases: ["c", "talk"]
};

exports.help = {
  name: "chat",
  category: "Fun",
  description: "Talk with me!",
  usage: "chat \`<text>\`",
  param: "",
  aliases: "c, talk"
};
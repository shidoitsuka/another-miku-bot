const Discord = require("discord.js");
const nekoclient = require("nekos.life");
const neko = new nekoclient();

exports.run = async (bot, message, args) => {
  if (!args[0]) return message.channel.send(".....");
  if (args[0] == "-owo") {
    const theChat = await neko.sfw.chat({
      text: args.join(" "),
      owo: "true"
    });
    args.shift();
    message.channel
      .send("**Thinykinyg... OwO**")
      .then(m => m.edit(theChat.response));
  } else {
    const theChat = await neko.sfw.chat({ text: args.join(" ") });
    message.channel.send("**Thinking...**").then(m => m.edit(theChat.response));
  }
};

exports.conf = {
  aliases: ["c", "talk"],
  cooldown: 2,
  guildOnly: false,
  userPerm: [""],
  botPerm: [""]
};

exports.help = {
  name: "chat",
  category: "Fun",
  description: "Talk to AI",
  usage: "chat [param] <text>",
  param: "-owo  :  OwO What's dis?"
};

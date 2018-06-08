const Discord = require('discord.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();

// START-MAIN
exports.run = async (bot, message, args) => {
  if (!args[0]) return message.channel.send(["https://tinyurl.com/MikuOwOHehe", "UwU"].random());
  else {
    const text = await neko.getSFWOwOify({
      text: args.join(" ")
    });
    message.channel.send(["**Thinking...**", "**Translating...**", "**Twanyswatinyg... OwO**", "**Thinykinyg... OwO**"].random())
      .then(m => m.edit(text.owo))
      .then(delete require.cache[require.resolve('./owo.js')]);
  }
};

exports.conf = {
  aliases: [],
  cooldown: 5
};

exports.help = {
  name: "owo",
  category: "Fun",
  description: "OwO What\'s this?\nEnygwish Twanyswatow!",
  usage: "owo \`<text>\`",
  param: "",
  aliases: ""
};
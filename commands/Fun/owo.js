const nekoclient = require("nekos.life");
const neko = new nekoclient();

// START-MAIN
exports.run = async (bot, message, args) => {
  // prettier-ignore
  if (!args[0]) return message.channel.send(["https://tinyurl.com/MikuOwOHehe", "UωU", "https://tinyurl.com/MikuOwO"].random());
  else {
    const text = await neko.sfw.OwOify({ text: args.join(" ") });
    // prettier-ignore
    message.channel
      .send(["**Thinking...**", "**Translating...**", "**Twanyswatinyg... OωO**", "**Thinykinyg... OωO**"].random())
      .then(m => m.edit(text.owo));
  }
};

exports.conf = {
  aliases: [],
  cooldown: 2,
  guildOnly: false,
  userPerm: [""],
  botPerm: [""]
};

exports.help = {
  name: "owo",
  category: "Fun",
  description: "Enygwish to OwO Twanyswatow!",
  usage: "owo <text>",
  param: ""
};

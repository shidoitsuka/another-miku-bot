const Discord = require("discord.js");
const nekoclient = require("nekos.life");
const neko = new nekoclient();
const texts = require("../../modules/texts.js");

exports.run = async (bot, message, args) => {
  // prettier-ignore
  if (!args[0]) return message.channel.send(":question:");
  const embed = new Discord.MessageEmbed()
    .setAuthor("Miku -- Magic 8ball")
    .setColor(0x1a9ca8);
  if (args[0] == "-i") {
    const eightball = await neko.sfw["8Ball"]();
    embed
      .setDescription(eightball.response)
      .setImage(`${eightball.url}`)
      .setFooter("Image by nekos.life");
    message.channel.send({ embed });
  } else {
    embed.setDescription(texts.EightballTexts());
    message.channel.send({ embed });
  }
};

exports.conf = {
  aliases: ["8b"],
  cooldown: 3,
  guildOnly: false,
  userPerm: [""],
  botPerm: ["EMBED_LINKS"]
};

exports.help = {
  name: "8ball",
  category: "Fun",
  description: "Ask magic 8ball!",
  usage: "8ball [param] <question>",
  param: "-i  :  use nekos.life API"
};

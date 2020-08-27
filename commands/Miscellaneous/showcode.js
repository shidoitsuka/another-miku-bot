const Discord = require("discord.js");
exports.run = (bot, message, args) => {
  const embed = new Discord.MessageEmbed()
    .setColor(0xf5ab35)
    .setImage("https://recruitingdaily.com/wp-content/uploads/sites/6/2017/02/quote-talk-is-cheap-show-me-the-code-linus-torvalds-45-66-13-e1487242875427.jpg");
  message.channel.send({ embed });
};
exports.conf = {
  aliases: ["code"],
  cooldown: 1,
  guildOnly: false,
  userPerm: [""],
  botPerm: ["EMBED_LINKS"]
};

exports.help = {
  name: "showcode",
  category: "Miscellaneous",
  description: "",
  usage: "showcode",
  param: ""
};

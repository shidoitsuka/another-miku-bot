const Discord = require('discord.js');
exports.run = function(bot, message, args) {
  if (!message.mentions.users.size) {
    const embed = new Discord.RichEmbed()
      .setAuthor("Miku -- Avatar", "", message.author.displayAvatarURL)
      .setColor(0x1a9ca8)
      .setFooter(`© 12042#5754 | ${message.author.username}\'s avatar`, "https://tinyurl.com/MikuLogo")
      .setImage(message.author.displayAvatarURL);
    message.channel.send({
      embed
    });
  } else {
    const mentionMember = message.mentions.users.first();
    const embed = new Discord.RichEmbed()
      .setAuthor("Miku -- Avatar", "", mentionMember.displayAvatarURL)
      .setColor(0x1a9ca8)
      .setFooter(`© 12042#5754 | ${mentionMember.username}\'s avatar`, "https://tinyurl.com/MikuLogo")
      .setImage(mentionMember.displayAvatarURL);
    message.channel.send({
      embed
    });
  }
};

exports.conf = {
  aliases: ["pfp"]
};

exports.help = {
  name: "avatar",
  category: "Misc.",
  description: "Display someone\'s avatar.",
  usage: "avatar \`<mention user>\`",
  param: "\`<mention user>\` is optional.",
  aliases: "pfp"
};
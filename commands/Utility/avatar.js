const Discord = require("discord.js");

exports.run = (bot, message, args) => {
  const embed = new Discord.MessageEmbed().setColor(0x1a9ca8);
  if (!message.mentions.users.size) {
    embed
      .setAuthor(
        "Miku -- Avatar",
        "",
        message.author.displayAvatarURL({ format: "png", size: 2048 })
      )
      .setFooter(`${message.author.username}\'s avatar`)
      .setImage(message.author.displayAvatarURL({ format: "png", size: 2048 }));
  } else {
    const mentionMember = message.mentions.users.first();
    embed
      .setAuthor(
        "Miku -- Avatar",
        "",
        mentionMember.displayAvatarURL({ format: "png", size: 2048 })
      )
      .setImage(mentionMember.displayAvatarURL({ format: "png", size: 2048 }))
      .setFooter(`${mentionMember.username}\'s avatar`);
  }
  message.channel.send({ embed });
};

exports.conf = {
  aliases: ["pfp"],
  cooldown: 5,
  guildOnly: false,
  userPerm: [""],
  botPerm: ["EMBED_LINKS"]
};

exports.help = {
  name: "avatar",
  category: "Utility",
  description: "Display someone's avatar.",
  usage: "avatar [mention-user]",
  param: ""
};

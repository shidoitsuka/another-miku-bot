const Discord = require("discord.js");

exports.run = (bot, message, args) => {
  const embed = new Discord.MessageEmbed()
    .setAuthor("Miku")
    .setColor(0x1a9ca8)
    .setImage(
      "https://media.discordapp.net/attachments/434692075217485834/441911225874645012/image_2.jpg"
    )
    .setDescription(`OMG!`)
    .setFooter("666#4558's Image");
  message.channel.send({ embed });
};

exports.conf = {
  aliases: ["hmg"],
  cooldown: 2,
  guildOnly: false,
  userPerm: [""],
  botPerm: ["EMBED_LINKS"]
};

exports.help = {
  name: "omg",
  category: "Images",
  description: "OMG!",
  usage: "omg",
  param: ""
};

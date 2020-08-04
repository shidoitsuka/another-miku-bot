const Discord = require("discord.js");

exports.run = (bot, message, args) => {
  // prettier-ignore
  const embed = new Discord.MessageEmbed()
    .setAuthor("Miku")
    .setColor(0x1a9ca8)
    .setImage("https://media.discordapp.net/attachments/434692075217485834/441921290786570251/image_1.jpg")
    .setDescription(`${message.author.username}\'s Heart, ${message.author.username}\'s Soul.`)
    .setFooter("666#4558's Image");
  message.channel.send({ embed });
};

exports.conf = {
  aliases: ["mahart", "mhahart", "mhaheart"],
  cooldown: 2,
  guildOnly: false,
  userPerm: [""],
  botPerm: ["EMBED_LINKS"]
};

exports.help = {
  name: "myheart",
  category: "Images",
  description: "Your heart, Your soul.\n-Angel Beats",
  usage: "myheart"
};

// TODO: https://media.discordapp.net/attachments/434692075217485834/441921290786570251/image_1.jpg
exports.run = function(bot, message, args) {
  const Discord = require('discord.js');
  const embed = new Discord.RichEmbed()
  .setAuthor("Miku")
  .setColor(0x1a9ca8)
  .setFooter("© 12042#5754", "https://cdn.discordapp.com/avatars/381018297019269121/6eecdd6f48c7e75239f77a58584f93dd.png")
  .setImage("https://media.discordapp.net/attachments/434692075217485834/441921290786570251/image_1.jpg")
  .setDescription(`${message.author.username}\'s Heart, ${message.author.username}\'s Soul.`);
  message.channel.send({embed});
};

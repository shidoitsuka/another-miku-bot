// TODO: https://media.discordapp.net/attachments/434692075217485834/441921290786570251/image_1.jpg
exports.run = function(bot, message, args) {
  const Discord = require('discord.js');
  const embed = new Discord.RichEmbed()
    .setAuthor("Miku")
    .setColor(0x1a9ca8)
    .setFooter("© 12042#5754 | 666#4558's Image", "https://tinyurl.com/MikuLogo")
    .setImage("https://preview.ibb.co/ha8SzS/ohfuck.jpg")
    .setDescription(`Seems like ${message.author.username} is thinking too much.`);
  message.channel.send({
    embed
  });
};
exports.run = function(bot, message, args) {
  const Discord = require('discord.js');
  const embed = new Discord.RichEmbed()
    .setAuthor("Miku")
    .setColor(0x1a9ca8)
    .setFooter("© 12042#5754 | 666#4558's Image", "https://tinyurl.com/MikuLogo")
    .setImage("https://media.discordapp.net/attachments/434692075217485834/441911225874645012/image_2.jpg")
    .setDescription(`OMG`);
  message.channel.send({
    embed
  });
};

exports.conf = {
  aliases: []
};

exports.help = {
  name: "omg",
  category: "Fun",
  description: "W-w-wait w-wha..!? OH MY GOD! D:",
  usage: "omg"
};
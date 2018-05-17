const Discord = require('discord.js');
const lewdLink = require('./lewd.json');
exports.run = function(bot, message, args) {
  // random link
  const answers = lewdLink.random();
  const embed = new Discord.RichEmbed()
    .setAuthor("Miku -- Lewd", "", answers)
    .setColor(0x1a9ca8)
    .setDescription(`Look at ${message.author.username}!\nThey\'re thinking about lewd things! >////<`)
    .setImage(`${answers}`)
    .setFooter("© 12042#5754 | Google Images", "https://tinyurl.com/MikuLogo");
  message.channel.send({
    embed
  });
  delete require.cache[require.resolve('./lewd.js')];
};

exports.conf = {
  aliases: []
};

exports.help = {
  name: "lewd",
  category: "Fun",
  description: ">////< y so lewd!?`",
  usage: "lewd",
  param: "",
  aliases: ""
};
const Discord = require('discord.js');
const lewdLink = require('./lewd.json');
const nekoclient = require('nekos.life');
const neko = new nekoclient();

exports.run = async (bot, message, args) => {
  const image = lewdLink.random();
  const embed = new Discord.RichEmbed()
    .setAuthor("Miku -- Lewd")
    .setColor(0x1a9ca8)
    .setDescription(`${!args[0] ? `Look at ${message.author.username}!\nThey\'re thinking about lewd things! >////<` : ""}`)
    .setImage(image)
    .setFooter("Google Images");
  message.channel.send("**Loading Image...**").then(m => m.edit({
    embed
  }));
  delete require.cache[require.resolve('./lewd.js')];
};

exports.conf = {
  aliases: ["l"]
};

exports.help = {
  name: "lewd",
  category: "Fun",
  description: ">////< y so lewd!?`",
  usage: "lewd",
  param: "-anal\n-pussy\n-random\n-gif-neko\n-neko\n-oppai\n-lesb\n-cumslut",
  aliases: "l"
};
const Discord = require("discord.js");
const quotes = require("../../assets/quotes.json"); // the quotes

exports.run = (bot, message, args) => {
  const theAnswer = quotes["random"].random();
  // prettier-ignore
  const quotesMotiv = quotes.motivate[Math.floor(Math.random() * quotes.motivate.length)];

  const embed = new Discord.MessageEmbed()
    .setAuthor("Miku -- Quotes")
    .setColor(0x795548)
    .setDescription(args[0] == "-m" ? quotesMotiv : theAnswer)
    .setFooter("© 12042#5754 & Lenali/Aidelena#4769");
  message.channel.send({ embed });
};

exports.conf = {
  aliases: ["quote", "qotd"],
  cooldown: 1.5,
  guildOnly: false,
  userPerm: [""],
  botPerm: ["EMBED_LINKS"]
};

exports.help = {
  name: "quotes",
  category: "Miscellaneous",
  description: "Print out great quotes!",
  usage: "quotes [param]",
  param: "-m  :  motivation"
};

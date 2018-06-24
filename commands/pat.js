const Discord = require('discord.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();

exports.run = async (bot, message, args) => {
  // Words to be answered
  const words = [
    `I hope you feel better now, **${args[0]}**`,
    `Look at ${message.author.username} and **${args[0]}**! O////O`,
    `_Pat, pat_ **${args[0]}**!`
  ];
  // VARIABLES
  const wordAnswer = words.random(),
    answers = await neko.getSFWPat(),
    idkI = "https://tinyurl.com/MikuIDK",
    idkD = `**${message.author.username}** trying to pat themselves,\nI wonder how...`;
  let description, image;

  // STATEMENT
  !args[0] ? (description = idkD, image = idkI) : (description = wordAnswer, image = answers.url);

  // BEGIN
  const embed = new Discord.RichEmbed()
    .setAuthor("Miku -- Pat", "", `${image}`)
    .setColor(0x1a9ca8)
    .setDescription(description)
    .setImage(`${image}`)
    .setFooter(`${!args[0] ? "" : "Image by nekos.life"}`);
  message.channel.send("**Loading Image...**")
    .then(m => m.edit({
      embed
    }))
    .then(delete require.cache[require.resolve('./pat.js')])
    .catch(err => console.log(err.stack));
}; // END exports

exports.conf = {
  aliases: [],
  cooldown: 6
};

exports.help = {
  name: "pat",
  category: "Fun",
  description: "Pat someone!",
  usage: "pat [mention_user] or [name]",
  param: "",
  aliases: ""
};
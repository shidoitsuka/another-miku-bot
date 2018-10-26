const Discord = require('discord.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();

exports.run = async (bot, message, args) => {
  // Words to be answered
  const words = [
    `You deserve this, **${args[0]}**!`,
    `......`,
    `Bad **${args[0]}**!! >:C`
  ];
  // VARIABLES
  const wordAnswer = words.random(),
    answers = await neko.getSFWSlap(),
    idkI = "https://tinyurl.com/MikuIDK",
    idkD = `**${message.author.username}** trying to slap themselves,\nI wonder why...`;
  let description, image;

  // STATEMENT
  !args[0] ? (description = idkD, image = idkI) : (description = wordAnswer, image = answers.url);

  // BEGIN
  const embed = new Discord.RichEmbed()
    .setAuthor("Miku -- Slap", "", `${image}`)
    .setColor(0x1a9ca8)
    .setDescription(description)
    .setImage(`${image}`)
    .setFooter(`${!args[0] ? "" : "Image by nekos.life"}`);
  message.channel.send("**Loading Image...**")
    .then(m => m.edit({
      embed
    }))
    .catch(err => console.log(err.stack));
}; // END exports

exports.conf = {
  aliases: [],
  cooldown: 6
};

exports.help = {
  name: "slap",
  category: "Fun",
  description: "Slap someone!",
  usage: "slap <mention-user> or <name>",
  param: "",
  aliases: ""
};
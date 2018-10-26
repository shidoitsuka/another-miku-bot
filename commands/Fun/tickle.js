const Discord = require('discord.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();

exports.run = async (bot, message, args) => {
  // Words to be answered
  const words = [
    `${message.author.username} is tickling **${args[0]}**!`,
    `${message.author.username} : Take this!\n${args[0]} : NO! STOP!`
  ];
  // VARIABLES
  const wordAnswer = words.random(),
    answers = await neko.getSFWTickle(),
    idkI = "https://tinyurl.com/MikuIDK",
    idkD = `**${message.author.username}** trying to cuddle themselves,\nI wonder how...`;
  let description, image;

  // STATEMENT
  !args[0] ? (description = idkD, image = idkI) : (description = wordAnswer, image = answers.url);

  // BEGIN
  const embed = new Discord.RichEmbed()
    .setAuthor("Miku -- Tickle", "", `${image}`)
    .setColor(0x1a9ca8)
    .setDescription(description)
    .setImage(`${image}`)
    .setFooter(`${!args[0] ? "" : "Image by nekos.life"}`);
  message.channel.send("**Loading Image...**")
    .then(m => m.edit({
      embed
    }))
    .then(delete require.cache[require.resolve('./tickle.js')])
    .catch(err => console.log(err.stack));
}; // END exports

exports.conf = {
  aliases: [],
  cooldown: 6
};

exports.help = {
  name: "tickle",
  category: "Fun",
  description: "Tickle someone!",
  usage: "tickle [mention-user] or [name]",
  param: "",
  aliases: ""
};
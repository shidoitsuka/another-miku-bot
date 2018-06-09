const Discord = require('discord.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();

// START-MAIN
exports.run = async (bot, message, args) => {
  const words = [
    `${message.author.username} is poking **${args[0]}**!`,
    `Poke poke!`
  ];
  // VARIABLES
  const wordAnswer = words.random(),
    answers = await neko.getSFWPoke(),
    idkI = "https://tinyurl.com/MikuIDK",
    idkD = `**${message.author.username}** trying to poke themselves,\nI wonder how...`;
  let description, image;

  // STATEMENT
  !args[0] ? (description = idkD, image = idkI) : (description = wordAnswer, image = answers.url);

  // BEGIN
  const embed = new Discord.RichEmbed()
    .setAuthor("Miku -- Poke", "", `${image}`)
    .setColor(0x1a9ca8)
    .setDescription(description)
    .setImage(`${image}`)
    .setFooter(`${!args[0] ? "" : "Image by nekos.life"}`);
  message.channel.send("**Loading Image...**")
    .then(m => m.edit({
      embed
    }))
    .then(delete require.cache[require.resolve('./poke.js')])
    .catch(err => console.log(err.stack));
};

exports.conf = {
  aliases: [],
  cooldown: 6
};

exports.help = {
  name: "poke",
  category: "Fun",
  description: "Poke your senpai!",
  usage: "poke \`<mention user>\` or \`<name>\`",
  param: "\`<mention user>\` or \`<name>\` are optional.",
  aliases: ""
};
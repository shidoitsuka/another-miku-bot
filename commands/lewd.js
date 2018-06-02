const Discord = require('discord.js');
const lewdLink = require('./lewd.json');
const nekoclient = require('nekos.life');
const neko = new nekoclient();

exports.run = async (bot, message, args) => {
  let answers;
  !args[0] ? answers = lewdLink.random() : args[0] == "-pussy" ? answers = await neko.getNSFWPussy() : args[0] == "-anal" ?
    answers = await neko.getNSFWAnal() : args[0] == "-random" ? answers = await neko.getNSFWRandomHentaiGif() : args[0] == "-gif-neko" ?
    answers = await neko.getNSFWNekoGif() : args[0] == "-neko" ? answers = await neko.getNSFWNeko() : args[0] == "-oppai" ?
    answers = await neko.getNSFWBoobs() : args[0] == "-lesb" ? answers = await neko.getNSFWLesbian() : args[0] == "-cumslut" ?
    answers = await neko.getNSFWCumsluts() : answers = lewdLink.random();

  if (args[0] && !message.channel.nsfw) return ("This is **NOT NSFW** Channel.").then(m => m.delete(3000));
  const embed = new Discord.RichEmbed()
    .setAuthor("Miku -- Lewd")
    .setColor(0x1a9ca8)
    .setDescription(`${!args[0] ? `Look at ${message.author.username}!\nThey\'re thinking about lewd things! >////<` : ""}`)
    .setImage(`${!args[0] ? `${answers}` : `${answers.link}`}`)
    .setFooter(`${!args[0] ? "Google Image" : "Image by nekos.life"}`);
  message.channel.send({
    embed
  });
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
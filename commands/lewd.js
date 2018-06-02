const Discord = require('discord.js');
const lewdLink = require('./lewd.json');
const nekoclient = require('nekos.life');
const neko = new nekoclient();

exports.run = async (bot, message, args) => {
  if (!args[0]) {
    const answers = lewdLink.random();
    const embed = new Discord.RichEmbed()
      .setAuthor("Miku -- Lewd", "", answers)
      .setColor(0x1a9ca8)
      .setDescription(`Look at ${message.author.username}!\nThey\'re thinking about lewd things! >////<`)
      .setImage(`${answers}`)
      .setFooter("Google Images");
    message.channel.send({
      embed
    });
  }
  if (args[0] == "-pussy") {
    const answers = await neko.getNSFWPussy();
    const embed = new Discord.RichEmbed()
      .setAuthor("Miku -- Lewd", "", `${answers.url}`)
      .setColor(0x1a9ca8)
      .setImage(`${answers.url}`);
    message.channel.send({
      embed
    });
  }
  if (args[0] == "-random") {
    const answers = await neko.getNSFWRandomHentaiGif();
    const embed = new Discord.RichEmbed()
      .setAuthor("Miku -- Lewd", "", `${answers.url}`)
      .setColor(0x1a9ca8)
      .setImage(`${answers.url}`);
    message.channel.send({
      embed
    });
  }
  if (args[0] == "-gif-neko") {
    const answers = await neko.getNSFWNekoGif();
    const embed = new Discord.RichEmbed()
      .setAuthor("Miku -- Lewd", "", `${answers.url}`)
      .setColor(0x1a9ca8)
      .setImage(`${answers.url}`);
    message.channel.send({
      embed
    });
  }
  if (args[0] == "-neko") {
    const answers = await neko.getNSFWNeko();
    const embed = new Discord.RichEmbed()
      .setAuthor("Miku -- Lewd", "", `${answers.url}`)
      .setColor(0x1a9ca8)
      .setImage(`${answers.url}`);
    message.channel.send({
      embed
    });
  }
  if (args[0] == "-oppai") {
    const answers = await neko.getNSFWBoobs();
    const embed = new Discord.RichEmbed()
      .setAuthor("Miku -- Lewd", "", `${answers.url}`)
      .setColor(0x1a9ca8)
      .setImage(`${answers.url}`);
    message.channel.send({
      embed
    });
  }
  if (args[0] == "-lesb") {
    const answers = await neko.getNSFWLesbian();
    const embed = new Discord.RichEmbed()
      .setAuthor("Miku -- Lewd", "", `${answers.url}`)
      .setColor(0x1a9ca8)
      .setImage(`${answers.url}`);
    message.channel.send({
      embed
    });
  }
  if (args[0] == "-cumslut") {
    const answers = await neko.getNSFWCumsluts();
    const embed = new Discord.RichEmbed()
      .setAuthor("Miku -- Lewd", "", `${answers.url}`)
      .setColor(0x1a9ca8)
      .setImage(`${answers.url}`);
    message.channel.send({
      embed
    });
  }
  if (args[0] == "-anal") {
    const answers = await neko.getNSFWAnal();
    const embed = new Discord.RichEmbed()
      .setAuthor("Miku -- Lewd", "", `${answers.url}`)
      .setColor(0x1a9ca8)
      .setImage(`${answers.url}`);
    message.channel.send({
      embed
    });
  }
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
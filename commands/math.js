const Discord = require('discord.js');
const math = require('mathjs');
const answers = [
  "Should be ",
  "I guess it's ",
  "It should be ",
  "Hmmm... Probably "
];

exports.run = (bot, message, args) => {
  const theAnswer = answers.random();
  var txt = message.content.slice(6);
  try {
    if (txt == "2+2" || txt == "2+ 2" || txt == "2 +2" || txt == "2 + 2") {
      const embed = new Discord.RichEmbed()
        .setAuthor("Miku", "https://tinyurl.com/MikuCalc")
        .setColor(0x1a9ca8)
        .setDescription("Let him answer you:")
        .setImage("https://goo.gl/tVGvMX");
      message.channel.send({
        embed
      });
    } else {
      var ans = math.eval(txt);
      const embed = new Discord.RichEmbed()
        .setAuthor("Miku -- Math", "https://tinyurl.com/MikuCalc")
        .setColor(0x1a9ca8)
        .setDescription(`${theAnswer}\`${ans}\``);
      message.channel.send({
        embed
      });
      delete require.cache[require.resolve('./math.js')];
    }
  } catch (err) {
    const embed = new Discord.RichEmbed()
      .setAuthor("Miku -- Error")
      .setThumbnail("https://tinyurl.com/MikuError")
      .setColor(0xf44336)
      .setDescription(`Something went wrong!\n**Error**  : \n${err.name} ${err.message}`);
    message.channel.send({
      embed
    });
  }
};

exports.conf = {
  aliases: ["mafs", "maffs", "maff"],
  cooldown: 3
};

exports.help = {
  name: "math",
  category: "Misc.",
  description: "Let me do complex math for you!",
  usage: "math \`<expression>\`",
  param: "",
  aliases: "mafs, maffs, maff"
};
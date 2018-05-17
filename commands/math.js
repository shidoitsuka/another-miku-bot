const Discord = require('discord.js');
const math = require('mathjs');
const answers = [
  "Should be ",
  "I guess it's ",
  "It should be ",
  "Hmmm... Probably "
];
exports.run = function(bot, message, args) {
  const theAnswer = answers.random();
  var txt = message.content.slice(6);
  try {
    if (txt == "2+2" || txt == "2+ 2" || txt == "2 +2" || txt == "2 + 2") {
      const embed = new Discord.RichEmbed()
        .setAuthor("Miku", "https://tinyurl.com/MikuCalc")
        .setColor(0x1a9ca8)
        .setDescription("Let him answer you:")
        .setImage("https://goo.gl/tVGvMX")
        .setFooter("© 12042#5754");
      message.channel.send({
        embed
      });
    } else {
      var ans = math.eval(txt);
      const embed = new Discord.RichEmbed()
        .setAuthor("Miku -- Math", "https://tinyurl.com/MikuCalc")
        .setColor(0x1a9ca8)
        .setDescription(`${theAnswer}\`${ans}\``)
        .setFooter("© 12042#5754");
      message.channel.send({
        embed
      });
      delete require.cache[require.resolve('./math.js')];
    }
  } catch (err) {
    message.channel.send({
      embed: {
        color: 0xc62828,
        title: "Error x.x",
        description: `${err.name}\n${err.message}`,
        footer: {
          text: "© 12042#5754"
        }
      }
    });
  }
};

exports.conf = {
  aliases: ["mafs", "maffs", "maff"]
};

exports.help = {
  name: "math",
  category: "Misc.",
  description: "Let me do complex math for you!",
  usage: "math \`<expression>\`",
  param: "",
  aliases: "mafs, maffs, maff"
};
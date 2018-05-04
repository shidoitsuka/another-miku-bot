const math = require('mathjs');
const Discord = require('discord.js');
var answers = [
  "Should be ",
  "I guess it's ",
  "It should be ",
  "Hmmm... Probably "
];
var theAnswer = answers[Math.floor(Math.random() * answers.length)];
exports.run = function(bot, message, args) {
  var msg = message.content.slice();
  var txt = message.content.slice(6);
  try {
    if (txt == "2+2" || txt == "2+ 2" || txt == "2 +2" || txt == "2 + 2") {
      const embed = new Discord.RichEmbed()
      .setAuthor("Miku", "https://cdn.discordapp.com/avatars/381018297019269121/6eecdd6f48c7e75239f77a58584f93dd.png")
      .setColor(0x1a9ca8)
      .setDescription("Let him answer you:")
      .setImage("https://goo.gl/tVGvMX")
      .setFooter("© 12042#5754", "https://cdn.discordapp.com/avatars/381018297019269121/6eecdd6f48c7e75239f77a58584f93dd.png");
      message.channel.send({embed});
    }
    else {
      var ans = math.eval(txt);
      const embed = new Discord.RichEmbed()
      .setAuthor("Miku -- Math", "https://cdn.discordapp.com/avatars/381018297019269121/6eecdd6f48c7e75239f77a58584f93dd.png")
      .setColor(0x1a9ca8)
      .setDescription(`${theAnswer}${ans}`)
      .setFooter("© 12042#5754", "https://cdn.discordapp.com/avatars/381018297019269121/6eecdd6f48c7e75239f77a58584f93dd.png");
      message.channel.send({embed});
    }
  }
  catch (err) {
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

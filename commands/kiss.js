const Discord = require('discord.js');
const config = require('../config.json');
const kissLink = require('./kiss.json'); // Kiss Link
const answers = kissLink[Math.floor(Math.random() * kissLink.length)]; // Random the Kiss Link
exports.run = function(bot, message, args) {
  // Words to be answered
  const words = [
    `${message.author.username} is kissing **${args[0]}** >////<`,
    `Look at ${message.author.username} and **${args[0]}**! O////O`,
    `How cute, ${message.author.username} is kissing **${args[0]}**!`
  ];
  // Random the words
  const wordAnswer = words[Math.floor(Math.random() * words.length)];

  /**
   * To separate command and arguments
   * <config>example help
   * output=
   * command : example
   * argument : help
   **/
  var args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  var command = args.shift().toLowerCase();

  // BEGIN if no argument a.k.a no user is mentioned or said
  if (!args[0]) {
    const embed = new Discord.RichEmbed()
      .setAuthor("Miku -- Kiss", "", "https://tinyurl.com/MikuIDK")
      .setColor(0x1a9ca8)
      .setDescription(`${message.author.username} trying to kiss themselves,\nI wonder how...`)
      .setImage("https://tinyurl.com/MikuIDK")
      .setFooter("© 12042#5754", "https://tinyurl.com/MikuLogo");
    message.channel.send({
      embed
    });
  } // END if no argument a.k.a no user is mentioned or said

  // BEGIN if miku is mentioned
  else if (args[0] == `<@${config.botID}>`) {
    // BEGIN if the <author> is owner
    if (message.author.id == config.ownerID) {
      const embed = new Discord.RichEmbed()
        .setAuthor("Miku -- Kiss", "", answers)
        .setColor(0x1a9ca8)
        .setDescription(`I love you!❤`)
        .setImage("https://tinyurl.com/MikuKiss")
        .setFooter("© 12042#5754 | Izayoi Miku from Date A Live", "https://tinyurl.com/MikuLogo");
      message.channel.send({
        embed
      });
    } // END if the <author> is owner

    // BEGIN if the <author> is NOT owner
    else {
      const embed = new Discord.RichEmbed()
        .setAuthor("Miku -- Kiss", "", answers)
        .setColor(0x1a9ca8)
        .setDescription(`Sorry but, you are not <@${config.ownerID}>! >////<`)
        .setImage("https://tinyurl.com/MikuSorry")
        .setFooter("© 12042#5754 | Google Images", "https://tinyurl.com/MikuLogo");
      message.channel.send({
        embed
      });
    } // END if the <author> is NOT owner
  } // END if miku is mentioned

  // BEGIN DEFAULT if someone mentioned someone or said someone's name
  else {
    const embed = new Discord.RichEmbed()
      .setAuthor("Miku -- Kiss", "", answers)
      .setColor(0x1a9ca8)
      .setDescription(`${wordAnswer}`)
      .setImage(`${answers}`)
      .setFooter("© 12042#5754 | Google Images", "https://tinyurl.com/MikuLogo");
    message.channel.send({
      embed
    });
  } // END DEFAULT

  // deletes the cache to make it randomed again
  delete require.cache[require.resolve('./kiss.js')];
}; // END exports

exports.conf = {
  aliases: []
};

exports.help = {
  name: "kiss",
  category: "Fun",
  description: "Kiss someone!`",
  usage: "kiss \`<mention user>\` or \`<name>\`"
};
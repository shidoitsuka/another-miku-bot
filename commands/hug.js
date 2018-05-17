const Discord = require('discord.js');
const config = require('../config.json');
const hugLink = require('./hug.json'); // Hug Link

// START
exports.run = function(bot, message, args) {
  const words = [
    `${message.author.username} is hugging **${args[0]}** >////<`,
    `Look at ${message.author.username} and **${args[0]}**! O////O`,
    `How cute, ${message.author.username} is hugging **${args[0]}**!`
  ];
  // Random the words & hug Link
  const wordAnswer = words.random();
  const answers = hugLink.random();

  if (!args[0]) {
    const embed = new Discord.RichEmbed()
      .setAuthor("Miku -- Hug", "", "https://tinyurl.com/MikuIDK")
      .setColor(0x1a9ca8)
      .setDescription(`${message.author.username} trying to hug themselves,\nI wonder how...`)
      .setImage("https://tinyurl.com/MikuIDK")
      .setFooter("© 12042#5754", "https://tinyurl.com/MikuLogo");
    message.channel.send({
      embed
    });
  } else if (args[0] == `<@${config.botID}>`) {
    // BEGIN if the <author> is owner
    if (message.author.id == config.ownerID) {
      const embed = new Discord.RichEmbed()
        .setAuthor("Miku -- Hug", "", answers)
        .setColor(0x1a9ca8)
        .setDescription(`I love you!❤`)
        .setImage("https://tinyurl.com/MikuHug")
        .setFooter("© 12042#5754 | Google Images", "https://tinyurl.com/MikuLogo");
      message.channel.send({
        embed
      });
    } // END if the <author> is owner

    // BEGIN if the <author> is NOT owner
    else {
      const embed = new Discord.RichEmbed()
        .setAuthor("Miku -- Hug", "", answers)
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
      .setAuthor("Miku -- Hug", "", answers)
      .setColor(0x1a9ca8)
      .setDescription(`${wordAnswer}`)
      .setImage(`${answers}`)
      .setFooter("© 12042#5754 | Google Images", "https://tinyurl.com/MikuLogo");
    message.channel.send({
      embed
    });
  } // END DEFAULT

  // deletes the cache to make it randomed again
  delete require.cache[require.resolve('./hug.js')];

};

exports.conf = {
  aliases: []
};

exports.help = {
  name: "hug",
  category: "Fun",
  description: "Hug someone!",
  usage: "hug \`<mention user>\` or \`<name>\`",
  param: "\`<mention user>\` or \`<name>\` are optional.",
  aliases: ""
};
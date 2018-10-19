// const Discord = require('discord.js');
//
// exports.run = async (bot, message, args) => {
//   const filter = (reaction, user) => {
//     return (reaction.emoji.name === '1⃣' || reaction.emoji.name === '2⃣') && user.id === message.author.id;
//   };
//   const embed = new Discord.RichEmbed()
//     .setAuthor("Miku -- What's your dere")
//     .setDescription("Will you kill her for him?")
//     .addField("1", "Yes", true)
//     .addField("2", "No", true)
//     .setFooter("Timed out in 10 second(s)");
//   message.channel.send({
//       embed
//     })
//     .then(m => {
//       const a = m.react("1⃣");
//       const b = m.react("2⃣");
//     });
//
//   const collector = message.createReactionCollector(filter, {
//     time: 10000,
//     max: 1
//   });
//   collector.on('collect', (reaction, reactionCollector) => {
//     console.log(`Collected ${reaction.emoji.name}`);
//   });
//
//   collector.on('end', collected => {
//     console.log(`Collected ${collected.size} items`);
//   });
// }; // END exports
//
exports.conf = {
  aliases: [],
  cooldown: 5
};

exports.help = {
  name: "dere",
  category: "Fun",
  description: "Are you a tsundere or yandere? UwU",
  usage: "dere",
  param: "",
  aliases: ""
};
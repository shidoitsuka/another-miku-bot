const Discord = require("discord.js");
const fs = require("fs");

module.exports = member => {
  const DB = readFile("./assets/guildDB");
  if (DB[member.guild.id].greetingChannel == "") return;
  const embed = new Discord.MessageEmbed()
    .setAuthor("New Member!")
    .setDescription(`**${member.user.username}** just joined!`)
    .setImage("https://media.giphy.com/media/b9QBHfcNpvqDK/giphy.gif")
    .setColor("0xf5ab35");
  member.guild.channels
    .find(c => c.id === DB[member.guild.id].greetingChannel)
    .send({ embed });
};

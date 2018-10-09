const Discord = require('discord.js');
const fs = require('fs');

module.exports = member => {
  let welcomeDB = JSON.parse(fs.readFileSync('./assets/welcome.json', 'utf8'));
  if (!Object.keys(welcomeDB).includes(member.guild.id)) return;
  const embed = new Discord.RichEmbed()
    .setAuthor("New Member!")
    .setDescription(`**${member.user.username}** just joined!`)
    .setImage("https://media.giphy.com/media/b9QBHfcNpvqDK/giphy.gif")
    .setColor("0xf5ab35");
  member.guild.channels.find("id", welcomeDB[member.guild.id]).send({
    embed
  });
};
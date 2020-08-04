const Discord = require("discord.js");

module.exports = member => {
  const bot = member.client;
  // prettier-ignore
  if (bot.db.get("guildConf", `${member.guild.id}.greetingChannel`) == null) return;
  const embed = new Discord.MessageEmbed()
    .setAuthor("New Member!")
    .setDescription(`**${member.user.username}** just joined!`)
    .setImage("https://media.giphy.com/media/b9QBHfcNpvqDK/giphy.gif")
    .setColor("0xf5ab35");
  // prettier-ignore
  member.guild.channels.cache
    .get(bot.db.get("guildConf", `${member.guild.id}.greetingChannel`))
    .send({ embed });
};

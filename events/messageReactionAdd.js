const Discord = require("discord.js");
const fs = require("fs");

module.exports = async (reaction, user) => {
  const bot = reaction.message.client;
  // if DM, return
  if (reaction.message.channel.type == "dm") return;
  // if not star, return
  if (reaction.emoji.name != "⭐") return;
  // if message is reacted by bot, return
  if (user.bot) return;
  // if reaction is less than 5, return
  if (reaction.count < 3) return;
  // after minimum reaction is reached, return
  if (reaction.count > 3) return;

  // if star system is not active, return
  // prettier-ignore
  if (bot.db.get("guildConf", `${reaction.message.guild.id}.star.starChannel`) == null) return;
  // if it exist in starchannel, return
  // prettier-ignore
  if (bot.db.get("guildConf", `${reaction.message.guild.id}.star.used`).includes(reaction.message.id)) return;
  // var
  let msg;
  /*
   * check if the message is old
   * if its old, fetch it first
   */
  if (reaction.message.partial) {
    try {
      msg = await reaction.message.fetch();
    } catch (e) {
      console.log(e);
    }
  }
  msg = reaction.message;
  // if the message is from bot, return
  if (msg.author.bot) return;
  // prettier-ignore
  const embed = new Discord.MessageEmbed()
    .setColor(0x1a9ca8)
    .setThumbnail(`${reaction.message.author.displayAvatarURL({ format: "png", size: 1024 })}`)
    .addField("__**Author**__", `${msg.author}`, true)
    .addField("__**Channel**__", `<#${reaction.message.channel.id}>`, true)
    .addField("__**Link**__", `[Click here](${msg.url})`, msg.content.length > 25 ? false : true)
    .setFooter(`${msg.id}`)
    .setTimestamp();
  if (msg.attachments.size == 0) {
    // prettier-ignore
    embed.addField("__**Content**__", `${msg.content}`, msg.content.length > 25 ? false : true);
  } else {
    const attachment = msg.attachments.map(a => a.url);
    if (msg.content.length != 0) {
      // prettier-ignore
      embed.addField("__**Content**__", `${msg.content}`, msg.content.length > 25 ? false : true);
    }
    embed.setImage(`${attachment}`);
  }

  // get starchannel id and send it
  // prettier-ignore
  reaction.message.guild.channels.cache
    .get(bot.db.get("guildConf", `${reaction.message.guild.id}.star.starChannel`))
    .send({ embed })
    .then(m => m.react("⭐"));
  // then push used message id into DB, so it won't spam
  // prettier-ignore
  bot.db.push("guildConf", reaction.message.id, `${reaction.message.guild.id}.star.used`);
};

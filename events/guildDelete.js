const Discord = require("discord.js");
const fs = require("fs");

module.exports = guild => {
  const bot = guild.client;
  try {
    const checker = bot.db.get("guildConf", guild.id);
    if (checker != undefined) throw Error();
  } catch (_) {
    bot.db.deleteProp("guildConf", guild.id);
  }
};

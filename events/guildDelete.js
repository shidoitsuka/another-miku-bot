const Discord = require("discord.js");
const fs = require("fs");

module.exports = guild => {
  let DB = readFile("./assets/guildDB");

  if (!(guild.id in DB)) return;
  delete DB[guild.id];
  writeFile("./assets/guildDB", DB);
};

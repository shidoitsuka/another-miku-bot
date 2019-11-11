const Discord = require("discord.js");
const fs = require("fs");

module.exports = guild => {
  let DB = readFile("./assets/guildDB");

  if (DB[guild.id] == undefined) return;
  delete DB[guild.id];
  writeFile("./assets/guildDB", DB);
};

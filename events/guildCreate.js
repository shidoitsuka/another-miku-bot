const Discord = require("discord.js");
const fs = require("fs");

module.exports = guild => {
  let DB = readFile("./assets/guildDB");
  if (DB[guild.id] != undefined) return;
  DB[guild.id] = {
    prefix: "q",
    greetingChannel: "",
    tag: {},
    star: {
      starChannel: "",
      used: []
    }
  };
  writeFile("./assets/guildDB", DB);
};

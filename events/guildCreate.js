const Discord = require("discord.js");
const fs = require("fs");

module.exports = guild => {
  let DB = readFile("./assets/guildDB");

  if (!(guild.id in DB)) {
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
  }
};

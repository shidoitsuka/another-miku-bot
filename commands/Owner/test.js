const fs = require('fs');
exports.run = async (bot, message, args) => {
  if (message.author.id !== require('../../config.json').ownerID) return message.channel.send(":/");
  senderID = message.author.id;
  guildID = message.guild.id;
  // sendError(help.name, message.channel.id);
  // console.log(bot.commands.map(x => x.help.name));
  const subFolders = fs.readdirSync('./commands/');
  console.log(subFolders);
  var cmdCategory = [],
    availableCommands = [],
    textToBeSend = '';
  for (var i = 0; i < subFolders.length; i++) {
    cmdCategory.push(subFolders[i]);
    let commands = fs.readdirSync(`./commands/${subFolders[i]}`).filter(files => files.endsWith(".js"));
    // console.log(cmdCategory);
    textToBeSend = `**${cmdCategory.join(" ")}** :\n ${commands.join(", ")}`;
    console.log(textToBeSend);
    // console.log(textToBeSend);
    cmdCategory.splice(subFolders[i], 1);
  }
};

exports.help = {
  name: "test",
  category: "",
  description: "",
  usage: "",
  param: "",
  aliases: ""
};

exports.conf = {
  aliases: [],
  cooldown: 0.5
};
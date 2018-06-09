const main = require('../index.js');

exports.run = (bot, message, args) => {
  if (message.author.id != '332424370272337923') return message.channel.send("Invalid Permission(s).");
  let cmd = args.join(' ');
  main.reload(message, cmd);
};

exports.conf = {
  aliases: ["r"],
  cooldown: 3
};

exports.help = {
  name: "reload",
  category: "**Owner Only**",
  description: "Reload specific commands",
  usage: "reload \`<command>\`",
  param: "",
  aliases: "r"
};
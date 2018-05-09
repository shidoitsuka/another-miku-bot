const main = require('../index.js');
const config = require('../config.json');
exports.run = function(bot, message, args) {
  if (message.author.id != config.ownerID && message.author.id != config.babeID) {
    message.channel.send("You are not my owner!");
  } else {
    let cmd = args.join(' ');
    main.reload(message, cmd);
  }
};

exports.conf = {
  aliases: []
};

exports.help = {
  name: "reload",
  category: "\`Owner Only\`",
  description: "Reload specific commands",
  usage: "reload \`<command>\`"
};
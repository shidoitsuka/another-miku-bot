const config = require('../config.json');
exports.run = function(bot, message) {
  /**
   * To separate command and arguments
   * <config>example help
   * output=
   * command : example
   * argument : help
   **/
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // if args[0] length is not 1, return
  if (args[0].length != 1) {
    message.channel.send("Error.")
  } else {
    message.channel.send(`https://emojipedia.org/regional-indicator-symbol-letter-${args[0]}`);
  }
};

exports.conf = {
  aliases: []
};

exports.help = {
  name: "indicator",
  category: "System",
  description: "I\'ll give you link for \`text-indicator\` that you\'re looking for.",
  usage: "indicator \`<letter>\`"
};
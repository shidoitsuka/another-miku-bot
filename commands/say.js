const config = require('../config.json');
exports.run = function(bot, message, args) {
  var args = message.content.split(' ');
  var msg = args.shift().slice(config.prefix.length);
  message.delete();
  message.channel.send(args.join(" "));
};

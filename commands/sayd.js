const config = require('../config.json');
exports.run = function(bot, message, args) {
  var args = message.content.split(' ');
  var msg = args.shift().slice(config.prefix.length);
  message.delete();
  message.channel.send(args.join(" "));
};

exports.conf = {
  aliases: []
};

exports.help = {
  name: "sad",
  category: "Fun",
  description: "Too shy to say it? I\'ll do it for you!\n*d stands for delete*",
  usage: "say <text>"
};
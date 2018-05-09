const config = require('../config.json');
exports.run = function(bot, message, args) {
  // var args = message.content.split(' ');
  // var cmd = args.shift().slice(config.prefix.length).toLowerCase();
  var args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  var cmd = args.shift().toLowerCase();
  message.channel.send(args.join(" "), {
    tts: true
  });
};

exports.conf = {
  aliases: []
};

exports.help = {
  name: "tts",
  category: "Fun",
  description: "Too shy to say it? I\'ll do it for you, with voice! (OwO)",
  usage: "tts <text>"
};
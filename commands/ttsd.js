const config = require('../config.json');
exports.run = function(bot, message, args) {
  // var args = message.content.split(' ');
  // var cmd = args.shift().slice(config.prefix.length).toLowerCase();
  var args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  var cmd = args.shift().toLowerCase();
  message.delete();
  message.channel.send(args.join(" "), {
    tts: true
  }).then(response => response.delete(100));
};

exports.conf = {
  aliases: []
};

exports.help = {
  name: "tts",
  category: "Fun",
  description: "Too shy to say it? I\'ll do it for you, with voice! (OwO)\n*d stands for delete*",
  usage: "tts <text>"
};
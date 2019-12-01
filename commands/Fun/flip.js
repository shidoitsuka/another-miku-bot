exports.run = function(bot, message, args) {
  const coins = ["Heads", "Tails", "Try again!"].random();
  message.channel.send(coins);
};

exports.conf = {
  aliases: ["flipcoin", "flipcoins", "flips"],
  cooldown: 3,
  guildOnly: false,
  userPerm: [""],
  botPerm: [""]
};

exports.help = {
  name: "flip",
  category: "Fun",
  description: "Flip a coin",
  usage: "flip",
  param: ""
};

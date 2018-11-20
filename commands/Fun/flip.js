exports.run = function(bot, message, args) {
  const coins = ["Heads", "Tails", "Try again!"].random();
  message.channel.send(coins);
};

exports.conf = {
  aliases: ["flipcoin", "flipcoins", "flips"],
  cooldown: 3,
  guildOnly: false
};

exports.help = {
  name: "flip",
  category: "Fun",
  description: "Should i go...? Or nah....? I'll just flip a coin!",
  usage: "flip",
  param: "",
  aliases: "flipcoin, flipcoins, flips"
};
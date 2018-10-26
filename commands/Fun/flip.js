const coins = ["Heads", "Tails", "Try again!"];

exports.run = function(bot, message, args) {
  const flipped = coins.random();
  message.channel.send(flipped);
  delete require.cache[require.resolve('./flip.js')];
};

exports.conf = {
  aliases: ["flipcoin", "flipcoins", "flips"],
  cooldown: 3
};

exports.help = {
  name: "flip",
  category: "Fun",
  description: "Should i go...? Or nah....? I'll just flip a coin!",
  usage: "flip",
  param: "",
  aliases: "flipcoin, flipcoins, flips"
};
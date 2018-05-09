const coins = ["Heads", "Tails", "Try again!"];
const flipped = coins[Math.floor(Math.random() * coins.length)];
exports.run = function(bot, message, args) {
  message.channel.send(flipped);
  delete require.cache[require.resolve('./flip.js')];
};
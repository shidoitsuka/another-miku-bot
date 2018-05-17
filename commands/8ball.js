const config = require('../config.json');
const answers = [
  "Try again later (〜￣▽￣)〜",
  "I-i don't know (UwU)",
  // positives
  "Yessu!",
  "Of course! OwO)-b",
  "Seems like a yes \`(OwO)\`",
  "Errr yes, probably?",
  // negatives
  "No",
  "Nyuu, Baka! >w<",
  "Don't count on it ƪ(˘⌣˘)ʃ",
  "I haven't been programmed to know that yet (⌯˃̶᷄ ﹏ ˂̶᷄⌯)ﾟ"
];
exports.run = function(bot, message, args) {
  const ebans = answers.random();
  if (!args[0]) {
    message.channel.send(":question::question::question::question::question:");
  } else {
    message.channel.send(ebans);
  }
  // delete cache
  delete require.cache[require.resolve('./8ball.js')];
};

exports.conf = {
  aliases: ["8b"]
};

exports.help = {
  name: "8ball",
  category: "Fun",
  description: "The power of the \`Magic 8ball!\`.",
  usage: "8ball \`<question>\`",
  param: "",
  aliases: "8b"
};
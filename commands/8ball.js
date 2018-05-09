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
const ebans = answers[Math.floor(Math.random() * answers.length)];
const config = require('../config.json');
exports.run = function(bot, message, args) {
  var msg = message.content.slice();

  // if theres no "?"
  if (!msg.match(/\?/g)) {
    message.channel.send("Can you like... Ask something? :no_mouth:").then(msg =>
      msg.edit("Use :question:", 5000).catch(err => console.log(err.stack))
    );
  }

  // if theres "?"
  if (msg.match(/\?/g)) {
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
  description: "The power of the \`Magic 8ball!\`",
  usage: "8ball \`<question>\`?"
};
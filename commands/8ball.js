var answers = [
  "Try again later (〜￣▽￣)〜",
  "I-i don't know (UwU)",
  // positives
  "Yessu!",
  "Of course! OwO)-b",
  // negatives
  "No",
  "Nyuu, Baka! >w<",
  "Don't count on it ƪ(˘⌣˘)ʃ",
  "I haven't been programmed to know that yet (⌯˃̶᷄ ﹏ ˂̶᷄⌯)ﾟ"
];
var ebans = answers[Math.floor(Math.random() * answers.length)];
const config = require('../config.json');
exports.run = function(bot, message, args) {
  var msg = message.content.slice();
  if (!msg.match(/\?/g)) {
    message.channel.send("Can you like... Ask something? :no_mouth:").then(msg =>
      msg.edit("Use :question:.", 5000).catch(err => console.log(err.stack))
      );
  }
  if (msg.match(/\?/g)) {
    message.channel.send(ebans);
  }
  delete require.cache[require.resolve('./8ball.js')];
};

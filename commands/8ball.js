var egb = ["No", "Don't count on it", "Try again later", "Yes", "Of course", "Yup", "I don't know"];
var ebans = egb[Math.floor(Math.random() * egb.length)];
const config = require('../config.json');
exports.run = function(bot, message, args) {
  var msg = message.content.slice();
  if (!msg.match(/\?/g)) {
    message.channel.send("Can you like... Ask something? :no_mouth:").then(msg =>
      msg.edit("Use :question:")
      );
  }
  if (msg.match(/\?/g)) {
    message.channel.send(ebans);
  }
  delete require.cache[require.resolve('./8ball.js')];
};

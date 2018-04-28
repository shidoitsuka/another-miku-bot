  const math = require('math.js');
exports.run = function(bot, message, args) {
  var msg = message.content.slice();
  var txt = message.content.slice(6);
    message.channel.send(math.eval(txt));
};

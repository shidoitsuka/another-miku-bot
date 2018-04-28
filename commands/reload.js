const main = require('../index.js');
const config = require('../config.json');
exports.run = function(bot, message, args) {
  if (message.author.id != config.ownerID) {
    message.channel.send("You are not my owner!");
  }
  else {
  let cmd = args.join(' ');
  main.reload(message, cmd);
}
};

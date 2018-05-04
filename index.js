const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');
const math = require('mathjs');
require('./util/eventLoader.js')(bot);

var reload = (message, cmd) => {
  var msg = message.content.slice(6);
  if (msg.length < 2) {
    message.channel.send("Command not found.");
  }
  else if (msg.length > 0){
  delete require.cache[require.resolve('./commands/' + cmd)];
  try {
    let cmdFile = require('./commands/' + cmd);
  } catch (e) {
    message.channel.send(`Error loading \`${cmd}\`: ${e.name}`).then(
      response => response.delete(1000).catch(err => console.log(err.stack))
    ).catch(err => console.log(err.stack));
  }
  message.channel.send(`\`${cmd}\` reloaded.`).then(
    response => response.delete(1000).catch(err => console.log(err.stack))
  ).catch(err => console.log(err.stack));
};
}

exports.reload = reload;
bot.login(config.token);

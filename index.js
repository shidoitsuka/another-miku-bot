const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const Enmap = require('enmap');
const chalk = require('chalk');
const walker = require('walker');
var talkedRecently = JSON.parse(fs.readFileSync('./assets/cooldowns.json', 'utf8'));
require('./util/eventLoader.js')(bot);
require('./modules/function.js')(bot);

// RELOAD
var reload = (message, cmd) => {
  var msg = message.content.slice(6);
  if (msg.length < 2) {
    message.channel.send("Please includes the command\'s name.");
  } else if (msg.length > 0) {
    delete require.cache[require.resolve('./commands/' + cmd)];
    try {
      let cmdFile = require('./commands/' + cmd);
    } catch (e) {
      message.channel.send(`Error loading \`${cmd}\`: ${e.name}`).catch(err => console.log(err.stack));
    }
    message.channel.send(`\`${cmd}\` reloaded.`).then(
      response => response.delete(1000).catch(err => console.log(err.stack))
    ).catch(err => console.log(err.stack));
  };
}

bot.config = require('./config.json');
bot.commands = new Enmap();
bot.aliases = new Enmap();
bot.cdTime = new Enmap();

// INITIALIZATION
const init = async () => {
  const folder = walker(`./commands/`)
    .on('file', (file) => {
      // if (!f.endsWith('.js')) return;
      let response = bot.loadCommand(file);
      if (response) console.log(response);
    });
};

// CLEAN USER COOLDOWNS
talkedRecently = {};
fs.writeFile('./assets/cooldowns.json', JSON.stringify(talkedRecently), (err) => {
  if (err) console.log(err);
});

exports.reload = reload;
init();
bot.login(bot.config.token);
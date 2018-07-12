const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const {
  promisify
} = require('util');
const readdir = promisify(fs.readdir);
const Enmap = require('enmap');
const EnmapLevel = require('enmap-level');
const nekoclient = require('nekos.life');
const chalk = require('chalk');
const neko = new nekoclient();
// let welcome = fs.readFileSync("./util/welcome.json", "utf8");
// let goodbye = fs.readFileSync("./util/goodbye.json", "utf8");
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
bot.settings = new Enmap({
  provider: new EnmapLevel({
    name: "settings"
  })
});

bot.on('guildMemberAdd', member => {});

bot.on('guildMemberRemove', member => {});

// INITIALIZATION
const init = async () => {
  const cmdFiles = await readdir('./commands/');
  cmdFiles.forEach(f => {
    if (!f.endsWith('.js')) return;
    let response = bot.loadCommand(f);
    if (response) console.log(response);
  });
  cmdFiles.forEach(f => {
    if (!f.endsWith('.js')) return;
    let response = bot.loadCooldown(f);
    if (response) console.log(response);
  });
};

exports.reload = reload;
init();
bot.login(bot.config.token);
const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');
const math = require('mathjs');
const chalk = require('chalk');
const Enmap = require("enmap");
const EnmapLevel = require("enmap-level");
const {
  promisify
} = require("util");
const readdir = promisify(require("fs").readdir);
require('./util/eventLoader.js')(bot);

// COMMANDS & ALIASES
bot.commands = new Enmap();
bot.aliases = new Enmap();

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

// bot.elevation = function(msg) {
//   let permlvl = 0;
//   let mod_role = msg.guild.roles.find('name', 'Moderator');
//   if (mod_role && msg.member.roles.has(mode_role.id)) permlvl = 2;
//   let admin_role = msg.guild.roles.find('name', 'Admin');
//   if (msg.author.id === config.ownerID) permlvl = 4;
//   return permlvl;
// };

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

bot.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

bot.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

// INITIALIZATION
const init = async () => {
  const cmdFiles = await readdir("./commands/");
  console.log(`Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
  });
};

exports.reload = reload;
init();
bot.login(config.token);
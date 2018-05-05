const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('../config.json');
const answers = [
    "(#^.^#)",
    "(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄",
    "(✿ꈍ。 ꈍ✿)",
    "(ؑ‷ᵕؑ̇‷)◞✧",
    "(灬ºωº灬)♡"
];
var theAnswer = answers[Math.floor(Math.random() * answers.length)];
const hello = [
    "H-hello",
    "H-hi",
    "M-my prefix is \`m\`",
    "Miku desu!",
    "I'm Here!",
    "Hi!"
];
var theHi = hello[Math.floor(Math.random() * hello.length)];
module.exports = message => {
    if (message.content == `<@${config.botID}>`) {
      // TODO: FIX THIS
        delete require.cache[require.resolve('./message.js')];
        message.channel.send(`${theHi} ${theAnswer}`);
    }
    if (!message.content.startsWith(config.prefix)) return;
    if (message.author.bot) return;
    const args = message.content.split(' ');
    const cmd = args.shift().slice(config.prefix.length).toLowerCase();

    try {
        // const command = bot.commands.get(command) || bot.commands.get(bot.aliases.get(command));
        var commands = require(`../commands/${cmd}`);
        commands.run(bot, message, args);
    } catch (e) {
        console.log(`Error: ${e.stack}`);
    }
};

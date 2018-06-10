const Discord = require('discord.js');
const config = require('../config.json');
const chalk = require('chalk');
const fs = require('fs');
const {
  promisify
} = require("util");
const readdir = promisify(fs.readdir);
let talkedRecently = JSON.parse(fs.readFileSync("./events/cooldowns.json", "utf8"));

// SPEAKS
const emojis = ["(#^.^#)", "(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄", "(✿ꈍ。 ꈍ✿)", "(ؑ‷ᵕؑ̇‷)◞✧", "(灬ºωº灬)♡"];
const hello = ["H-hello", "H-hi", "M-my prefix is \`m\`", "Miku desu!", "I'm Here!", "Hi!"];
const badWords = ["fuck", "shit", "bitch", "cunt"];

// START
module.exports = async function(message) {
  /**
   * To separate command and arguments
   * <prefix>example help
   * output=
   * command : example
   * argument : help
   **/
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // BAD WORDS DETECTOR
  if (badWords.some(word =>
      message.content.toLowerCase().includes(word))) {
    message.channel.send(`**${message.author.username}**, Watch your language.`).then(response => response.delete(1000));
  }
  // MENTION MIKU
  if (message.content.startsWith(`<@${config.botID}>`)) {
    const theEmoji = emojis.random();
    const theHi = hello.random();
    message.channel.send(`${theHi} ${theEmoji}`).then(
      delete require.cache[require.resolve('./message.js')]
    );
  }
  if (message.content.startsWith(`<@!${config.botID}>`)) {
    const theEmoji = emojis.random();
    const theHi = hello.random();
    message.channel.send(`${theHi} ${theEmoji}`).then(
      delete require.cache[require.resolve('./message.js')]
    );
  }

  // IF (!PREFIX) || BOT
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  let bot = message.client;
  let cmd;
  if (bot.commands.has(command)) {
    cmd = bot.commands.get(command);
  } else if (bot.aliases.has(command)) {
    cmd = bot.commands.get(bot.aliases.get(command));
  }
  // IF (!command)
  if (!cmd) return;
  // RUN COMMAND/ALIASES
  if (cmd) {
    try {
      // VARIABLES
      let theCmd, find, cd;
      if (bot.commands.has(command)) {
        find = bot.commands.get(command); // find the command
        theCmd = find.help.name; // find command's name
        cd = find.conf.cooldown * 1000; // find the cooldown and then make it second
      } else if (bot.aliases.has(command)) {
        find = bot.commands.get(bot.aliases.get(command));
        theCmd = find.help.name;
        cd = find.conf.cooldown * 1000;
      }
      const cooldowns = [`O//w//O I-I-I\'m Getting Dizzy!\n_(cooling down)_`,
        `Can you like.... **wait** for few seconds? UwU`,
        `**${message.author.username}**-kun, **please wait** UwU`,
        `I-I-It\'ts not like I\'m on **cooldown** or something, b-b-baka! >///<`
      ].random();
      try {
        /** this will return error for the first time, because userID : 'command' is
         * not yet defined while no commands are on cooldown so i did some tricky stuff.
         **/
        if (talkedRecently[message.author.id].includes(theCmd)) return message.channel.send(cooldowns).then(m => m.delete(3000));
        /** since it's undefined, that means error.
         * so i throw error to trigger the catch (e) to run the code
         * then push it to talkedRecently. Sounds tricky, isn't it? damn.
         **/
        if (talkedRecently[message.author.id].theCmd == undefined) throw Error();
      } catch (e) {
        cmd.run(bot, message, args); // run the command
        if (!talkedRecently[message.author.id]) talkedRecently[message.author.id] = []; // if talkedRecently does not contain userID, define it
        talkedRecently[message.author.id].push(theCmd); // then push the command used into it
        setTimeout(() => {
          let cmdIndex = talkedRecently[message.author.id].indexOf(theCmd); // define cmd Index because i'm using splice to remove the command's cooldown
          talkedRecently[message.author.id].splice(cmdIndex, 1); // remove the cooldown
          fs.writeFile('./events/cooldowns.json', JSON.stringify(talkedRecently), (err) => {
            if (err) console.log(err);
          });
        }, cd);
        fs.writeFile('./events/cooldowns.json', JSON.stringify(talkedRecently), (err) => {
          if (err) console.log(err);
        });
      }
    } catch (e) {
      console.log(chalk.red(`Error: ${e.stack}`));
      message.react("❌");
    }
  }
};
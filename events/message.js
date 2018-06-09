const Discord = require('discord.js');
const config = require('../config.json');
const chalk = require('chalk');
const fs = require('fs');
const {
  promisify
} = require("util");
const readdir = promisify(fs.readdir);
let talkedRecently = new Set();

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
      // IF IT'S **NOT** ALIASES
      if (bot.commands.has(command)) {
        find = bot.commands.get(command); // FIND THE COMMAND
        theCmd = find.help.name; // FIND THE COMMAND NAME TO STORE TO THE ARRAY OF SETS LATER
        cd = find.conf.cooldown * 1000; // FIND THE COMMAND'S COOLDOWN TIME AND THEN MULTIPLY BY 1000 (because setTimeout uses ms instead of s)
      }
      // IF IT'S ALIASES
      else if (bot.aliases.has(command)) {
        // EXACTLY THE SAME AS **NOT** ALIASES
        find = bot.commands.get(bot.aliases.get(command));
        theCmd = find.help.name;
        cd = find.conf.cooldown * 1000;
      }
      /**
       * cmdCD should look **something** like this when someones running command/aliases :
       * talkedRecently = {
       *   "user1": [
       *     "commandused",
       *     "anothercommandused"
       *   ],
       *   "user2": [
       *     "command used",
       *     "command used number two"
       *   ]
       * }
       * P.S: I'm not sure though, but that's what i imagine while making this cooldown, LOL.
       **/
      const cmdCD = talkedRecently[message.author.id] = theCmd;
      const cooldowns = ["O///O I-I-I\'m Getting Dizzy!", "Can you like.... **wait** for few seconds?", "Please wait.", "_Cooling Down_..."].random();
      /**
       * IF talkedRecently **CONTAINS** <userID> **PLUS** <commandUsedByUser>
       * return
       **/
      if (talkedRecently.has(cmdCD)) return message.channel.send(cooldowns).then(m => m.delete(3000));
      cmd.run(bot, message, args); // RUN THE COMMAND
      talkedRecently.add(cmdCD); // AFTER RUNNING THE COMMAND, ADD THE USER TO talkedRecently.
      /**
       * DELETE USER FROM talkedRecently
       * AFTER (variable cd)
       * example : if user uses ping (1s cooldown)
       * user will deleted from talkedRecently after 1s (including the ping, obviously because user uses ping)
       * and IF user uses about (7s cooldown)
       * user will deleted after 7s.
       **/
      setTimeout(() => {
        talkedRecently.delete(cmdCD);
      }, cd);
    } catch (e) {
      console.log(chalk.red(`Error: ${e.stack}`));
      message.react("❌");
    }
  }
};
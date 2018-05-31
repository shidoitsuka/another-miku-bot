const Discord = require('discord.js');
const config = require('../config.json');
const chalk = require('chalk');
const fs = require('fs');
const {
  promisify
} = require("util");
const readdir = promisify(fs.readdir);

// SPEAKS
const emojis = ["(#^.^#)", "(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄", "(✿ꈍ。 ꈍ✿)", "(ؑ‷ᵕؑ̇‷)◞✧", "(灬ºωº灬)♡"];
const hello = ["H-hello", "H-hi", "M-my prefix is \`m\`", "Miku desu!", "I'm Here!", "Hi!"];
const badWords = ["fuck", "shit", "bitch"];
const sucks = ["usak", "usuk", "u sak", "u suk", "usuck"];
const moms = ["u mom", "ur mom", "your mom", "umom", "urmom", "yourmom"];

// START
module.exports = async function(message) {
  // IF INCLUDES OWNER ID
  if (message.content.includes(config.ownerID)) {
    if (message.author.bot) return;
    if (message.content.includes("say")) return;
    const embed = new Discord.RichEmbed()
      .setAuthor("Miku")
      .setColor(0x1a9ca8)
      .setImage("https://tinyurl.com/DiscordPinged")
      .setDescription(`Don\'t ping **Brian**, please! UwU`);
    message.channel.send({
      embed
    }).then(response => response.delete(3500));
    // message.channel.send(`\`${message.author.username}\`, Brian is sleeping right now.\nTry again later.`).then(response => response.delete(10000));
  }
  if (message.content.includes(config.babeID)) {
    if (message.author.bot) return;
    if (message.content.includes("say")) return;
    const embed = new Discord.RichEmbed()
      .setAuthor("Miku")
      .setColor(0x1a9ca8)
      .setDescription(`ping me i knock your dick off 1v1 me slut`)
      .setFooter("-Aere");
    message.channel.send({
      embed
    }).then(response => response.delete(3500));
  }

  // UR MOM DETECTOR
  if (moms.some(word =>
      message.content.toLowerCase().includes(word))) {
    message.react("🇬");
    await sleep(500);
    message.react("🇦");
    await sleep(1000);
    message.react("🇾");
  }
  // BAD WORDS DETECTOR
  if (badWords.some(word =>
      message.content.toLowerCase().includes(word))) {
    message.channel.send(`**${message.author.username}**, Watch your language.`).then(response => response.delete(1000));
  }
  // SUCK DETECTOR
  if (sucks.some(word =>
      message.content.toLowerCase().includes(word))) {
    message.react("🇳");
    await sleep(500);
    message.react("🇴");
    await sleep(500);
    message.react("🇺");
  }
  // MENTION MIKU
  if (message.content.startsWith(`<@${config.botID}>`)) {
    const theEmoji = emojis.random();
    const theHi = hello.random();
    message.channel.send(`${theHi} ${theEmoji}`).then(
      delete require.cache[require.resolve('./message.js')]
    );
  }

  // IF (!PREFIX) || BOT
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  /**
   * To separate command and arguments
   * <prefix>example help
   * output=
   * command : example
   * argument : help
   **/
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

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
      cmd.run(bot, message, args);
    } catch (e) {
      console.log(chalk.red(`Error: ${e.stack}`));
      message.react("❌");
    }
  }
};
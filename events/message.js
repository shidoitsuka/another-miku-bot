const Discord = require('discord.js');
const config = require('../config.json');
const chalk = require('chalk');
const fs = require('fs');
const {
  promisify
} = require('util');
const readdir = promisify(fs.readdir);
let talkedRecently = JSON.parse(fs.readFileSync('./assets/cooldowns.json', 'utf8'));
let totalCommands = JSON.parse(fs.readFileSync('./assets/totalCmd.json', 'utf8'));

// START
module.exports = async function(message) {
  if (message.channel.type == "dm") return;
  /**
   * To separate command and arguments
   * <prefix>example help
   * output=
   * command : example
   * argument : help
   **/
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // PREFIX DATA
  let prefixes = JSON.parse(fs.readFileSync('./assets/prefixes.json', 'utf8'));
  // SPEAKS
  const emojis = ["(#^ω^#)", "(✿ꈍ。 ꈍ✿)", "(ؑ‷ᵕؑ̇‷)◞✧", "(灬ºωº灬)♡", "(UωU)", "(OωO)", "(O///ω///O)", "(U///ω///U)"],
    hello = [`M-my prefix is \`${prefixes[message.guild.id]}\``, "Miku desu!", "Hi!"],
    badWords = ["fuck", "shit", "bitch", "cunt"],
    afkBack = [`Welcome Back **${message.author.username}**!`,
      `Hi again! I\'ve turned off your AFK mode, **${message.author.username}**`,
      `Okaerinasai, **${message.author.username}**! (UωU)`,
      `I-I-It\'s not like I\'m happy because you\'re back, b-b-baka **${message.author.username}**!`,
      `I-It\'s not like I wanted to greet you because you just came back, baka!`
    ].random(),
    afkSaid = [
      "They said: ",
      "If I remember it correctly, they said: ",
      "They told me to say: "
    ].random();

  // DEFAULT PREFIX
  if (!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = config.prefix;
    fs.writeFile('./assets/prefixes.json', JSON.stringify(prefixes), (err) => {
      if (err) console.log(err);
    });
  }

  // AFK DATA
  let AFKdata = JSON.parse(fs.readFileSync('./assets/afk.json', 'utf8'));

  // COME BACK FROM AFK
  if (message.author.id in AFKdata && command !== "afk") {
    delete AFKdata[message.author.id];
    fs.writeFile('./assets/afk.json', JSON.stringify(AFKdata), (err) => {
      if (err) console.log(err);
    });
    embed.setAuthor("User AFK");
    embed.setColor("#1a9ca8");
    embed.setDescription(afkBack);
    embed.setFooter("You are no longer in AFK mode.");
    message.channel.send({
      embed
    });
  }

  // AFK - MENTIONED
  // VARIABLES
  /*
   * what i'm trying to do is
   * check if the message contains mentioned users
   * then check if the mentioned users itself is "in the AFKdata"
   * this AFKcheck function will return boolean
   */
  var AFKcheck = user => {
    return user.id in AFKdata;
  }

  // this one will filter the mentioned users
  const AFKandMentioned = message.mentions.users.filter(AFKcheck);
  // WHEN SOMEONE IS MENTIONED AND THE MENTIONED IS AFK (TRUE)
  if (AFKandMentioned.size) {
    // get the mentioned & afk user's reason
    var reason = AFKandMentioned.map(user => {
      return AFKdata[user.id];
    });
    embed.setAuthor("User AFK");
    embed.setColor("#1a9ca8");
    embed.setDescription(`${afkSaid}\n\`\`\`${reason}\`\`\``);
    embed.setFooter(`${message.author.username}, they are AFK at the moment, please try again later!.`)
    message.channel.send({
      embed
    });
  }

  // BAD WORDS DETECTOR
  // if (badWords.some(word =>
  //     message.content.toLowerCase().includes(word))) {
  //   // if (message.guild.id == "332144661751922688") return;
  //   message.channel.send(`**${message.author.username}**, Watch your language.`).then(response => response.delete(1000));
  // }

  // MENTION MIKU
  if (message.content.startsWith(`<@${config.botID}>`) || message.content.startsWith(`<@!${config.botID}>`)) {
    const theEmoji = emojis.random();
    const theHi = hello.random();
    message.channel.send(`${theHi} ${theEmoji}`);
  }

  // IF NOT STARTED WITH PREFIX OR ITS A BOT, RETURN
  if ((!message.content.startsWith(prefixes[message.guild.id]) && !message.content.startsWith(config.prefix)) || message.author.bot) return;

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
        `I-I-It\'ts not like I\'m on **cooldown** or something, b-b-baka! >///<`,
        `Cooling down UwU`,
        `Just a 'lil bit more, **${message.author.username}**`
      ].random();
      try {
        /** this will return error for the first time, because userID : 'command' is
         * not yet defined while no commands are on cooldown so i did some tricky stuff.
         **/
        if (talkedRecently[message.author.id].includes(theCmd)) return message.channel.send(cooldowns); //.then(m => m.delete(3000));
        /** since it's undefined, that means error.
         * so i throw error to trigger the catch (e) to run the code
         * then push it to talkedRecently. Sounds tricky, isn't it? damn.
         **/
        if (talkedRecently[message.author.id].theCmd == undefined) throw Error();
      } catch (e) {
        cmd.run(bot, message, args); // run the command
        console.log(`${message.author.tag} just ran ${command} ${args.join(" ")}`);
        if (!totalCommands) totalCommands = {
          total: 0
        }
        const total = totalCommands.total + 1;
        totalCommands = {
          total: total
        }
        fs.writeFile('./assets/totalCmd.json', JSON.stringify(totalCommands), (err) => {
          if (err) console.log(err.stack)
        });
        if (!talkedRecently[message.author.id]) talkedRecently[message.author.id] = []; // if talkedRecently does not contain userID, define it
        talkedRecently[message.author.id].push(theCmd); // then push the command used into it
        setTimeout(() => {
          let cmdIndex = talkedRecently[message.author.id].indexOf(theCmd); // define cmd Index because i'm using splice to remove the command's cooldown
          talkedRecently[message.author.id].splice(cmdIndex, 1); // remove the cooldown
          fs.writeFile('./assets/cooldowns.json', JSON.stringify(talkedRecently), (err) => {
            if (err) console.log(err);
          });
        }, cd);
        fs.writeFile('./assets/cooldowns.json', JSON.stringify(talkedRecently), (err) => {
          if (err) console.log(err);
        });
      }
    } catch (e) {
      console.log(chalk.red(`Error: ${e.stack}`));
      message.react("❌");
    }
  }
};
const Discord = require('discord.js');
const embed = new Discord.RichEmbed();
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
  // JSON's DATA
  let prefixes = JSON.parse(fs.readFileSync('./assets/prefixes.json', 'utf8'));
  let AFKdata = JSON.parse(fs.readFileSync('./assets/afk.json', 'utf8'));

  /**
   * To separate command and arguments
   * <prefix>example help
   * output=
   * command : example
   * argument : help
   **/
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const prefix = config.prefix || prefixes[message.guild.id];
  let bot = message.client;
  let cmd;

  /* AFK */
  // COME BACK FROM AFK
  if (message.author.id in AFKdata && command !== "afk") {
    // when you came back from AFK
    const afkBack = [`Welcome Back **${message.author.username}**!`, `Hi again! I\'ve turned off your AFK mode, **${message.author.username}**`, `Okaerinasai, **${message.author.username}**! (UωU)`, `I-I-It\'s not like I\'m happy because you\'re back, b-b-baka **${message.author.username}**!`, `I-It\'s not like I wanted to greet you because you just came back, baka!`].random();

    delete AFKdata[message.author.id];
    fs.writeFile('./assets/afk.json', JSON.stringify(AFKdata), (err) => {
      if (err) console.log(err);
    });
    embed.setAuthor("User AFK").setColor("#1a9ca8").setDescription(afkBack).setFooter("You are no longer in AFK mode.");
    message.channel.send({
      embed
    });
  }

  // AFK - MENTIONED
  /*
   * what i'm trying to do is
   * check if the message contains mentioned users
   * then check if the mentioned users itself is "in the AFKdata"
   * this AFKcheck function will return boolean
   */

  // this one will filter the mentioned users
  const AFKandMentioned = message.mentions.users.filter(user => {
    return user.id in AFKdata;
  });
  // WHEN SOMEONE IS MENTIONED AND THE MENTIONED AFK IS TRUE
  if (AFKandMentioned.size) {
    // get the mentioned & afk user's reason
    const reason = AFKandMentioned.map(user => {
      return AFKdata[user.id];
    });

    // miku tryna remember what was your reason
    const afkSaid = ["They said: ", "If I remember it correctly, they said: ", "They told me to say: "].random();
    embed.setAuthor("User AFK").setColor("#1a9ca8").setDescription(`${afkSaid}\n\`\`\`${reason}\`\`\``).setFooter(`${message.author.username}, they are AFK at the moment, please try again later!.`);
    message.channel.send({
      embed
    });
  }
  /* end-AFK */

  // BAD WORDS DETECTOR
  // if (badWords.some(word =>
  //     message.content.toLowerCase().includes(word))) {
  //   message.channel.send(`**${message.author.username}**, Watch your language.`).then(response => response.delete(1000));
  // }

  /* IF ITS NOT A DM */
  if (message.channel.type != "dm") {
    /* ALL OF THE SPEAKINGS (GUILD ONLY) */
    // emojis
    const emojis = ["(#^ω^#)", "(✿ꈍ。 ꈍ✿)", "(ؑ‷ᵕؑ̇‷)◞✧", "(灬ºωº灬)♡", "(UωU)", "(OωO)", "(O///ω///O)", "(U///ω///U)"].random(),

      // when miku is mentioned
      hello = [`M-my prefix is \`${prefixes[message.guild.id]}\``, "Miku desu!", "Hi!"].random(),

      // bad words - UNRELEASED
      badWords = ["fuck", "shit", "bitch", "cunt"],

      // what miku will say if you're on cooldown
      cooldowns = [`O//w//O I-I-I\'m Getting Dizzy!\n_(cooling down)_`, `Can you like.... **wait** for few seconds? UwU`, `**${message.author.username}**-kun, **please wait** UwU`, `I-I-It\'ts not like I\'m on **cooldown** or something, b-b-baka! >///<`, `Cooling down UwU`, `Just a 'lil bit more, **${message.author.username}**`].random();

    // MAKE A DEFAULT PREFIX
    if (!prefixes[message.guild.id]) {
      prefixes[message.guild.id] = config.prefix;
      fs.writeFile('./assets/prefixes.json', JSON.stringify(prefixes), (err) => {
        if (err) console.log(err);
      });
    }

    // what to do when miku is mentioned
    if (message.content.startsWith(`<@${config.botID}>`) || message.content.startsWith(`<@!${config.botID}>`)) {
      message.channel.send(`${hello} ${emojis}`);
    }
    // if it does not starts with guild's custom prefix or default prefix or it's a bot, do nothing
    if ((!message.content.startsWith(prefixes[message.guild.id]) && !message.content.startsWith(config.prefix)) || message.author.bot) return;
  } else if (message.channel.type == "dm") {
    if (bot.commandsConf.get(command)) return message.channel.send("You cannot run that command in a DM!");
    if (!message.content.startsWith(config.prefix)) return;
  }
  /* end-IF ITS NOT A DM */

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

      try {
        /** this will return error for the first time, because userID : 'command' is
         * not yet defined while no commands are on cooldown so i did some tricky stuff.
         **/
        if (talkedRecently[message.author.id].includes(theCmd)) return message.channel.send(cooldowns);
        /** since it's undefined, that means error.
         * so i throw error to trigger the catch (e) to run the code
         * then push it to talkedRecently. Sounds tricky, isn't it? damn.
         **/
        if (talkedRecently[message.author.id].theCmd == undefined) throw Error();
      } catch (e) {
        // run the command
        cmd.run(bot, message, args, prefix);
        // if it's not from a DM, log it
        if (message.channel.type != "dm") {
          // this one is the log message structure
          const ran = `${message.author.tag}  ::  ${message.author.id}
=====================================
command ran : ${command}
content     : ${args.join(" ")}
guild name  : ${message.guild.name}
guild ID    : ${message.guild.id}
=====================================\n`;
          console.log(ran);
        }

        // +1 total commands ran
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
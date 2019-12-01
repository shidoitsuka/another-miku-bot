const Discord = require("discord.js");
const {
  config
} = require("../config.js");
const chalk = require("chalk");
const fs = require("fs");

// START
module.exports = message => {
  if (message.channel.type == "dm") return;
  const embed = new Discord.MessageEmbed();
  // JSON DATA
  let DB = readFile("./assets/guildDB");
  if (DB[message.guild.id] == undefined) {
    DB[message.guild.id] = {
      prefix: "q",
      greetingChannel: "",
      tag: {},
      star: {
        starChannel: "",
        used: []
      }
    };
    writeFile("./assets/guildDB", DB);
  }
  let AFKdata = readFile("./assets/afk");
  let talkedRecently = readFile("./assets/cooldowns");
  let totalCommands = readFile("./assets/totalCmd");

  /**
   * To separate command and arguments
   * <prefix>example help
   * output=
   * command : example
   * argument : help
   **/
  const args = message.content
    .slice(config.prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  const prefix = config.prefix || DB[message.guild.id].prefix;
  let bot = message.client;
  let cmd;

  /* AFK */
  // COME BACK FROM AFK
  if (message.author.id in AFKdata && command !== "afk") {
    // when you came back from AFK
    const afkBack = [
      `Welcome Back **${message.author.username}**!`,
      `Hi again! I\'ve turned off your AFK mode, **${message.author.username}**`,
      `Okaerinasai, **${message.author.username}**! (UωU)`,
      `I-I-It\'s not like I\'m happy because you\'re back, b-b-baka **${message.author.username}**!`,
      `I-It\'s not like I wanted to greet you because you just came back, baka!`
    ].random();

    delete AFKdata[message.author.id];
    writeFile("./assets/afk", AFKdata);

    embed
      .setAuthor("User AFK")
      .setColor("#1a9ca8")
      .setDescription(afkBack)
      .setFooter("You are no longer in AFK mode.");
    message.channel.send({ embed });
  }

  // AFK - MENTIONED
  /*
   * what i'm trying to do is
   * check if the message contains mentioned users
   * then check if the mentioned users itself is "in the AFKdata"
   * this AFKcheck function will return boolean
   */

  // this one will filter the mentioned users
  const AFKandMentioned = message.mentions.users.filter(user => user.id in AFKdata);
  // WHEN SOMEONE IS MENTIONED AND THE MENTIONED AFK IS TRUE
  if (AFKandMentioned.size) {
    // get the mentioned & afk user's reason
    const reason = AFKandMentioned.map(user => AFKdata[user.id]});

    // miku tryna remember whats your reason
    const afkSaid = [
      "They said: ",
      "If I remember it correctly, they said: ",
      "They told me to say: "
    ].random();
    embed
      .setAuthor("User AFK")
      .setColor("#1a9ca8")
      .setDescription(`${afkSaid}\n\`\`\`${reason}\`\`\``)
      .setFooter(`${message.author.username}, they are AFK at the moment. Please try again later!.`);
    message.channel.send({ embed });
  }
  /* end-AFK */

  /* IF ITS NOT A DM */
  if (message.channel.type != "dm") {
    /* ALL OF THE SPEAKINGS (GUILD ONLY) */
    // emojis
    const emojis = [
      "(#^ω^#)",
      "(✿ꈍ。 ꈍ✿)",
      "(ؑ‷ᵕؑ̇‷)◞✧",
      "(灬ºωº灬)♡",
      "(UωU)",
      "(OωO)",
      "(O///ω///O)",
      "(U///ω///U)"
    ].random();
    // when miku is mentioned
    const hello = [
      `M-my prefix is \`${DB[message.guild.id].prefix}\``,
      "Miku desu!",
      "Hi!"
    ].random();

    // what to do when miku is mentioned
    if (message.content.startsWith(`<@${config.botID}>`) || message.content.startsWith(`<@!${config.botID}>`)) message.channel.send(`${hello} ${emojis}`);
    // if it does not starts with guild's custom prefix or default prefix or it's a bot, do nothing
    if ((!message.content.startsWith(DB[message.guild.id].prefix) && !message.content.startsWith(config.prefix)) || message.author.bot) return;
  } else if (message.channel.type == "dm") {
    if (bot.commandsConf.get(command)) return message.channel.send("You cannot run that command in a DM!");
    if (!message.content.startsWith(config.prefix)) return;
  }
  /* end-IF ITS NOT A DM */

  // define cmd if bot has the command that user ran
  if (bot.commands.has(command)) {
    cmd = bot.commands.get(command);
  } else if (bot.aliases.has(command)) {
    cmd = bot.commands.get(bot.aliases.get(command));
  }
  // IF (!command)
  if (!cmd) return;
  // RUN COMMAND/ALIASES
  try {
    // VARIABLES
    let theCmd, find, cd, userperm, botperm;
    if (bot.commands.has(command)) {
      find = bot.commands.get(command); // find the command
      theCmd = find.help.name; // find command's name
      cd = find.conf.cooldown * 1000; // find the cooldown and then make it second
      userperm = find.conf.userPerm;
      botperm = find.conf.botPerm;
      userperm[0].length == 0 ? (userperm = "SEND_MESSAGES") : "";
      botperm[0].length == 0 ? (botperm = "SEND_MESSAGES") : "";
    } else if (bot.aliases.has(command)) {
      find = bot.commands.get(bot.aliases.get(command));
      theCmd = find.help.name;
      cd = find.conf.cooldown * 1000;
      userperm = find.conf.userPerm;
      botperm = find.conf.botPerm;
      userperm[0].length == 0 ? (userperm = "SEND_MESSAGES") : "";
      botperm[0].length == 0 ? (botperm = "SEND_MESSAGES") : "";
    }

    // if miku has no permission to send
    if (!message.guild.me.hasPermission("SEND_MESSAGES")) return;
    // if user has no permission for specific command
    if (!message.member.hasPermission(userperm) || !message.channel.permissionsFor(message.member).has(userperm)) return message.channel.send(`❌ | You don't have any right to run that command!\n_missing ${userperm} permission(s)_`);
    // if miku has no permission for specific command
    if (!message.guild.me.hasPermission(botperm) || !message.channel.permissionsFor(bot.user).has(botperm)) return message.channel.send(`❌ | Lacks one or more of these permission(s) : \`${botperm.join(", ")}\``);

    // what miku will say if you're on cooldown
    const cooldowns = [
      `O//w//O I-I-I\'m Getting Dizzy!\n_(cooling down)_`,
      `Can you like.... **wait** for few seconds? UwU`,
      `**${message.author.username}**-kun, **please wait** UwU`,
      `I-I-It\'ts not like I\'m on **cooldown** or something, b-b-baka! >///<`,
      `Cooling down UwU`,
      `Just a 'lil bit more, **${message.author.username}**`
    ].random();
    try {
      // if user has already run the command, tell them to wait
      if (talkedRecently[message.author.id].includes(theCmd))
        return message.channel.send(cooldowns);
      // else, throw error to run the command
      else throw Error();
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
      totalCommands = { total: total };
      writeFile("./assets/totalCmd", totalCommands);

      if (!talkedRecently[message.author.id])
        talkedRecently[message.author.id] = []; // if talkedRecently does not contain userID, define it
      talkedRecently[message.author.id].push(theCmd); // then push the command used into it
      setTimeout(() => {
        let cmdIndex = talkedRecently[message.author.id].indexOf(theCmd); // define cmd Index because i'm using splice to remove the command's cooldown
        talkedRecently[message.author.id].splice(cmdIndex, 1); // remove the cooldown
        writeFile("./assets/cooldowns", talkedRecently);
      }, cd);
      writeFile("./assets/cooldowns", talkedRecently);
    }
  } catch (e) {
    console.log(chalk.red(`Error: ${e.stack}`));
    message.react("❌");
  }
};

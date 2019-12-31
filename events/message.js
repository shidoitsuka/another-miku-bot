const Discord = require("discord.js");
const { config } = require("../config.js");
const texts = require("../modules/texts.js");

module.exports = message => {
  const bot = message.client;
  // ignore DMs
  if (message.channel.type == "dm") return;
  // make a new embed
  const embed = new Discord.MessageEmbed();
  // if guild configuration doesn't exists, create a new one
  try {
    const checker = bot.db.get("guildConf", message.guild.id);
    if (checker == undefined) throw Error();
  } catch (_) {
    // prettier-ignore
    bot.db.set("guildConf", {
       prefix: "q",
       greetingChannel: null,
       tags: {},
       star: {
         starChannel: null,
         used: []
       }
     }, message.guild.id);
  }
  if (!bot.db.has("totalCommands")) bot.db.set("totalCommands", 0);
  if (!bot.db.has("cooldowns")) bot.db.set("cooldowns", {});
  if (!bot.db.has("afk")) bot.db.set("afk", {});

  /**
   * To separate command and arguments
   * <prefix>example help
   * output=
   * command : example
   * argument : help
   **/
  // prettier-ignore
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const prefix = config.prefix;
  let cmd;

  /* AFK */
  // if user is in afk state greet them
  // prettier-ignore
  if (bot.db.get("afk", `${message.author.id}.status`) && command !== "afk") {
    // set the afk status to false
    bot.db.set("afk", false, `${message.author.id}.status`);

    // let user know they are not AFK anymore. it needs EMBED_LINKS
    embed
      .setAuthor("User AFK")
      .setColor("#1a9ca8")
      .setDescription(texts.AFKWelcome(message))
      .setFooter("You are no longer in AFK mode.");
    message.channel.send({ embed });
  }

  // AFK - MENTIONED
  /*
   * check if the message contains mentioned users
   * then check if the mentioned users itself is "in the AFKdata"
   * this AFKcheck function will return boolean
   */

  // this one will filter the mentioned users
  // prettier-ignore
  const AFKandMentioned = message.mentions.users.filter(user => user.id in bot.db.get("afk") && bot.db.get('afk', `${user.id}.status`));
  // when someone is mentioned and they are in AFK state
  if (AFKandMentioned.size) {
    // get the mentioned & afk user's reason
    // prettier-ignore
    const AFKreason = AFKandMentioned.map(user => bot.db.get("afk", `${user.id}.reason`));

    // send the reason
    // prettier-ignore
    embed
    .setAuthor("User AFK")
    .setColor("#1a9ca8")
    .setDescription(`${texts.AFKMentioned()}\n\`\`\`${AFKreason}\`\`\``)
    .setFooter(`${message.author.username}, they are AFK at the moment. Please try again later!.`);
    message.channel.send({ embed });
  }
  /* end-AFK */

  // miku say hi when mentioned
  // prettier-ignore
  if (message.content.startsWith(`<@${config.botID}>`) || message.content.startsWith(`<@!${config.botID}>`)) message.channel.send(`${texts.MikuMentionedTexts(bot)} ${texts.MikuMentionedEmojis()}`);

  // if it does not starts with guild's custom prefix or default prefix or it's a bot, do nothing
  // prettier-ignore
  if ((!message.content.startsWith(bot.db.get("guildConf", `${message.guild.id}.prefix`)) && !message.content.startsWith(config.prefix)) || message.author.bot) return;

  // define cmd if bot has the command that user ran
  if (bot.commands.has(command)) cmd = bot.commands.get(command);
  // including aliases
  // prettier-ignore
  else if (bot.aliases.has(command)) cmd = bot.commands.get(bot.aliases.get(command));

  // if its not a command, ignore
  if (!cmd) return;

  let theCmd, find, cd, userperm, botperm;
  if (bot.commands.has(command)) {
    find = bot.commands.get(command); // find the command
    theCmd = find.help.name; // find command's name
    cd = find.conf.cooldown * 1000; // find the cooldown and then make it second
    userperm = find.conf.userPerm; // get required user's permission
    botperm = find.conf.botPerm; // get required miku's permission
    userperm[0].length == 0 ? (userperm = "SEND_MESSAGES") : ""; // if no specific permission is defined, define it into SEND_MESSAGES
    botperm[0].length == 0 ? (botperm = "SEND_MESSAGES") : ""; // if no specific permission is defined, define it into SEND_MESSAGES
  }
  // if user ran command using aliases, do the same
  else if (bot.aliases.has(command)) {
    find = bot.commands.get(bot.aliases.get(command));
    theCmd = find.help.name;
    cd = find.conf.cooldown * 1000;
    userperm = find.conf.userPerm;
    botperm = find.conf.botPerm;
    userperm[0].length == 0 ? (userperm = "SEND_MESSAGES") : "";
    botperm[0].length == 0 ? (botperm = "SEND_MESSAGES") : "";
  }

  // if miku lacks send permission, ignore
  if (!message.guild.me.hasPermission("SEND_MESSAGES")) return;
  // if user has no permission for specific command
  // prettier-ignore
  if (!message.member.hasPermission(userperm) || !message.channel.permissionsFor(message.member).has(userperm)) return message.channel.send(`❌ | You don't have any right to run that command!\n_missing ${userperm} permission(s)_`);
  // if miku has no permission for specific command
  // prettier-ignore
  if (!message.guild.me.hasPermission(botperm) || !message.channel.permissionsFor(bot.user).has(botperm)) return message.channel.send(`❌ | Lacks one or more of these permission(s) : \`${botperm.join(", ")}\``);

  // prettier-ignore
  if (!bot.db.has("cooldowns", message.author.id)) bot.db.set("cooldowns", [], message.author.id); // if talkedRecently does not contain userID, define it
  // if user has already run the command, tell them to wait
  // prettier-ignore
  if (bot.db.get("cooldowns")[message.author.id].includes(theCmd)) return message.channel.send(texts.CooldownTexts(message));
  // run the commands
  cmd.run(bot, message, args, prefix);
  bot.db.set("totalCommands", bot.db.get("totalCommands") + 1);
  // log it
  const ran = `${message.author.tag}  ::  ${message.author.id}
  =====================================
  command ran : ${command}
  content     : ${args.join(" ")}
  guild name  : ${message.guild.name}
  guild ID    : ${message.guild.id}
  =====================================\n`;
  console.log(ran);

  bot.db.push("cooldowns", theCmd, message.author.id); // then push the command used into it
  setTimeout(() => {
    bot.db.remove("cooldowns", theCmd, message.author.id); // remove the cooldown
  }, cd);
};

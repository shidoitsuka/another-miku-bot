const Discord = require('discord.js');
const fs = require('fs');
let file = JSON.parse(fs.readFileSync("./assets/log.json", "utf8"));

exports.run = (bot, message, args) => {
  if (message.author.id != "332424370272337923") return;
  if (!args[0]) return message.channel.send("Please includes the content to be logged. UwU");
  if (!file) {
    file = {
      number: 0
    }
  }
  const total = file.number + 1;
  file = {
    number: total
  }
  fs.writeFile('./assets/log.json', JSON.stringify(file), (err) => {
    if (err) console.log(err.stack)
  });
  const content = args.join(" ");
  const img = content.split("-img ");
  const date = new Date();
  const embed = new Discord.RichEmbed()
    .setAuthor(`Log #${file.number}`)
    .addField("Guild:", `${message.guild.name} (${message.guild.id})`, true)
    .addField("Channel:", `${message.channel.name} (${message.channel.id})`, true)
    .setFooter(`at ${date.getMonth()} / ${date.getDate()} / ${date.getFullYear()}`);
  if (args.join(" ").includes("-img")) {
    embed.setDescription(img[0]);
    embed.setImage(img[1]);
  } else {
    embed.addField("Content", content, true);
  }
  bot.channels.get("478099863364698112").send({
    embed
  }).catch((_) => message.channel.send("It seems like you\'re not giving valid format!"));
  message.channel.send("Logged!");
};

exports.conf = {
  aliases: [],
  cooldown: 1
};

exports.help = {
  name: "log",
  category: "**OWNER ONLY**",
  description: "",
  usage: "",
  param: "",
  aliases: ""
};
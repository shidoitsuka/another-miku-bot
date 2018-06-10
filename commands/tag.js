const Discord = require('discord.js');
const tags = require('./tag.json');
const fs = require('fs');
let tagFile = JSON.parse(fs.readFileSync("./commands/tag.json", "utf8"));

exports.run = async (bot, message, args) => {
  const embed = new Discord.RichEmbed()
    .setAuthor("Available Tags")
    .setColor(0xf5ab35)
    .setDescription(`\`\`\`${Object.keys(tags)}\`\`\``);
  if (!args[0]) return message.channel.send({
    embed
  });
  if (args[0] == '-add') {
    if (message.author.id != '332424370272337923') return message.channel.send("Invalid Permission(s).");
    const tagName = args[1];
    args.shift();
    args.shift();
    const toBeAdded = args.join(" ");
    tagFile[tagName] = toBeAdded;
    fs.writeFile('./commands/tag.json', JSON.stringify(tagFile), (err) => {
      if (err) console.log(err);
    });
    return;
  }
  try {
    const sub = args[0];
    await message.channel.send(tagFile[`${sub}`]);
  } catch (e) {
    message.channel.send({
      embed
    });
  }
};

exports.conf = {
  aliases: ["tags"],
  cooldown: 3
};

exports.help = {
  name: "tag",
  category: "Util.",
  description: "",
  usage: "tag \`[tag_name]\`",
  param: "",
  aliases: "tags"
};
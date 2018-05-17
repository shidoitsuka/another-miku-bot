const Discord = require('discord.js');
const package = require('../package.json');
exports.run = function(bot, message, args) {
  const embed = new Discord.RichEmbed()
    .setAuthor(`Miku -- About me`, "", "https://github.com/shidoitsuka/another-miku-bot")
    .setThumbnail("https://tinyurl.com/MikuLogo")
    .setColor(0x1a9ca8)
    .setDescription("Hello, I\'m Miku!\nA \`just4fun\` discord bot written over discord.js framework with :heart: by 12042#5754.")
    .addField("NodeJS version:", `${process.version.slice(1).split(".").join(".")}`, true)
    .addField("discord.js version:", `${package.dependencies["discord.js"].slice(1)}`, true)
    .addField("Chalk version:", `${package.dependencies["chalk"].slice(1)}`, true)
    .addField("Enmap version:", `${package.dependencies["enmap"].slice(1)}`, true)
    .addField("dog-names version:", `${package.dependencies["dog-names"].slice(1)}`, true)
    .addField("cat-names version:", `${package.dependencies["cat-names"].slice(1)}`, true)
    .addField("math.js version:", `${package.dependencies["mathjs"].slice(1)}`, true)
    .setFooter(`Click title for the source-code | v${package.version}-beta`);
  message.channel.send({
    embed
  });
};

exports.conf = {
  aliases: ["info"]
};

exports.help = {
  name: "about",
  category: "System.",
  description: "Print out my information such as modules, version, etc.",
  usage: "about",
  param: "",
  aliases: "info"
};
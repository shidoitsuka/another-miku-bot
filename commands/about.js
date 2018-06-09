const Discord = require('discord.js');
const package = require('../package.json');

exports.run = (bot, message, args) => {
  const embed = new Discord.RichEmbed()
    .setAuthor(`Miku -- About me`, "", "https://github.com/shidoitsuka/another-miku-bot")
    .setThumbnail("https://tinyurl.com/MikuLogo")
    .setColor(0x1a9ca8)
    .setDescription("Hello, I\'m Miku!\nA \`just4fun\` discord bot written over discord.js framework with ❤ by 12042#5754.")
    .addField("NodeJS version:", `${process.version.slice(1).split(".").join(".")}`, true)
    .addField("discord.js version:", `${package.dependencies["discord.js"].slice(1)}`, true)
    .addField("canvas version:", `${package.dependencies["canvas"].slice(1)}`, true)
    .addField("canvas-constructor version:", `${package.dependencies["canvas-constructor"].slice(1)}`, true)
    .addField("cat-names version:", `${package.dependencies["cat-names"].slice(1)}`, true)
    .addField("chalk version:", `${package.dependencies["chalk"].slice(1)}`, true)
    .addField("dog-names version:", `${package.dependencies["dog-names"].slice(1)}`, true)
    .addField("enmap version:", `${package.dependencies["enmap"].slice(1)}`, true)
    .addField("enmap-level version:", `${package.dependencies["enmap-level"].slice(1)}`, true)
    .addField("fs-nextra version:", `${package.dependencies["fs-nextra"].slice(1)}`, true)
    .addField("gfycat-sdk version:", `${package.dependencies["gfycat-sdk"].slice(1)}`, true)
    .addField("google-images version:", `${package.dependencies["google-images"].slice(1)}`, true)
    .addField("math.js version:", `${package.dependencies["mathjs"].slice(1)}`, true)
    .addField("nekos.life version:", `${package.dependencies["nekos.life"].slice(1)}`, true)
    .addField("relevant-urban version:", `${package.dependencies["relevant-urban"].slice(1)}`, true)
    .addField("Invite link:", "[Click Me!](https://discordapp.com/oauth2/authorize/?permissions=2080898303&scope=bot&client_id=364242246314360843)", true)

    .setFooter(`Click title for the source-code | v${package.version}-beta`);
  message.channel.send({
    embed
  });
};

exports.conf = {
  aliases: ["info"],
  cooldown: 7
};

exports.help = {
  name: "about",
  category: "Util.",
  description: "Print out my information such as modules, version, etc.",
  usage: "about",
  param: "",
  aliases: "info"
};
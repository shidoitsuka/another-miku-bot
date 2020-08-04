const { Canvas } = require("canvas-constructor");
const { resolve, join } = require("path");
const { MessageAttachment } = require("discord.js");
const { get } = require("snekfetch");
const fsn = require("fs-nextra");
const imageUrlRegex = /\?size=2048$/g;

// Canvas.registerFont(resolve(join(__dirname, "./assets/whatever.ttf")), "Discord");
exports.run = async (bot, message, args) => {
  if (!args[0]) return message.channel.send(".");

  async function achievement() {
    const { body: img } = await get("https://i.imgur.com/JixUo0z.png");
    return new Canvas(775, 150)
      .addImage(img, 0, 0, 775, 150)
      .setColor("#a9a9a9")
      .setTextFont("35px Arial")
      .setTextAlign("left")
      .addResponsiveText(args.join(" "), 195, 105, 470)
      .toBufferAsync();
  }

  // STARTS HERE
  let now = Date.now();
  message.channel.startTyping();
  message.channel.send("**Rendering...**").then(async m => {
    m.edit(`Rendered in \`${Date.now() - now}ms\``);
    m.edit("**Sending...**");
    await message.channel
      .send(
        new MessageAttachment(
          await achievement(),
          `achievement-${message.author.id}.jpg`
        )
      )
      .then(message.channel.stopTyping());
    m.delete();
  });
};

exports.conf = {
  aliases: [],
  cooldown: 1,
  guildOnly: false,
  userPerm: [""],
  botPerm: ["ATTACH_FILES"]
};

exports.help = {
  name: "achievement",
  category: "Fun",
  description: "Make an XBOX achievement meme",
  usage: "achievement <text>",
  param: "",
};

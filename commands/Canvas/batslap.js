const { Canvas } = require("canvas-constructor");
const { resolve, join } = require("path");
const { MessageAttachment } = require("discord.js");
const { get } = require("snekfetch");
const fsn = require("fs-nextra");
const imageUrlRegex = /\?size=2048$/g;

// Canvas.registerFont(resolve(join(__dirname, "./assets/whatever.ttf")), "Discord");
exports.run = async (bot, message, args) => {
  const mentionMember = message.mentions.users.first();
  if (!mentionMember)
    return message.channel.send(
      `**${message.author.username}**-kun, are you trying to **batslap yourself....?**`
    );

  async function batslap() {
    const { body: targetAv } = await get(
      mentionMember
        .displayAvatarURL({ format: "png", size: 2048 })
        .replace(imageUrlRegex, "?size=256")
    );
    const { body: yourAv } = await get(
      message.author
        .displayAvatarURL({ format: "png", size: 2048 })
        .replace(imageUrlRegex, "?size=128")
    );
    const { body: img } = await get(
      `https://preview.ibb.co/hzuPEd/bat_slap.png`
    );
    return new Canvas(1000, 500)
      .addImage(img, 0, 0, 1000, 500)
      .save()
      .addRoundImage(yourAv, 440, 135, 128, 128, 64)
      .restore()
      .addRoundImage(targetAv, 170, 200, 200, 200, 100)
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
          await batslap(),
          `batslap-${message.author.id}.jpg`
        )
      )
      .then(message.channel.stopTyping());
    m.delete();
  });
  // message.channel.send("Sending...").then(async m => {});
};

exports.conf = {
  aliases: [],
  cooldown: 5,
  guildOnly: false,
  userPerm: [""],
  botPerm: ["ATTACH_FILES"]
};

exports.help = {
  name: "batslap",
  category: "Fun",
  description: "Make a batman slaps robin meme",
  usage: "batslap <mention-user>",
  param: "",
};

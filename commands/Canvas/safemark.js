const { Canvas } = require("canvas-constructor");
const { resolve, join } = require("path");
const { MessageAttachment } = require("discord.js");
const { get } = require("snekfetch");
const fsn = require("fs-nextra");
const imageUrlRegex = /\?size=2048$/g;

exports.run = async (bot, message, args, prefix) => {
  async function safemark() {
    const { body: img } = await get("http://i.imgflip.com/2odckz.jpg");
    const { body: avatar } = await get(
      message.author
        .displayAvatarURL({ format: "png", size: 2048 })
        .replace(imageUrlRegex, "?size=256")
    );
    return new Canvas(618, 499)
      .addImage(img, 0, 0, 618, 499)
      .setColor("#151515")
      .addRoundImage(avatar, 219, 25, 180, 180, 90)
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
          await safemark(),
          `safemark-${message.author.id}.jpg`
        )
      )
      .then(message.channel.stopTyping());
    m.delete();
  });
};

exports.conf = {
  aliases: [],
  cooldown: 5,
  guildOnly: false,
  userPerm: [""],
  botPerm: ["ATTACH_FILES"]
};

exports.help = {
  name: "safemark",
  category: "Canvas",
  description: "Mark a safe spot!",
  usage: "safemark <text1>;[text2]",
  param: ""
};

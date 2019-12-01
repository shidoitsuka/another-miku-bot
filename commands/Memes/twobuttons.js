const Discord = require("discord.js");
const { imgflipid, imgflipapi } = require("../../config.js").config;
const https = require("https");
const BASE = "https://api.imgflip.com/caption_image";
const id = "87743020";

exports.run = async (bot, message, args, prefix) => {
  if (!args[0]) return message.channel.send("You provided no text!");
  const firstText = args.join(" ").split(";")[0];
  const secondText = args.join(" ").split(";")[1];
  const embed = new Discord.MessageEmbed();
  const reply = await message.channel.send("**Generating...**");
  https
    .get(
      `${BASE}?username=${imgflipid}&password=${imgflipapi}&template_id=${id}&max_font_size=35&text0=${firstText}${
        secondText ? `&text1=${secondText}` : ""
      }`,
      resp => {
        resp.on("data", data => {
          let result = JSON.parse(data);
          embed
            .setImage(`${result.data.url}`)
            .setColor("#FF4301")
            .setAuthor("Two Buttons", "", result.data.page_url)
            .setDescription(`[Click here to download](${result.data.url})`)
            .setFooter("imgflip | click title to open page URL");
          reply.delete();
          message.channel.send({ embed });
        });
      }
    )
    .on("error", err => {
      reply.delete();
      message.channel.send("Something went wrong!");
    });
};

exports.conf = {
  aliases: ["tbutton"],
  cooldown: 5,
  guildOnly: false,
  userPerm: [""],
  botPerm: ["EMBED_LINKS"]
};

exports.help = {
  name: "twobutton",
  category: "Memes",
  description: "Make two buttons that you can't choose.",
  usage: "twobutton <text1>;[text2]",
  param: ""
};

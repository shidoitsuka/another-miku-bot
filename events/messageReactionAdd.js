const Discord = require("discord.js");
const fs = require("fs");

module.exports = async (reaction, user) => {
  // if (!reaction.message.guild.members.get(user.id).permissions.has("MANAGE_GUILD")) return;
  if (user.id != '332424370272337923') return;
  if (reaction.emoji.name != "⭐") return;
  let star = JSON.parse(fs.readFileSync("./assets/g.json", "utf8"));
  if (!reaction.message.guild.id in star) return reaction.message.channel.send("You haven\'t set starboard channel yet!");
  let msg;

  if (reaction.message.partial) {
    try {
      msg = await reaction.message.fetch();
    } catch (e) {
      console.log(e);
    }
  }
  msg = reaction.message;
  reaction.message.guild.channels.get(star[reaction.message.guild.id]).send(msg);
};

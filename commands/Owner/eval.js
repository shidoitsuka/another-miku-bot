const util = require("util");
exports.run = async (bot, message, args) => {
  if (message.author.id != "332424370272337923" || !args[0])
    return message.channel.send(":question:");
  const code = args.join(" ");
  if (typeof code !== "string")
    code = util.inspect(code, {
      depth: 0
    });
  const pending = await message.channel.send("**Evaluating...**");
  const reply = await pending;
  try {
    coded = await eval(code);
    reply
      .edit(coded, { code: "js" })
      .catch(e => reply.edit(e.stack, { code: "js" }));
  } catch (e) {
    reply
      .edit(e.stack, { code: "js" })
      .catch(e => reply.edit(e.stack, { code: "js" }));
  }
};

exports.conf = {
  aliases: ["ev"],
  cooldown: 0.1,
  guildOnly: false
};

exports.help = {
  name: "eval",
  description: "**OWNER ONLY**",
  usage: "",
  param: "",
  aliases: "ev"
};

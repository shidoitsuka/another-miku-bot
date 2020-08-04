exports.run = (bot, message, args) => {
  message.delete();
  const msg = message.content.slice(9);
  const mRegex = msg.replace(/\s/g, "");

  // function if theres no space
  function withoutSpace() {
    message.channel.send(
      msg
        .split("")
        .map(i => ":regional_indicator_" + i + ":")
        .join("")
    );
  }

  // function if theres space
  function withSpace() {
    message.channel.send(
      mRegex
        .split("")
        .map(i => ":regional_indicator_" + i + ":")
        .join("")
    );
  }

  // if theres no space
  if (!msg.match(/\W/g)) {
    withoutSpace();
  }

  // function if theres space
  else if (msg.match(/\W/g)) {
    withSpace();
  }
};

exports.conf = {
  aliases: ["btext"],
  cooldown: 5,
  guildOnly: false,
  userPerm: [""],
  botPerm: [""]
};

exports.help = {
  name: "bigtext",
  category: "Fun",
  description: "Make a big text!",
  usage: "bigtext <text>",
  param: ""
};

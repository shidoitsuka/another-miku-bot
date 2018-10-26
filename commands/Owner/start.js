exports.run = async (bot, message, args) => {
  if (message.author.id != '332424370272337923') return message.channel.send("Permission Error.");
  var loop, maloop;

  function maloop() {
    bot.channels.get('452137395333234688').send(`:ping_pong:`);
    console.log("Ping");
  }
  if (args[0] == "-s") {
    console.log("Ping");
    message.channel.send("Starting...").then(m => m.delete(5000));
    loop = setInterval(maloop, 30000);
  }
  if (args[0] == "-p") {
    clearInterval(loop);
    message.channel.send("Paused.");
  }
};

exports.conf = {
  aliases: [],
  cooldown: 5
};

exports.help = {
  name: "start",
  category: "**OWNER ONLY**",
  description: "",
  usage: "",
  param: "",
  aliases: ""
};
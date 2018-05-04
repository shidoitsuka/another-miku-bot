exports.run = function(bot, message, args) {
  message.delete();
  const msg = message.content.slice(9);
  const mRegex = msg.replace(/\s/g,'');
/*
if (msg.match(/\W/g)) {
message.channel.send(":no_mouth:");
}
*/
//else {
/*
message.channel.send(msg.split("").filter(v=> v!==" ").map(i=>
":regional_indicator_" + i + ":"
).join(""));
*/
  function withoutSpace() {
    message.channel.send(msg.split("").map(i=>
      ":regional_indicator_"+i+":"
    ).join(""));
  }
  function withSpace() {
    message.channel.send(mRegex.split("").map(i=>
      ":regional_indicator_"+i+":"
    ).join(""));
  }
  if (!msg.match(/\W/g)) {
    withoutSpace();
  }
  else if (msg.match(/\W/g)) {
    withSpace();
  }
};

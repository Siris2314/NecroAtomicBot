const { MessageEmbed } = require("discord.js");
const ms = require("ms");
module.exports = {
  name: "tempban",
  description: "Ban someone for a period of time",
  async execute(message, args, client) {
    const reason = args.splice(2).join(" ");
    const tbuser = message.mentions.members.first();
    const regex = args.splice(1).join(" ");

    if (!message.member.permissions.has("BAN_MEMBERS")) {
      return message.channel.send("You don't have permissions to ban this person!");
    }
    if (!message.guild.me.permissions.has("BAN_MEMBERS")) {
      return message.channel.send("I dont have permissions to ban someone");
    }
    if (tbuser === message.guild.me) {
      return message.channel.send("Cannot Ban Me");
    }
    if (!tbuser) {
      return message.channel.send("You need to specify a user ``@user``");
    }
    if (tbuser.id == message.author.id) {
      return message.channel.send("Cannot ban yourself");
    }
    if (
      tbuser.roles.highest.position >= message.member.roles.highest.position
    ) {
      return "You cant ban that person\nreason: Highest perms or roles";
    }

    if (tbuser.id == message.guild.owner.id) {
      return message.channel.send("You cant ban the server owner");
    }

    if (!reason) {
      return message.channel.send("You need to give a reason!");
    }
    const tbuembed = new MessageEmbed()
      .setTitle("You have been banned!")
      .setColor("#854ae3")
      .addField("Reason:", reason)
      .addField("Time (s)", regex)
      .addField("Moderator:", message.author.username);
    tbuser.send(tbuembed);
    const tbembed = new MessageEmbed()
      .setTitle("Action: Tempban")
      .addField("User:", tbuser)
      .setAuthor(`${message.author.username}`)
      .setColor("#854ae3")
      .addField("Reason:", reason)
      .addField("Time (s)", regex)
      .addField("Moderator:", message.author.username);
    message.channel.send(tbembed);
    tbuser.send(tbuembed);
    tbuser.ban(reason).reason;
    setTimeout(() => {
      message.guild.members.unban(tbuser.id);
      message.channel.send(
        `${tbuser} has been unbanned after the tempban of ${regex}`
      );
    }, ms(regex));
    return undefined;
  },
};
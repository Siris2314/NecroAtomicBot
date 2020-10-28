module.exports = {
      name: 'userinfo',
      description: 'Displays info for a user',
      execute(message, args){
          // console.log(message.author);

          const user = message.author;
          const member = message.guild.member(user);
          // console.log(member);

          const m = {
              title: "User Info",
              color: 3973927,
              image: {
                  url: user.avatarURL(),
              },
              fields: [
                  {
                      name: "User tag",
                      value: `${user.username}#${user.discriminator}`,
                  },
                  {
                      name: "Is bot",
                      value: user.bot,
                  },
                  {
                      name: "Joined Discord",
                      value: new Date(user.createdAt),
                  },
                  {
                      name: "Joined Server",
                      value: new Date(member.joinedTimestamp),
                  },
                  {
                      name: "Roles",
                      value: member._roles.length,
                  },
              ],
              timestamp: new Date(),
          };
          message.channel.send({ embed: m });
        }
}

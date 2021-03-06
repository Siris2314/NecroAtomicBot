const Instagram = require('scraper-instagram')
const {MessageEmbed} = require('discord.js')
const paginationEmbed = require('discord.js-pagination')


module.exports = {
  name:'instagram',
  description:'Returns Instagram Profile',

  async execute(message,args,client){
    let Text = args.join(" ")
    if(!Text) return message.channel.send('Please Enter a username to find')
    let Replaced = Text.replace(/ +/g, " ")

    const InstaClient = new Instagram();
    const yourSessionId = '40843558906%3A6GhuPZOV9wZS9D%3A14';

    const emojiList = ["⬅️", "➡️"]
    const timeout = '300000';
    const verified_instagram = '✔️';

    const instagram = await InstaClient.authBySessionId(yourSessionId)
      .catch(err => console.error(err))

    try {
      const insta = await InstaClient.getProfile(Replaced)
      console.log(insta)
      const profileUrl = `https://www.instagram.com/${Replaced}`;
      const postUrl = 'https://www.instagram.com/p/';

      const embed = new MessageEmbed()
        .setTitle('\*\*Instagram\*\*')
        .addField(`\*\*${insta.name} (@${Replaced}) ${insta.verified ? `${verified_instagram}`: ``} ${insta.private ? '🔒' : ''}\*\*`,
      `${insta.bio} ${profileUrl}`)
        .setColor('RANDOM')
        .setThumbnail(insta.pic)
        .addFields(
          {name: 'TotalPosts', value: insta.post, inline:true},
          {name:'Followers', value: insta.followers, inline:true},
          {name: 'Followings', value:insta.following, inline:true}
        )
        .setTimestamp()
        .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic:true}))

        try{
          if(!insta.lastPosts[0].caption || insta.lastPosts[0].caption === null){
            insta.lastPosts[0].caption = '-'
          }
          const post  = new MessageEmbed()
            .setTitle('\*\*Instagram\*\*')
            .addField(`\*\*${insta.name} (@${Replaced}) ${insta.verified ? `${verified_instagram}`: ``} ${insta.private ? '🔒' : ''}\*\*`,
          `${postUrl}${insta.lastPosts[0].shortcode}`)
            .setColor('RANDOM')
            .addField('Stats',
`❤️ : \`${insta.lastPosts[0].likes}\` 📋: \`${insta.lastPosts[0].comments}\``)
          .setThumbnail(insta.lastPosts[0].thumbnail)
          .setTimestamp()

          pages =[
            embed,
            post
          ];
          paginationEmbed(message,pages,emojiList,timeout);

        } catch(error){
            message.channel.send(embed)
        }


    } catch(error){
      message.channel.send('Couldnt look into user')

      console.log(error)

    }
  }
}

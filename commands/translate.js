const translate = require('translate-google')

module.exports= {
    name : 'translate',
    description: 'translates from one language to another',
    async execute(message,args,client) {
        translate(args.join(" "), {to : 'zh-tw'}).then(res => {
            message.channel.send(res)
        }).catch(err => {
            message.channel.send('An error has occured')
            console.log(err)
        })
    }
}

const prefixSchema = require('../schemas/prefix')


module.exports = {
  name:'prefix',
  description:'changes server prefix',

  async execute(message,args,client){
    const res = await args.join(" ")

    if(!res) return message.channel.send('Please Specify a prefix to change')

    prefixSchema.findOne({Guild: message.guild.id}, async(err,data) => {
        if(err) throw err;
        if(data){
          prefixSchema.findOneAndDelete({Guild: message.guild.id})
          data = new prefixSchema({
            Guild: message.guild.id,
            Prefix: res
          })
          data.save()
          message.channel.send(`Your prefix has been updated to **${res}**`)

        } else{
          data = new prefixSchema({
            Guild: message.guild.id,
            Prefix: res
          })
          data.save()
          message.channel.send(`Custom prefix in this server is now set to **${res}**`)
        }
  })
}

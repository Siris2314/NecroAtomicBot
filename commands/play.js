module.exports = {

  name:'play',
  description:'plays music',

  async execute(message, args,client){

    const music = args.join(" ")
    client.distube.play(message, music)
  }
}

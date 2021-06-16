module.exports = {
    name:'ping',
    description:'Made to ping(test)',

    async execute(message,args,client){

        message.channel.send('Pong');
    }
}
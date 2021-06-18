const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
    name: "hack",
    description: "hacks a user(meme)",
    async execute( message, args, client) {

        function wait(ms){
            let start = new Date().getTime();
            let end = start;
            while(end < start + ms) {
              end = new Date().getTime();
           }
         }

        const taggedUser = message.mentions.users.first();
        if (!taggedUser) {
            return message.channel.send('Please mention somebody to hack!');
        }
        message.channel.send(`Hacking  ${taggedUser}...`);
        message.channel.send('Status: ■□□□□□□□□□□ 0%')
        .then(msg => {
            wait(93);
            msg.edit('Status: ■■□□□□□□□□□ 7%');
            wait(100);
            msg.edit('Status: ■■■□□□□□□□□ 8%');
            wait(20)
            msg.edit('Status: ■■□□□□□□□□□ 9%');
            wait(90);
            msg.edit('Status: ■■■□□□□□□□□ 12%');
            wait(60);
            msg.edit('Status: ■■■■□□□□□□ 14%');
            wait(60);
            msg.edit('Status: ■■■□□□□□□□□ 17%');
            wait(40);
            msg.edit('Status: ■■□□□□□□□□□ 20%');
            wait(10);
            msg.edit('Status: ■■■□□□□□□□□ 21%');
            wait(12);
            msg.edit('Status: ■■■■□□□□□□□ 22%');
            wait(13);
            msg.edit('Status: ■■■■■□□□□□□ 24%');
            wait(80);
            msg.edit('Status: ■■■■□□□□□□ 29%');
            wait(80);
            msg.edit('Status: ■■■□□□□□□□□ 31%');
            wait(80);
            msg.edit('Status: ■■■■□□□□□□□ 36%');
            wait(40);
            msg.edit('Status: ■■■■■□□□□□□ 41%');
            wait(60);
            msg.edit('Status: ■■■■□□□□□□□ 47%');
            wait(50);
            msg.edit('Status: ■■■■■■□□□□□ 53%');
            wait(35);
            msg.edit('Status: ■■■■■■■□□□□ 58%');
            wait(80);
            msg.edit('Status: ■■■■■■□□□□□ 66%');
            wait(60);
            msg.edit('Status: ■■■■■□□□□□□ 74%');
            wait(20);
            msg.edit('Status: ■■■■■□□□□□□ 79%');
            wait(83);
            msg.edit('Status: ■■■■■■□□□□ 80%');
            wait(50);
            msg.edit('Status: ■■■■■■■□□□ 85%');
            wait(14);
            msg.edit('Status: ■■■■■■■■■□□ 93%');
            wait(70);
            msg.edit('Status: ■■■■■■■■■■□ 97%');
            wait(90);
            msg.edit('Status: ■■■■■■■■■■■ 100%').then(() => {
                message.channel.send(`Successfully hacked ${taggedUser}!`)
            })
        })














    }
}
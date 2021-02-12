const Discord = require("discord.js");
const fetch = require("node-fetch");
require("dotenv").config();
const canvas = process.env.canvas;

module.exports = {

    name: "lindo",
    description: "returns due dates for intro to comms",
    aliases: ['co','lindo'],



    async execute(message, args) {
        console.log("comms");



      //   const embed = new Discord.MessageEmbed()
      //     .setTitle('Course Assignment Picker')
      //     .setField('1.)Calc 2')
      //     .setField('2.)Intro to Comms')
      //     .setField('3.)Intro to Media')
      //
      //
      //
      // message.channel.send(embed);
      //
      //   const url = " ";
      //
      //   if(args[1] == 1){
      //     url = "https://rutgers.instructure.com/api/v1/courses/106380/assignments?bucket=upcoming"
      //   }
      //   else if(args[1] == 2){
      //     url = "https://rutgers.instructure.com/api/v1/courses/107517/assignments?bucket=upcoming"
      //   }
      //   else if(args[1] == 3){
      //     url = "https://rutgers.instructure.com/api/v1/courses/107527/assignments?bucket=upcoming"
      //   }




        fetch("https://rutgers.instructure.com/api/v1/courses/107517/assignments?bucket=upcoming", {
            method: "GET",
            headers: {
                Authorization:
                    "Bearer 6948~wH4Yt4g1DWAogY5mMJOYVdXpqrZx3zHNJ9NsfySIrdOpMoqwL8pfCYf6ZUq1PhH1",
                "Content-Type": "application/json",
            },
        }).then((s) => {
            s.json().then((res) => {
                for (let i = 0; i < res.length; i++) {
                    const d = new Date(res[i].due_at);
                    const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
                    const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
                    const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);


                    message.channel.send(`**${res[i].name}**` + " due by " + `**${mo}**-**${da}**-**${ye}**`);

              
                }
            });
        });
    },
};

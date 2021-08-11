const {MessageActionRow, MessageSelectMenu} = require('discord.js')
const { readdirSync } = require("fs");
module.exports = {

    name:'help2',
    description:'Test Help',


    async execute(message, args,client){

        const directories = []
        readdirSync("./commands/").forEach((dir) => {

            if (dir.indexOf(".") == -1) {
                directories.push(dir)

            }
        });

        const components = (state) => {

            new MessageActionRow().addComponents(
                new MessageSelectMenu().setCustomId("help-menu").setPlaceholder('Category Select')
                .setDisabled(state)
                .addOptions(
                    
                )

            )
        }





        


        console.log(directories);
    }

}
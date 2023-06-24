const backup = require("discord-backup");
const {MessageEmbed, Client} = require('discord.js')
// backup.setStorageFolder(__dirname+"/backups/");

module.exports = {
    name: 'backup',
    description: 'General backup command',


    async execute(message, args, client){
        if(!args[0]){
            return message.channel.send('Must provide one of these options Create, Load, List, and Delete')
        }


        if(message.author.id !== message.guild.ownerId) return message.channel.send("Only server owner can use this command")

        const comms = ["create", "load", "info", "delete"]
        const newcomms = Object.values(comms)

        const query = String(args[0]).toLowerCase()
        if(newcomms.indexOf(query) == -1){
            const embed = new MessageEmbed()
                .setColor("RED")
                .setTitle("Incorrect Usage")
                .setDescription('Back Up System Options: Create, Load, List, and Delete')

            return message.channel.send({embeds: [embed]})
        }
        else{
    
            if(args[0].toLowerCase() == "create"){
                backup.create(message.guild,{

                        jsonBeautify:true
                        }   
                ).then(async data => {
                    const embed = new MessageEmbed()
                        .setColor("GREEN")
                        .setTitle("Backup Created")
                        .setThumbnail(message.guild.iconURL({dynamic:true}))
                        .setDescription(`Backup creation successfull. To load backup use\`backup load ${data.id}\` and \`backup delete ${data.id}\` if you want to delete the backup`)
                        .setTimestamp()

                    return  message.channel.send({embeds:[embed]})

                    })

            }

    if(args[0].toLowerCase()  == "load"){
        const id = args[1]

        if(!id) return message.channel.send("Must provide backup ID to load backup")

        backup.fetch(id).then(async () => {
            backup.load(id, message.guild).then(() => {
                clearGuildBeforeRestore:true,
                backup.remove(id)
            })
        }).catch(err =>{
            return message.channel.send(`Backup for id ${id} does not exist`)
        }) 


    }


    if(args[0].toLowerCase()  == "info"){
        let backupID = args[1];
        if(!backupID){
            return message.channel.send(":x: | You must specify a valid backup ID!");
        }
        // Fetch the backup
        backup.fetch(backupID).then((backupInfos) => {
            const date = new Date(backupInfos.data.createdTimestamp);
            const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
            const formatedDate = `${yyyy}/${(mm[1]?mm:"0"+mm[0])}/${(dd[1]?dd:"0"+dd[0])}`;
            let embed = new MessageEmbed()
                .setAuthor("Backup Informations")
                // Display the backup ID
                .addField("Backup ID", backupInfos.id, false)
                // Displays the server from which this backup comes
                .addField("Server ID", backupInfos.data.guildID, false)
                // Display the size (in mb) of the backup
                .addField("Size", `${backupInfos.size} kb`, false)
                // Display when the backup was created
                .addField("Created at", formatedDate, false)
                .setColor("#FF0000");
            message.channel.send({embeds:[embed]});
        }).catch((err) => {
            // if the backup wasn't found
            return message.channel.send(":x: | No backup found for `"+ backupID+"`!");
        });


    }

    if(args[0].toLowerCase()  == "delete"){
        const id = args[1]

        if(!id) return message.channel.send("Must provide backup ID to load backup")

        backup.remove(id).then((data) => {

            return message.channel.send("Backup data removed")
        }).catch((err) => {
            // if the backup wasn't found
            return message.channel.send(":x: | No backup found for `"+ backupID+"`!");
        });


    }
    }
    

    }

}
const { Client, Message, MessageEmbed } = require('discord.js');
const { mem, cpu } = require("node-os-utils")
let m = require('moment-duration-format')
let os = require('os')
let cpuStat = require('cpu-stat')
let ms = require('ms')
let moment = require('moment')
const version = require("discord.js").version
module.exports = {
    name: 'stats',
    description:'Returns bot cpu/version stats',
    async execute(message, args,client){
        cpuStat.usagePercent(async function (error, percent, seconds) {
            if (error) {
              return console.error(error)
            }
            const cores = os.cpus().length
            const cpuModel = os.cpus()[0].model
            const guilds = client.guilds.cache.size.toLocaleString()
            const users = client.users.cache.size.toLocaleString()
            const channels = client.channels.cache.size.toLocaleString()
            const node = process.version
            const { totalMemMb, usedMemMb } = await mem.info()
            const latency = (Date.now() - message.createdTimestamp) / 60;
            const uptime = moment.duration(client.uptime).format(" D[days], H[hrs], m[mins], s [secs]");


            const embed = new MessageEmbed()
                .setTitle(`Technical Stats for ${client.user.username}`)
                .setColor("#2F3136")
                .addField(`Uptime`, `\`${uptime}\``, true)
                .addField(`Message Latency`,`\`${latency} MS\``, false)
                .addField(`Memory Used`, `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 /1024).toFixed(2)} MB\``, false)
                .addField(`Websocket Latency`, `\`${client.ws.ping}MS\``, false)
                .addField("Users", `\`${users} Users\``, false)
                .addField("Created at ", `\`${client.user.createdAt}\``,false)
                .addField("Servers", `\`${guilds} Servers\``,false)
                .addField("Channels", `\`${channels} Channels\``,false)
                .addField("Discord Dev Version", `\`v${version}\``, false)
                .addField("Node Version",`\`${node}\``,false)
                .addField("CPU", `\`\`\`${os.cpus()[0].model}\`\`\``, false)
                .addField("Number of Cores", `\`\`\`${cores}\`\`\``, false)
                .addField("Dev Platform", `\`\`\`${os.platform()}\`\`\``, false)
                .setThumbnail(client.user.displayAvatarURL({dynamic:true}))
            message.channel.send(embed)





        
    }
        )

        function formatBytes (a, b) {
            let c = 1024;
            d = b || 2
            e = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
            f = Math.floor(Math.log(a) / Math.log(c));

            return parseFloat((a / Math.pow(c, f)).toFixed(d)) + "" + e[f]
        }
    }
}
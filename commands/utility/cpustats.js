const { Client, Message, MessageEmbed } = require('discord.js');
const { mem, cpu } = require("node-os-utils")
require("dotenv").config();
const ownerid = process.env.ownerid;
let m = require('moment-duration-format'),
    os = require('os'),
    cpuStat = require('cpu-stat'),
    ms = require('ms'),
    moment = require('moment')
    const version1 = require("discord.js").version
module.exports = {
    name: 'cpustats',
    description:'Returns Stats of Bot Cpu',
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
            const usage = formatBytes(process.memoryUsage().heapUsed)
            const node = process.version
            const CPU = percent.toFixed(2)
            const { totalMemMb, usedMemMb } = await mem.info()

            const embed = new MessageEmbed()
            .addField('NecroAtomic Bot Stats:', `**<:Server_Owner: ownerid> Total Servers** ${guilds}\n\n**<:bfdverifieduser:ownerid> Total Users**: ${users}\n\n**💬 Total Channels**: ${channels}\n\n**<a:Success:821621580215877644> Usage**: ${usage}\n\n**<:nodejs:ownerid> Node Version**: ${node}\n\n**<:discordjs:838285692676735007> Discord.js Version**: v${version1}\n\n**<:cpu:ownerid> Cpu Usage** ${CPU}\n\n**📑 Total Ram: ${totalMemMb} Mb**\n\n**📀 Ram used: ${usedMemMb}**\n\n**💻 Platform: ${process.platform}**\n\n**♐ Arch: ${process.arch}**`)
            .addField('**Cpu Stats**', `**CPU**: ${cpuModel}\n\n **Cores**: ${cores}`)
            .setColor('BLUE')
            .setTimestamp()

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
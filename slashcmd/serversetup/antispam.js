const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const Schema = require('../../schemas/antispam.js');
const ms = require('ms')


module.exports = {
    name: 'antispam',
    description: 'Configure the antispam system',
    options:[
        {
            name:'warnthreshold',
            description:'The amount of messages that can be sent in a given time interval before a warning is given',
            type:'INTEGER',
            required:true
        },
        {
            name:'mutethreshold',
            description:'The amount of messages that can be sent in a given time interval before a mute is given',
            type:'INTEGER',
            required:true
        },
        {
            name:'kickthreshold',
            description:'The amount of messages that can be sent in a given time interval before a kick is given',
            type:'INTEGER',
            required:true
        },
        {
            name:'banthreshold',
            description:'The amount of messages that can be sent in a given time interval before a ban is given',
            type:'INTEGER',
            required:true

        },
        {
            name:'unmutetime',
            description:'Amount of time (in minutes) that a user will be unmuted for after being muted.',
            type:'INTEGER',
            required:true
        },
        {
            name:'removemessage',
            description:'Remove Messages After Spam is detected(Default True)',
            type:'BOOLEAN',
            required:true
        },
        {
            name:'timeinterval',
            description:'Amount of time (in minutes) in which messages are considered spam.',
            type:'STRING',
            required:true

        },
        {
            name:"maxdupeswarn",
            description:"Amount of duplicate messages that trigger a warning.",
            type:'INTEGER',
            required:false
        },
        {
            name:"maxdupesmute",
            description:"Amount of duplicate messages that trigger a mute.",
            type:'INTEGER',
            required:false
        },
        {
            name:"maxdupeskick",
            description:"Amount of duplicate messages that trigger a kick.",
            type:'INTEGER',
            required:false
        },
        {
            name:"maxdupesban",
            description:"Amount of duplicate messages that trigger a ban.",
            type:'INTEGER',
            required:false
        },
        {
            name:'ignorebots',
            description:'Should bots be ignored?(Default: true)',
            type:'BOOLEAN',
            required:false
        },
    ],

    run: async (client, interaction) => {

            const warnthreshold = interaction.options.getInteger('warnthreshold');
            const mutethreshold = interaction.options.getInteger('mutethreshold');
            const kickthreshold = interaction.options.getInteger('kickthreshold');
            const banthreshold = interaction.options.getInteger('banthreshold');
            const unmutetime = interaction.options.getInteger('unmutetime');
            const removemessage = interaction.options.getBoolean('removemessage');
            const timeinterval = ms(interaction.options.getString('timeinterval'));
            const maxdupeswarn = interaction.options.getInteger('maxdupeswarn');
            const maxdupesmute = interaction.options.getInteger('maxdupesmute');
            const maxdupeskick = interaction.options.getInteger('maxdupeskick');
            const maxdupesban = interaction.options.getInteger('maxdupesban');
            const ignorebots = interaction.options.getBoolean('ignorebots');

            await Schema.findOne({Guild: interaction.guild.id}, async (err, data) => {
                if(data){
                    data.warnThreshold = warnthreshold;
                    data.muteThreshold = mutethreshold;
                    data.kickThreshold = kickthreshold;
                    data.banThreshold = banthreshold;
                    data.unMuteTime = unmutetime;
                    data.removeMessage = removemessage;
                    data.timeInterval = timeinterval;
                    data.maxDupesWarning = maxdupeswarn;
                    data.maxDupesMute = maxdupesmute;
                    data.maxDupesKick = maxdupeskick;
                    data.maxDupesBan = maxdupesban;
                    data.ignoreBots = ignorebots;
                    data.unMuteTime = unmutetime;
                    data.removeMessage = removemessage;
                    data.save();
                    interaction.followUp(`The antispam settings have been updated.`);
                }
                else{
                    new Schema({
                        Guild: interaction.guild.id,
                        warnThreshold:warnthreshold,
                        muteThreshold: mutethreshold,
                        kickThreshold: kickthreshold,
                        banThreshold: banthreshold,
                        timeInterval: timeinterval,
                        maxDuplicatesWarning: maxdupeswarn,
                        maxDuplicatesKick: maxdupeskick,
                        maxDuplicatesBan: maxdupesban,
                        maxDuplicatesMute: maxdupesmute,
                        ignoreBots: ignorebots,
                        unMuteTime: unmutetime,
                        removeMessage: removemessage ? removemessage : true,


                    }).save()

                    interaction.followUp('Antispam settings have been set.');
                }
            })
    }
}
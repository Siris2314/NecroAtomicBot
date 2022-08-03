const request = require('node-superfetch');
const {Message, MessageEmbed, CommandInteraction} = require('discord.js')
module.exports = {

    name: 'bulbapedia',
    description: 'Search Bulbapedia',
    options:[
        {
            name: 'query',
            description: 'The query to search for',
            type:"STRING",
            required: true
        }
    ],
    run: async(client, interaction) => {
        const query = interaction.options.getString('query');

        const { body } = await request
        .get('https://bulbapedia.bulbagarden.net/w/api.php')
        .query({
            action: 'query',
            prop: 'extracts|pageimages',
            format: 'json',
            titles: query,
            exintro: '',
            explaintext: '',
            pithumbsize: 150,
            redirects: '',
            formatversion: 2
        });
    const data = body.query.pages[0];
    if (data.missing) return interaction.followUp('Could not find any results.');
    const embed = new MessageEmbed()
        .setColor(0x3E7614)
        .setTitle(data.title)
        .setAuthor({name:'Bulbapedia', iconURL:'https://i.imgur.com/ePpoeFA.png', url:'https://bulbapedia.bulbagarden.net/'})
        .setThumbnail(data.thumbnail ? data.thumbnail.source : null)
        .setURL(`https://bulbapedia.bulbagarden.net/wiki/${encodeURIComponent(query).replaceAll(')', '%29')}`)

        interaction.followUp({embeds:[embed]});
    }



}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
const fetch = require('node-fetch');

module.exports = {
    name: "inspiration",
    description: "Get some inspiration",
    execute(msg, args) {
        fetch("https://type.fit/api/quotes")
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                const inspiration = {
                    title: "Inspiration",
                    color: 3973927,
                    image: {
                        url: "https://picsum.photos/500/200/?random"
                    },
                    fields: [
                        {
                            name: ":thinking:",
                            value: data[getRandomInt(data.length)].text
                        }
                    ],
                    timestamp: new Date(),
                }
                msg.channel.send({ embed: inspiration });
            });
    },
}
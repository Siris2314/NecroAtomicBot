
const fetch = require('node-fetch');

module.exports = {
    name: "joke",
    description: "Get jokes",
    execute(msg, args) {
        fetch("https://official-joke-api.appspot.com/random_joke")
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                const jokes = {
                    title: "Jokes",
                    color: 3973927,
                    fields: [
                        {
                            name: `:rofl: ${data["setup"]} :rofl:`,
                            value: data["punchline"],
                        },
                    ],
                    timestamp: new Date(),
                };
                msg.channel.send({ embed: jokes });
            });
    },
}
const { Client, Message, MessageEmbed } = require("discord.js");


var Pokedex = require("pokedex-promise-v2"),
  pokedex = new Pokedex();

module.exports = {
  name: "pokemon",
  description: "Returns information on the pokemon",

  async execute(message, args,client) {
    const query = args.join(" ").toLocaleLowerCase();
    if (!query) return message.inlineReply("You need to type a pokemon!");

    function capitalize(s) {
      if (typeof s !== "string") return "";
      return s.charAt(0).toUpperCase() + s.slice(1);
    }

    const pokemon = await pokedex
      .getPokemonByName(query)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        message.channel.send("I didn't find that pokemon!");
      });

    let moves = "";

    let stats = "";

    for (i = 0; i < pokemon.stats.length; i++) {
      stats += `➥ ${capitalize(pokemon.stats[i].stat.name)} [${
        pokemon.stats[i].base_stat
      }]\n`;
    }

    if (pokemon.moves.length >= 4) {
      var nmoves = 3;
    } else if (pokemon.moves.length != 0) {
      var nmoves = 1;
    } else {
      moves += "➥ No moves yet for this pokemon\n";
    }

    for (i = 0; i < nmoves; i++) { 
      moves += `➥ ${capitalize(pokemon.moves[i].move.name)}\n`;
    }


    let types = [];

    for (i = 0; i < pokemon.types.length; i++) {
      types.push(capitalize(pokemon.types[i].type.name));
    }

    let abilities = "";

    for (i = 0; i < pokemon.abilities.length; i++) {
      abilities += `➥ ${capitalize(pokemon.abilities[i].ability.name)}\n`;
    }

    var height = `${pokemon.height * 10} (cm)`;
    var weight = `${Math.floor(pokemon.weight / 10)} (kg)`;
    var n = pokemon.moves.length;

    const embed = new MessageEmbed()
      .setAuthor({
        name: capitalize(pokemon.name),
        iconURL: "http://pngimg.com/uploads/pokemon_logo/pokemon_logo_PNG12.png"
      })

      .setThumbnail(pokemon.sprites.front_default)
      .setColor("BLUE")

      .addFields(
        { name: "Height", value: height, inline: true },
        { name: "Weight", value: weight, inline: true },
        { name: "Type", value: types.join(","), inline: true },
        {
          name: `Abilities[${pokemon.abilities.length}]`,
          value: abilities,
          inline: true,
        },
        { name: "Stats", value: stats, inline: true },
        { name: `Moves[${n}]`, value: moves, inline: true }
      )
      .setTimestamp();
    message.channel.send({embeds:[embed]});
  },
};
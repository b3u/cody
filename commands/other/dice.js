const commando = require('discord.js-commando')

module.exports = class DiceCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'dice',
            aliases: ['roll',  'd'],
            memberName: 'dice',
            description: "Roll a die",
            examples: ['dice', 'dice [4|6|8|20|100]'],
            group: 'other',
            args: [
                {
                    key: 'type',
                    label: "number of sides",
                    default: 6,
                    prompt: "How many sides?",
                    type: 'integer',
                    oneOf: [4, 6, 8, 20, 100]
                }
            ]
        })
    }

    async run(msg, args) {
        msg.say(`:game_die: You rolled a ${Math.round(Math.random() * args.type)} out of ${args.type} :game_die:`)
    }
}
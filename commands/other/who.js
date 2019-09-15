const commando = require('discord.js-commando')
require('discord.js')

module.exports = class WhoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "who",
            aliases: ['user'],
            memberName: 'who',
            description: "Displays the user's info (default is sender)",
            examples: ['who <user>', 'who'],
            group: "other",
            args: [
                {
                    key: 'user',
                    label: "Username",
                    default: '',
                    prompt: "Please enter a user",
                    type: 'user',
                }
            ]
        })
    }
    async run(msg, args) {
        const user = args.user || msg.author;
        msg.embed({
            title: user.tag,
            thumbnail: {url: user.displayAvatarURL},
            fields:[
                {name: 'Joined', value: user.createdAt.toLocaleString(), inline: true}
            ]
        })
    }
}
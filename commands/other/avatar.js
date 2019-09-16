const commando = require('discord.js-commando')

module.exports = class AvatarCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "avatar",
            aliases: ['av'],
            memberName: 'avatar',
            description: "Displays the user's avatar (default is sender's avatar)",
            examples: ['avatar', 'avatar [user]'],
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
        if(args.user === '') {
            msg.say({files: [ {name: "avatar.png", attachment: msg.author.displayAvatarURL.replace('size=2048', 'size=128') }] })
        } else {
            msg.say({files: [ {name: "avatar.png", attachment: args.user.displayAvatarURL.replace('size=2048', 'size=128') }] })
        }
    }
}
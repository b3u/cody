const commando = require('discord.js-commando')

module.exports = class WhoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "whois",
            aliases: ['user', 'u'],
            memberName: 'who',
            description: "Displays the user's info (default is sender)",
            examples: ['whois', 'whois [user]'],
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
        const member = await msg.message.guild.fetchMember(args.user || msg.author);

        msg.embed({
            color: member.displayColor,
            title: member.user.tag,
            thumbnail: {url: member.user.displayAvatarURL},
            description: `${member}`,
            fields:[
                {name: 'Registered', value: member.user.createdAt.toDateString(), inline: true},
                {name: 'Joined', value: member.joinedAt.toDateString(), inline: true},
                {name: 'Roles', value: member.roles.array().join(' '), inline: false}
            ]
        })
    }
}
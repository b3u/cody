const commando = require('discord.js-commando')
let https = require('https');

module.exports = class DiceCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'mdn',
            memberName: 'mdn',
            description: "Search the Mozilla Developer Network",
            examples: ['mdn <search term>'],
            group: 'other',
            args: [
                {
                    key: 'term',
                    label: "search term",
                    prompt: "What should I search for?",
                    type: 'string'
                }
            ]
        })
    }

    async run(msg, args) {
        let url = `https://developer.mozilla.org/en-US/search.json?locale=en-US&q=${args.term}`;

        https.get(url, 'utf8', res => {
            res.on('data', body => {
                body = JSON.parse(body)
                msg.embed({
                    title: body.documents[0].title,
                    url: body.documents[0].url,
                    color: 0x83d0f2,
                    author: {
                        name: 'Mozilla Developer Network',
                        url: 'https://developer.mozilla.org',
                        icon_url: 'https://developer.mozilla.org/static/img/favicon32.7f3da72dcea1.png'
                    },
                    description: body.documents[0].excerpt,
                    footer: {text: `MDN Search Results`},
                    timestamp: new Date()
                })
            })
        })
    }
}
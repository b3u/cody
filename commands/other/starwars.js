const commando = require('discord.js-commando')
const https = require('https');

module.exports = class StarWarsCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'starwars',
            aliases: ['sw'],
            memberName: 'starwars',
            description: "Get Star Wars person info",
            examples: ['sw', 'sw [search term]'],
            group: 'other',
            args: [
                {
                    key: 'term',
                    label: "search term",
                    default: '',
                    prompt: "What should I search for?",
                    type: 'string'
                }
            ]
        })
    }
    
    async run(msg, args) {
        let url = `https://www.starwars.com/search.json?f%5Bsearch_section%5D=Databank&q=${args.term}`;

        https.get(url, 'utf8', res => {
            res.on('data', async body => {
                const data = JSON.parse(body).primary.results;
                
                const next = async (i = 0, reply) => {
                    if(reply)  reply.delete();
                    let newReply = await msg.embed({
                        title: data[i].title,
                        thumbnail: {url: data[i].image_url},
                        url: data[i].href,
                        author: {
                            name: data[i].source,
                            url: 'https://starwars.com',
                            icon_url: 'https://lumiere-a.akamaihd.net/v1/images/sw-favicon-2018-v1-b-400x400_ba2ac2bc.png?region=0%2C0%2C400%2C400'
                        },
                        description: data[i].description,
                        footer: {text: `${data[i].index} out of ${data.length} | StarWars.com Search Results`}
                    })
                    if(i > 0) await newReply.react('◀');
                    if(i < data.length - 1) await newReply.react('▶');
    
                    let res = await newReply.awaitReactions((reaction, user) => {
                        return (user.id === msg.author.id) && (reaction.emoji.name === '▶'  || reaction.emoji.name === '◀')
                    }, { max: 1, time: 30000})
    
                    if(res.first() && res.first().emoji.name === '▶') {
                        next(i+1, newReply)
                    }
    
                    if(res.first() && res.first().emoji.name === '◀') {
                        next(i-1, newReply)
                    }
                }

                next()
            })
        })
    }
}
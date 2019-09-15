const Commando = require('discord.js-commando');
const sqlite = require('sqlite');
const path = require('path');
const config = require('./config.json');

const client = new Commando.Client({
    owner: config.owner,
    commandPrefix: '~',
});

client
    .on('error', console.error)
    .on('warn', console.warn)
    // .on('debug', console.log)
    .on('ready', () => {
        console.log(`Logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
    })
    .on('disconnect', () => { console.warn('Disconnected!'); })
    .on('reconnecting', () => { console.warn('Reconnecting...'); })


client.registry
    // Registers your custom command groups
    .registerGroups([
        ['mod', 'Moderation'],
        ['other', 'Random Stuff']
    ])

    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'commands'));


client.setProvider(
    sqlite.open(path.join(__dirname, 'settings.sqlite3')).then(db => new Commando.SQLiteProvider(db))
).catch(console.error);

client.login(config.token)
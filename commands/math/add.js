const commando = require('discord.js-commando')

module.exports = class AddNumbersCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'add',
			aliases: ['plus'],
			group: 'math',
			memberName: 'add',
			description: 'Adds numbers together',
            details: 'This is an incredibly useful command that finds the sum of numbers.\nThis command is the envy of all other commands.',
			examples: ['add 42 3'],
			args: [
				{
					key: 'numbers',
					label: 'number',
					prompt: 'What numbers would you like to add? Every message you send will be interpreted as a single number.',
					type: 'float',
					infinite: true
				}
			]
		});
	}

	async run(msg, args) {
		const total = args.numbers.reduce((prev, arg) => prev + parseFloat(arg));
		return msg.reply(`${args.numbers.join(' + ')} = **${total}**`);
	}
};
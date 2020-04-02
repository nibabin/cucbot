const Discord = require("discord.js");
const { prefix, token, filename, delimitator_a, delimitator_b } = require("./config.json");
const client = new Discord.Client();
const fs = require('fs')

client.login(token);

let pachet = []

// LOAD COMMANDS
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
//

client.once("ready", async () => {
    pachet = (await fs.readFileSync('./pachet.txt')).toString().split(delimitator_a);
	pachet.shift();
	console.log("Ready!");
	console.log(pachet.length);
})

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	if(!client.commands.has(commandName)) return ;
	try{
		client.commands.get(commandName).execute(message, args, pachet);
	}
	catch(error){
		console.error(error);
		message.reply('Error');
	}
})


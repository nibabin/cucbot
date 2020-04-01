const Discord = require("discord.js");
const { prefix, token, filename, delimitator_a, delimitator_b } = require("./config.json");
const client = new Discord.Client();
const fs = require('fs')

client.login(token);


let pachet = []

client.once("ready", async () => {
    pachet = (await fs.readFileSync('./pachet.txt')).toString().split(delimitator_a);
	pachet.shift();
	console.log("Ready!");
	console.log(pachet.length);
})

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	const number = Number(args.shift());
	if(Math.floor(number) != number || number < 0 || number >= pachet.length) message.channel.send("Invalid");
	else{
		const intrebare = pachet[number - 1];
		const text = intrebare.toString().split(delimitator_b)[0];
		if(text.includes("Material distributiv") || text.includes("material distributiv") || text.includes("imagine")){
			message.channel.send("NU! Contine material distributiv.")
		}
		else{
			if(command === 'q'){
				message.channel.send(delimitator_a + intrebare.toString().split(delimitator_b)[0]);
			}
			else if(command === 'a'){
				message.channel.send(delimitator_b + intrebare.toString().split(delimitator_b)[1]);
			}
			else if(command == 'qa'){
				const time = Number(args.shift());
				message.channel.send(delimitator_a + intrebare.toString().split(delimitator_b)[0]);
				if(time >= 10){
					setTimeout(function(){
						client.channels.cache.find(ch => ch.name === 'echipa-roz').send('10 secunde');
						client.channels.cache.find(ch => ch.name === 'echipa-negru').send('10 secunde');
						client.channels.cache.find(ch => ch.name === 'echipa-verde').send('10 secunde');
					}, (time - 10) * 1000);
				}
				setTimeout(function(){
						client.channels.cache.find(ch => ch.name === 'echipa-roz').send('Timpul');
						client.channels.cache.find(ch => ch.name === 'echipa-negru').send('Timpul');
						client.channels.cache.find(ch => ch.name === 'echipa-verde').send('Timpul');
						message.channel.send(delimitator_b + intrebare.toString().split(delimitator_b)[1]);
				}, (time) * 1000);
			}
		}
	}
})


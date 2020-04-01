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
	const intrebare = pachet[number - 1];
	if(command === 'q'){
		if(Math.floor(number) != number || number < 0 || number >= pachet.length) message.channel.send("Invalid");
		else{
			const time = Number(args.shift());
			message.channel.send(delimitator_a + intrebare.toString().split(delimitator_b)[0]);
			/*
			const channel1 = client.channels.find('name', 'echipa-roz')
			setTimeout(function(){
				channel1.send("10 secunde");
			}, (time - 10) * 1000);
			*/
		}
	}
	else if(command === 'a'){
		if(Math.floor(number) != number || number < 0 || number >= pachet.length) message.channel.send("Invalid");
		else message.channel.send(delimitator_b + intrebare.toString().split(delimitator_b)[1]);
	}
})


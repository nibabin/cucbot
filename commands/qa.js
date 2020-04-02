const { prefix, token, filename, delimitator_a, delimitator_b } = require("../config.json");

module.exports = {
	name: 'qa',
	execute(message, args, pachet){
		const client = message.client;	
		const number = Number(args.shift());
		if((Math.floor(number) != number || number <= 0 || number >= pachet.length)) {
			message.channel.send("Invalid");
			return ;
		}
		const intrebare = pachet[number - 1];
		const text = intrebare.toString().split(delimitator_b)[0];
		if(text.includes("Material distributiv") || text.includes("material distributiv") || text.includes("imagine") || text.includes("Imagine")){
			message.channel.send("NU! Contine material distributiv.")
			return ;
		}
		const time = Number(args.shift());
		message.channel.send(delimitator_a + intrebare.toString().split(delimitator_b)[0]);
		message.channel.send('-------------------------------------------');
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
				message.channel.send('-------------------------------------------');
		}, (time) * 1000);
		
	}
}

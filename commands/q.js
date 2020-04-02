const { prefix, token, filename, delimitator_a, delimitator_b } = require("../config.json");

module.exports = {
	name: 'q',
	execute(message, args, pachet){
		const number = Number(args.shift());
		if(!message.member.roles.cache.find(role => role.name === 'chad')){
			message.channel.send('Nu esti chad.');
			return ;
		}
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
		message.channel.send(delimitator_a + intrebare.toString().split(delimitator_b)[0]);
	}
}
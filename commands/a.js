const { prefix, token, filename, delimitator_a, delimitator_b } = require("../config.json");

module.exports = {
	name: 'a',
	execute(message, args, pachet){
		const number = Number(args.shift());
		if((Math.floor(number) != number || number <= 0 || number >= pachet.length)) {
			message.channel.send("Invalid");
			return ;
		}
		const intrebare = pachet[number - 1];
		message.channel.send(delimitator_b + intrebare.toString().split(delimitator_b)[1]);
	}
}
module.exports = {
	name : 'assign',
	shuffleArray(array){
		for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    	}
	},
	execute(message, args, pachet){
		let users = message.mentions.members.array();
		this.shuffleArray(users);
		const nr = Math.ceil(users.length / Number(args.shift()));
		const names = ['echipa-roz', 'echipa-verde', 'echipa-negru'];
		let k = 0;
		for(const hz of users){
			if(k % nr == 0){
				message.channel.send(names[Math.floor(k / nr)] + ':');
			}
			if(!hz.user) continue;
			if(!hz.nickname) message.channel.send(hz.user.username);
			else message.channel.send(hz.nickname);
			let rol = message.guild.roles.cache.find(role => role.name === names[Math.floor(k / nr)]);
			hz.roles.add(rol);
			k += 1;
		}
	},

}

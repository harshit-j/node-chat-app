// class Person {
// 	constructor(name,age){
// 		this.name = name;
// 		this.age = age;
// 	}
// 	getUserDescription(){
// 		return `${this.name} is ${this.age} years old`;
// 	}
// }

// let me = new Person('Andrew',25);
// let description = me.getUserDescription();
// console.log(description);

class Users {
	constructor	() {
		this.users = []
	}

	addUser (id,name,room) {
		const user = {id,name,room};
		this.users.push(user);
		return user;
	}

	removeUser (id){
		for(let i = 0; i < this.users.length; i++){
			if(this.users[i].id === id) {
				return this.users.splice(i,1)[0]
			}
		}
	}

	getUser(id){
		return this.users.filter(user => user.id===id)[0]
	}

	getUserList(room){
		return this.users.filter(user => user.room===room).map(user => user.name)
	}
}

module.exports = {Users}
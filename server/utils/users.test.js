const expect = require('expect'),
{Users} = require('./users');

describe('Users', ()=>{
	let users;
	beforeEach(()=>{
		users = new Users();
		users.users = [{
			id:'1',
			name:'A',
			room:'React course'	
		},{
			id:'2',
			name:'B',
			room:'Node course'	
		},{
			id:'3',
			name:'C',
			room:'React course'	
		},{
			id:'4',
			name:'D',
			room:'Node course'	
		}]
	});

	it('should add new user', ()=>{
		const users = new Users();
		const user = {
			id:'12',
			name:'A',
			room:'The Office Fans'
		}
		const resUser = users.addUser(user.id, user.name, user.room);
		expect(users.users).toEqual([user]); 
	});

	it('should remove a user', ()=>{
		const user = {
			id:'3',
			name:'C',
			room:'React course'	
		}
		expect(users.removeUser('3')).toEqual(user);
	});

	it('should not remove a user', ()=>{
		expect(users.removeUser('33')).toBeFalsy();
		expect(users.users.length).toBe(4);
	});

	it('should find a user', ()=>{
		expect(users.getUser('3')).toEqual(users.users[2]);
	});

	it('should not find a user', ()=>{
		expect(users.getUser('33')).toBeFalsy();
	});	

	it('should return names for Node course', ()=>{
		expect(users.getUserList('Node course')).toEqual(['B','D']);
	});

	it('should return names for React course', ()=>{
		expect(users.getUserList('React course')).toEqual(['A','C']);
	})
});


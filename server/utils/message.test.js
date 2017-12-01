const expect = require('expect');

let {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage', () => {
	it('should generate correct message object', () => {
		const mock = {
			from:'abc@abc.com',
			text:'asdfghjlk;'
		},
		res = generateMessage(mock.from,mock.text);

		expect(res).toMatchObject(mock);
		expect(typeof res.createdAt).toBe("number");
	});
});
describe('generateMessage', () => {
	it('should generate correct location object', () => {
		const mock = {
			from:'Admin: ',
			url:'https://www.google.com/maps?q=12,34'
		},
		res = generateLocationMessage('Admin: ', '12', '34');

		expect(res).toMatchObject(mock);
		expect(typeof res.createdAt).toBe("number");
	});
});
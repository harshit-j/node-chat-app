const expect = require('expect');

let {generateMessage} = require('./message');

describe('generateMessage', () => {
	it('should generate correct message object', () => {
		const mock = {
			from:'abc@abc.com',
			text:'asdfghjlk;'
		},
		res = generateMessage(mock.from,mock.text);

		expect(res).toMatchObject(mock);
		expect(typeof res.createdAt).toBe("number");
	})
})
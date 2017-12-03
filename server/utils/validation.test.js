const expect = require('expect'),
{isRealString} = require('./validation');

describe('isRealString', () => {
	it('should reject non-string values',()=>{
		expect(isRealString(5456)).toBeFalsy();
	});
		it('should reject string with only spaces',()=>{
		expect(isRealString(    )).toBeFalsy();
	});
	it('should allow string with non-space characters',()=>{
		expect(isRealString('fsdfs54f5sd4f65s4f5f')).toBeTruthy();			
	});
})

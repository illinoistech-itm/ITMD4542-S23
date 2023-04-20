const math = require('../src/math');

describe('math module tests', ()=>{
  describe('Test sum function', ()=>{
   it('adds two positive numbers', ()=>{
    expect(math.sum(2, 3)).toBe(5);
   });

   it('adds a positive and a negative number correctly', ()=>{
    expect(math.sum(-3, 2)).toBe(-1);
   });

   it('returns the value passed to it if only one number is given', ()=>{
    expect(math.sum(5)).toBe(5);
   });

   it('adds three numbers correctly', ()=>{
    expect(math.sum(2, 4, 5)).toBe(11);
   });

   it('Throws and error if an input is not a number', () =>{
    expect(()=>{math.sum(3, 'a')}).toThrowError(Error('Inputs should be numbers'));
   });
  });

  describe('Test gt function', ()=>{
    it('returns true when first parameter is > second', ()=>{
      expect(math.gt(9, 7)).toBeTruthy();
    });

    it('returns false when first parameter is < second', ()=>{
      expect(math.gt(2, 7)).toBeFalsy();
    });

    it('return false when first parameter is = second', ()=>{
      expect(math.gt(2, 2)).toBeFalsy();
    });
  });

  describe('Test divide function', ()=>{
    it('divides two positive number correctly', ()=>{
      expect(math.divide(6, 3)).toBe(2);
    });

    it('returns NaN when divide by zero', ()=>{
      expect(math.divide(6, 0)).toBe(NaN);
    });
  });

  describe('Test addString function', ()=>{
    it('return a string that contains the two inputs combined with a space between', ()=>{
      expect(math.addString('Brian', 'Bailey')).toMatch(/Brian Bailey/);
    });
  });
});
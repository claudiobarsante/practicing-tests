const { queryString } = require('./queryString');
describe('Object to query string', () => {
  it('should create a valid query string when an object is provided', () => {
    const obj = {
      name: 'Fabio',
      profession: 'developer'
    };
    //queryString(obj);
    expect(queryString(obj)).toBe('name=Fabio&profession=developer');
  });

  it('should create a valid query string even when an array is passed as value', () => {
    const obj = {
      name: 'Fabio',
      abilities: ['JS', 'TDD']
    };

    expect(queryString(obj)).toBe('name=Fabio&abilities=JS,TDD');
  });

  it('should throw an error when an object is passed as value', () => {
    const obj = {
      name: 'Fabio',
      abilities: {
        first: 'JS',
        second: 'TDD'
      }
    };

    console.log(queryString(obj));
    //have to pass a callback method fo Jest to check if it throws an error
    expect(() => {
      queryString(obj);
    }).toThrowError();

    //expect(queryString(obj)).toReturn('Please check params');
  });
});

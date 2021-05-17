import Cart from './Cart';

describe('getTotal()', () => {
  it('should return 0 when getTotal is executed in a new created instance', () => {
    let cart = new Cart();

    expect(cart.getTotal()).toEqual(0);
  });
});

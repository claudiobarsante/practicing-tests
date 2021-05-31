import Cart from './Cart';

describe('Cart', () => {
  let cart;

  let product = {
    title: 'Adidas running shoes - men',
    price: 35388 //353.88 || R$ 383,88
  };

  let product2 = {
    title: 'Adidas running shoes - womens',
    price: 41872
  };

  beforeEach(() => {
    cart = new Cart();
  });

  // -- to run just a selected test change it --> fit
  describe('getTotal()', () => {
    it('should return 0 when getTotal is executed in a new created instance', () => {
      // -- getAmount() is a method from the library dinero.js
      expect(cart.getTotal().getAmount()).toEqual(0);
    });

    it('should multiply quantity and price and receive the total amount', () => {
      const item = {
        product,
        quantity: 2 //70776
      };

      cart.add(item);

      expect(cart.getTotal().getAmount()).toEqual(70776);
    });

    it('should ensure no more than on product exists at a time', () => {
      cart.add({
        product,
        quantity: 2
      });

      cart.add({
        product,
        quantity: 1
      });

      expect(cart.getTotal().getAmount()).toEqual(35388);
    });

    it('should update total when a product gets included and then removed', () => {
      cart.add({
        product,
        quantity: 2
      });

      cart.add({
        product: product2,
        quantity: 1
      });

      cart.remove(product);

      expect(cart.getTotal().getAmount()).toEqual(41872);
    });
  });

  describe('checkout()', () => {
    it('should return an object with the total and the list of items', () => {
      cart.add({
        product,
        quantity: 2
      });

      cart.add({
        product: product2,
        quantity: 3
      });

      //to use toMatchInlineSnapshot() must have Prettier installed on project
      /*expect(cart.checkout()).toMatchInlineSnapshot(`
        Object {
          "items": Array [
            Object {
              "product": Object {
                "price": 35388,
                "title": "Adidas running shoes - men",
              },
              "quantity": 2,
            },
            Object {
              "product": Object {
                "price": 41872,
                "title": "Adidas running shoes - womens",
              },
              "quantity": 3,
            },
          ],
          "total": 196392,
        }
      `);*/
      // -- other alternative is to use toMatchSnapshot() and the snapshot will be
      // -- stored on the __snapshot__ folder. To refresh snapshot, type 'u' on tests
      expect(cart.checkout()).toMatchSnapshot();
    });

    it('should return an object with the total and the list of items when summary() is called ', () => {
      cart.add({
        product,
        quantity: 5
      });

      cart.add({
        product: product2,
        quantity: 3
      });

      expect(cart.summary()).toMatchSnapshot();
      expect(cart.getTotal().getAmount()).toBeGreaterThan(0);
    });

    it('should reset the cart when checkout() is called', () => {
      cart.add({
        product: product2,
        quantity: 3
      });

      cart.checkout();

      expect(cart.getTotal().getAmount()).toEqual(0);
    });
  });
});

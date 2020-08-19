import * as fromProducts from './products.actions';

describe('loadProductss', () => {
  it('should return an action', () => {
    expect(fromProducts.loadProductss().type).toBe('[Products] Load Productss');
  });
});

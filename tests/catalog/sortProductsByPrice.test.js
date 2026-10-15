const products = require('../../src/data/products');
const { sortProductsByPrice } = require('../../src/catalog');

describe('sortProductsByPrice', () => {
  test('все товары c "asc" сортируются как [3, 6, 5, 4, 2, 1]', () => {
    const sorted = sortProductsByPrice(products, 'asc');
    expect(sorted.map((p) => p.id)).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test('все товары без направления сортируются как [3, 6, 5, 4, 2, 1]', () => {
    const sorted = sortProductsByPrice(products);
    expect(sorted.map((p) => p.id)).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test('товары [1, 3, 4] c "asc" сортируются как [3, 4, 1]', () => {
    const subset = products.filter((p) => [1, 3, 4].includes(p.id));
    const sorted = sortProductsByPrice(subset, 'asc');
    expect(sorted.map((p) => p.id)).toEqual([3, 4, 1]);
  });

  test('все товары c "desc" сортируются как [1, 2, 4, 5, 6, 3]', () => {
    const sorted = sortProductsByPrice(products, 'desc');
    expect(sorted.map((p) => p.id)).toEqual([1, 2, 4, 5, 6, 3]);
  });

  test('товары [3, 1, 4] c "desc" сортируются как [1, 4, 3]', () => {
    const subset = products.filter((p) => [3, 1, 4].includes(p.id));
    const sorted = sortProductsByPrice(subset, 'desc');
    expect(sorted.map((p) => p.id)).toEqual([1, 4, 3]);
  });

  test('товары [5, 2, 6] c "desc" сортируются как [2, 5, 6]', () => {
    const subset = products.filter((p) => [5, 2, 6].includes(p.id));
    const sorted = sortProductsByPrice(subset, 'desc');
    expect(sorted.map((p) => p.id)).toEqual([2, 5, 6]);
  });

  test('"asc" не меняет исходный массив [1, 3, 4]', () => {
    const subset = products.filter((p) => [1, 3, 4].includes(p.id));
    const copy = JSON.parse(JSON.stringify(subset));
    sortProductsByPrice(subset, 'asc');
    expect(subset).toEqual(copy);
  });

  test('"desc" не меняет исходный массив [1, 3, 4]', () => {
    const subset = products.filter((p) => [1, 3, 4].includes(p.id));
    const copy = JSON.parse(JSON.stringify(subset));
    sortProductsByPrice(subset, 'desc');
    expect(subset).toEqual(copy);
  });

  test('направление по умолчанию не меняет исходный массив всех товаров', () => {
    const copy = JSON.parse(JSON.stringify(products));
    sortProductsByPrice(products);
    expect(products).toEqual(copy);
  });
});

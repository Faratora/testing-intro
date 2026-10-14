const products = require('../../src/data/products');
const { searchProducts } = require('../../src/catalog');

describe('searchProducts', () => {
  test('поиск "Наушники" возвращает товар с ID 1', () => {
    expect(searchProducts(products, 'Наушники').map((p) => p.id)).toEqual([1]);
  });

  test('поиск "Чистый код" возвращает товар с ID 6', () => {
    expect(searchProducts(products, 'Чистый код').map((p) => p.id)).toEqual([6]);
  });

  test('поиск "Настольная лампа" возвращает товар с ID 4', () => {
    expect(searchProducts(products, 'Настольная лампа').map((p) => p.id)).toEqual([4]);
  });

  test('поиск "javascript" возвращает товар с ID 3', () => {
    expect(searchProducts(products, 'javascript').map((p) => p.id)).toEqual([3]);
  });

  test('поиск "ЧЕХОЛ" возвращает товар с ID 5', () => {
    expect(searchProducts(products, 'ЧЕХОЛ').map((p) => p.id)).toEqual([5]);
  });

  test('поиск "наушники" возвращает товар с ID 1', () => {
    expect(searchProducts(products, 'наушники').map((p) => p.id)).toEqual([1]);
  });

  test('пустая строка возвращает товары с ID [1, 2, 3, 4, 5, 6]', () => {
    expect(searchProducts(products, '').map((p) => p.id)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('строка из пробелов возвращает товары с ID [1, 2, 3, 4, 5, 6]', () => {
    expect(searchProducts(products, '   ').map((p) => p.id)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('табуляция и перевод строки возвращает товары с ID [1, 2, 3, 4, 5, 6]', () => {
    expect(searchProducts(products, '	\n').map((p) => p.id)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});

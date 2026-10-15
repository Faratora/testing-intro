const DELIVERY_PRICE = 30000;
const FREE_DELIVERY_FROM = 50000;
const PROMO_CODE = 'SAVE10';
const PROMO_MIN_SUBTOTAL = 20000;

function validateQuantity(quantity) {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new RangeError('Количество должно быть положительным целым числом.');
  }
}

function validateStock(quantity, stock) {
  if (quantity > stock) {
    throw new RangeError('Нельзя взять больше товара, чем есть на складе.');
  }
}

function addToCart(cart, product, quantity) {
  validateQuantity(quantity);
  const existing = cart.find((item) => item.id === product.id);
  const desiredQuantity = existing ? existing.quantity + quantity : quantity;
  validateStock(desiredQuantity, product.stock);
  if (!existing) return [...cart, { ...product, quantity }];
  return cart.map((item) => (item.id === product.id ? { ...item, quantity: desiredQuantity } : item));
}

function changeQuantity(cart, productId, quantity) {
  validateQuantity(quantity);
  const existing = cart.find((item) => item.id === productId);
  if (!existing) return [...cart];
  validateStock(quantity, existing.stock);
  return cart.map((item) => (item.id === productId ? { ...item, quantity } : item));
}

function removeFromCart(cart, productId) {
  return cart.filter((item) => item.id !== productId);
}

function calculateCartSubtotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function calculateOrderTotal(cart, promoCode) {
  const subtotal = calculateCartSubtotal(cart);
  const discount = promoCode === PROMO_CODE && subtotal >= PROMO_MIN_SUBTOTAL ? Math.round(subtotal * 0.1) : 0;
  const delivery = subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_PRICE;
  return { subtotal, discount, delivery, total: subtotal - discount + delivery };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;

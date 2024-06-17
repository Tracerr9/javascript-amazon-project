export let cart = JSON.parse(localStorage.getItem('cart')) || [{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 2,
  deliveryOptionId: '1'
}];

function saveToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart))
}

export function addToCart(productId, quantity) {
  let matchingItem;
      cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      })

      if (matchingItem) {
        matchingItem.quantity += quantity;
      } else { 
        cart.push({
        productId: productId,
        quantity: quantity,
        deliveryOptionId: '1'
      })};

  saveToLocalStorage()
}

export function updateCartQuantity(productId, newQuantity) {
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      cartItem.quantity = newQuantity;
    }
  })

  saveToLocalStorage()
}

export function removeProduct(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  })
  cart = newCart;
  saveToLocalStorage()
}

export function calculateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;       
  });
  return cartQuantity;
}
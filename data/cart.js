export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) || [];  
};

function saveToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart))
};

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

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToLocalStorage();
}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response)
    });
    console.log('load products');
    fun()
  

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}
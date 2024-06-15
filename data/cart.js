export let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart))
}

export function addToCart(productId) {
  let matchingItem;
      cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      })

      if (matchingItem) {
        matchingItem.quantity += 1;
      } else { 
        cart.push({
        productId: productId,
        quantity: 1,
      })};

  saveToLocalStorage()
}

export function removeProduct(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
      console.log(productId)
    }
  })
  cart = newCart;
  saveToLocalStorage()
}
function Cart(localStorageKey) { 
  const cart = {
    cartItems: undefined,

    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];  
    },
    
    saveToLocalStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems))
    },

    addToCart(productId, quantity) {
      let matchingItem;
          this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
              matchingItem = cartItem;
            }
          })
    
          if (matchingItem) {
            matchingItem.quantity += quantity;
          } else { 
            this.cartItems.push({
            productId: productId,
            quantity: quantity,
            deliveryOptionId: '1'
          })};
    
      this.saveToLocalStorage()
    },

    updateCartQuantity(productId, newQuantity) {
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          cartItem.quantity = newQuantity;
        }
      })
    
      this.saveToLocalStorage()
    },

    removeProduct(productId) {
      const newCart = [];
    
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      })
      this.cartItems = newCart;
      this.saveToLocalStorage()
    },

    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem;
    
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
    
      matchingItem.deliveryOptionId = deliveryOptionId;
    
      this.saveToLocalStorage();
    },

    calculateCartQuantity() {
      let cartQuantity = 0;
      this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;       
      });
      return cartQuantity;
    }
  };

  return cart;
};

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');





cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart)









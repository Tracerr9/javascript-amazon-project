import { calculateCartQuantity } from "../../data/cart.js";


export function renderCheckoutHeader() {
  let checkoutHeaderHTML = '';
  let quantityDesc = '';

  let cartQuantity = calculateCartQuantity();

  if (cartQuantity <= 1) {
    quantityDesc = 'item'
  } else {
    quantityDesc = 'items'
  }

  checkoutHeaderHTML = `
  Checkout (<a class="return-to-home-link js-checkout-quantity"
  href="amazon.html">${cartQuantity} ${quantityDesc}</a>)
  `

  document.querySelector('.js-checkout-header').innerHTML = checkoutHeaderHTML;
}

renderCheckoutHeader()
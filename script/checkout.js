import { cart, removeProduct, calculateCartQuantity, updateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utility/money.js";

let cartSummaryHTML = '';
updateQuantity();

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;  
    }
  })
  cartSummaryHTML += `
  <div class="cart-item-container 
    js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: Wednesday, June 15
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          $${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingProduct.id}">
            Update
          </span>
          <input class="quantity-input js-quantity-input-${matchingProduct.id}">
          <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">
            Save
          </span>
          <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>

        <div class="delivery-option">
          <input type="radio" class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio" checked class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio" class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
});

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
  link.addEventListener('click',() => {
    const productId = link.dataset.productId;
    removeProduct(productId);
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();
    updateQuantity()
  })
})

function updateQuantity() {
  let cartQuantity = calculateCartQuantity();
  document.querySelector('.js-checkout-quantity')
    .innerHTML = `${cartQuantity} item(s)`; 
}

document.querySelectorAll(`.js-update-quantity-link`)
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      toggleIsEditing(productId, true);
      const { quantityLabel, quantityInput } = getElementQuantity(productId);
      const quantity = parseInt(quantityLabel.innerHTML, 10);     
      quantityInput.value = String(quantity);     
    })
  })

  document.querySelectorAll(`.js-save-link`)
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      const { quantityLabel, quantityInput } = getElementQuantity(productId);
      const quantity = parseInt(quantityInput.value, 10);
      quantityLabel.innerHTML = quantity;    
      updateCartQuantity(productId, quantity);
      updateQuantity();
      toggleIsEditing(productId, false);
      getElementQuantity(productId);

    })
  })

  function getElementQuantity(productId) {
    const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
    const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
    return { quantityLabel, quantityInput };
  }

  function toggleIsEditing(productId, isEditing) {
    const cartClassList = document.querySelector(`.js-cart-item-container-${productId}`).classList;
    if (isEditing) {
      cartClassList.add('is-editing-quantity');
    } else {
      cartClassList.remove('is-editing-quantity');
    }
  }
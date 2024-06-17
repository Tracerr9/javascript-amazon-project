import { cart, removeProduct, calculateCartQuantity, updateCartQuantity, updateDeliveryOption } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utility/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"; 
import { deliveryOptions } from "../data/deliveryOption.js";

function renderOrderSummary() {

  let cartSummaryHTML = '';
  updateQuantity();

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;  
      }
    });

    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption;

    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        deliveryOption = option;
      };
    });
    let dateString = calcDeliveryDate(deliveryOption);
    cartSummaryHTML += `
    <div class="cart-item-container 
      js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date js-delivery-date-${matchingProduct.id}">
        Delivery date: ${dateString}
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
          ${generateDeliveryOption(matchingProduct, cartItem)}      
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

  function generateDeliveryOption(matchingProduct, cartItem) {
    let HTML = '';

    deliveryOptions.forEach((deliveryOption) => {
      let dateString = calcDeliveryDate(deliveryOption)
      const priceString = deliveryOption.priceCents === 0 ? 'Free' : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId

      HTML += `
        <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
          <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input " 
          name="delivery-option-${matchingProduct.id}" >
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `
    });

    return HTML
  };

  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const productId = element.dataset.productId;
        const deliveryOptionId = element.dataset.deliveryOptionId;
        updateDeliveryOption(productId, deliveryOptionId);
      })
    })

    
  function calcDeliveryDate(deliveryOption) {
    const today = dayjs();
      const deliveryDate = today.add(
        deliveryOption.deliveryDays, 
        'days'
      );
      const dateString = deliveryDate.format('dddd, D MMMM');

      return dateString;
  }

  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
        element.addEventListener('click', () => {
        const productId = element.dataset.productId;
        const deliveryOptionId = element.dataset.deliveryOptionId;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary()
    });
  })
}

renderOrderSummary()
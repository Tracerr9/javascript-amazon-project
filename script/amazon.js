/* const products = [{
  image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
  name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
  rating: {
    stars: 4.5,
    count: 87,
  },
  priceCent: 1090, //cents
}, {
  image: 'images/products/intermediate-composite-basketball.jpg',
  name: 'Intermediate Size Basketball',
  rating: {
    stars: 4.0,
    count: 127,
  },
  priceCent: 2095, //cents
}, {
  image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
  name: 'Adults Plain Cotton T-Shirt - 2 Pack',
  rating: {
    stars: 4.5,
    count: 46,
  },
  priceCent: 799, //cents
}, {
  image: 'images/products/black-2-slot-toaster.jpg',
  name: '2 Slot Toaster - Black',
  rating: {
    stars: 5,
    count: 2197,
  },
  priceCent: 1899, //cents
}, {
  image: 'images/products/6-piece-non-stick-baking-set.webp',
  name: '6-Piece Nonstick, Carbon Steel Oven Bakeware Baking Set',
  rating: {
    stars: 4.5,
    count: 982,
  },
  priceCent: 3499, //cents
}, {
  image: 'images/products/6-piece-white-dinner-plate-set.jpg',
  name: '6 Piece White Dinner Plate Set',
  rating: {
    stars: 4.0,
    count: 36,
  },
  priceCent: 2067, //cents
}, {
  image: 'images/products/women-chiffon-beachwear-coverup-black.jpg',
  name: "Women's Chiffon Beachwear Cover Up - Black",
  rating: {
    stars: 4.5,
    count: 98,
  },
  priceCent: 2070, //cents
}, {
  image: 'images/products/blackout-curtain-set-beige.webp',
  name: 'Blackout Curtains Set 4-Pack - Beige',
  rating: {
    stars: 4.5,
    count: 282,
  },
  priceCent: 4599, //cents
}, {
  image: 'images/products/countertop-blender-64-oz.jpg',
  name: 'Countertop Blender - 64oz, 1400 Watts',
  rating: {
    stars: 4.0,
    count: 6,
  },
  priceCent: 10747, //cents
}]; */

let productsHTML = '';

products.forEach((product) => {
  productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="images/ratings/rating-${product.rating.stars * 10}.png">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${(product.priceCents / 100).toFixed(2)}
        </div>

        <div class="product-quantity-container">
          <select>
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary">
          Add to Cart
        </button>
      </div>
  `
  console.log(productsHTML)
});

document.getElementById('productGrid').innerHTML = productsHTML;
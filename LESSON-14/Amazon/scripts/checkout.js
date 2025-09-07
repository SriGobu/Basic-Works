  /* 
  Main idea of javaScript
  => Save the data
  => Generate the HTML
  => Make it interactive
  */
  /* => DUPLICATING THE DATA
  => we are creating some default values we can use to write the code to generete this page so this just for development
  => when we are actually using the website the cart will start off as empty
  => if we compare our data to our page you might notice that there's a few things that are missing 
  => such as the products image,name,cost
  => how come we're not saving these into our data
  => and that's because we're using  a special technique 
  => we're just saving the product ID and then we can use this ID to search for this products array
  => using the ID we can find all the other details of the products like image,name,price
  => there's no need to save the data twice inside the products array and cart array
  => all we have to do is save the ID of the product that we want and 
  => then search for it 

  => this technique is called duplicating the data or normaliztion the data and
  => this is a very common technique in software engineering
  */
 /*
=> copy the structure and put it inside the ``
=> import the cart and product from its file
=> loop through the cart array and stored it in a variable
=> then check it by using the id 
=> if the productID (the variable we used to store) matches the productid(that is in the products.js)
=> store it in the empty variable we assigned as global
=> now the matchingProduct variable becomes an array and stored every details of that product inside of it
=> check it by using console.log(matchingProduct);
=> we can access it by matchingProduct.value 
=> after we changed the values in the structure 
=> for each time it genertes a new value for the structure
=> after all of this stored it in a variable
=> lastly put the newly generated prodcuts in the website by using DOM
 */ 
/*
two issues =>
=> in the price before change it is 10.9 we want 10.90 (solve it by using .tofixed(2))
-=>instead of doing this manually create module just for this function use it in whereever needed
=> in the delivery option if we click the delivery option for the first product 
=> the second product's clicked options gets disappers 
=> if we click the second product's option the first product's gets disappers
=> in the radio button the  name attribute is representing the radio
-=> we can solve this error by inserting the ${product.id} in the name attribute of the radio name="delivery-option-${matchingProduct.id}" 
=> we used the matchingProduct  because in this file that matchingProduct contains the id's and everything that related to the products
=> now for each radio button it will change its id and each contains a unique id 

=> delete button
=> if we click the delete the button 
=> remove the product from the cart (page)
=> update the html
=> how do we know which product we need to remove from the cart
=> just like we did it to the add to cart by 
=> we can attach the product's ID to the link element 
=> like we add the data attribute
=> just like this data-product-id="${matchingProduct.id}"
*/ 

import { cart, removeFromCart,calculateCartQuantity, updateQuantity } from '../data/cart.js';        
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let cartSummaryHTML = '';

    cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;
    products.forEach((product)=>{
      if(product.id === productId){
        matchingProduct = product;
      }
    })

    cartSummaryHTML+=`
    <div class="cart-item-container 
    js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
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
              Quantity: <span class="quantity-label
               js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link">
              Update
            </span>
            <input class="quantity-input js-quantity-input-${matchingProduct.id}">
            <span class="save-quantity-link 
            link-primary js-save-link"
             data-product-id="${matchingProduct.id}"
             >Save
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
            <input type="radio" checked
              class="delivery-option-input"
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
            <input type="radio"
              class="delivery-option-input"
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
            <input type="radio"
              class="delivery-option-input"
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
  })

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link').forEach((link)=>{
    link.addEventListener('click',()=>{
      const productId = link.dataset.productId;
      removeFromCart(productId);
    
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    )  
    container.remove();
    updateCartQuantity();
    });
  });

  function updateCartQuantity() {

    const cartQuantity = calculateCartQuantity();

    document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;
  }
  updateCartQuantity();

  document.querySelectorAll('.js-update-link')
  .forEach((link)=>{
    link.addEventListener('click',()=>{
      const productId = link.dataset.productId;

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.add('is-editing-quantity');
    })
  })

  document.querySelectorAll('.js-save-link')
   .forEach((link)=>{
    link.addEventListener('click',()=>{
      const productId = link.dataset.productId;
      const container = document.querySelector(`.js-cart-item-conatiner-${productId}`);
      container.classList.remove('is-edting-quantity');

      const quantityInput = document.querySelector(`.js-quantity-input-${productId}`)
      const newQuantity = Number(quantityInput.value);

      if (newQuantity < 0 || newQuantity >= 1000){
        alert('Quantity must be at leat 0 and less tan 1000')
        return;
      }
      updateQuantity(productId,newQuantity);
 

      const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
      quantityLabel.innerHTML = newQuantity;
      updateCartQuantity();
    })
   })
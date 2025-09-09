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

import { cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption } from '../../data/cart.js';
import { products, getProduct} from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js'
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import { deliveryOptions, getDeliveryOptions, calculateDeliveryDate } from '../../data/deliveryOptions.js'
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';


export function renderOrderSummary(){
let cartSummaryHTML = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  const matchingProduct = getProduct(productId);

  const deliveryOptionId = cartItem.deliveryOptionId;

  const deliveryOption = getDeliveryOptions(deliveryOptionId);

const dateString = calculateDeliveryDate(deliveryOption);

  cartSummaryHTML += `
    <div class="cart-item-container 
    js-cart-item-container
    js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name js-product-name-${matchingProduct.id}">
            ${matchingProduct.name}
          </div>
          <div class="product-price js-product-price-${matchingProduct.id}">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity js-product-quantity-${matchingProduct.id}">
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

            <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>
        ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>  
  `;
})

function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = ''
  deliveryOptions.forEach((deliveryOption) => {
const dateString = calculateDeliveryDate(deliveryOption);

    const priceString = deliveryOption.priceCents
      === 0
      ?
      'FREE'
      :
      `$${formatCurrency(deliveryOption.priceCents)} -`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `<div class="delivery-options js-delivery-option"
    data-product-id="${matchingProduct.id}"
    data-delivery-option-id="${deliveryOption.id}">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" ${isChecked ? 'checked' : console.log('no')}
              class="delivery-option-input js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
              ${priceString}
              </div>
            </div>
          </div>`

  })
  return html
}

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);

    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
    // updateCartQuantity();
  });
});

function updateCartQuantity() {

  const cartQuantity = calculateCartQuantity();

  document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;
}
updateCartQuantity();

document.querySelectorAll('.js-update-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.add('is-editing-quantity');
    })
  })

document.querySelectorAll('.js-save-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(`.js-cart-item-conatiner-${productId}`);
      container.classList.remove('is-edting-quantity');

      const quantityInput = document.querySelector(`.js-quantity-input-${productId}`)
      const newQuantity = Number(quantityInput.value);

      if (newQuantity < 0 || newQuantity >= 1000) {
        alert('Quantity must be at leat 0 and less tan 1000')
        return;
      }
      updateQuantity(productId, newQuantity);


      const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
      quantityLabel.innerHTML = newQuantity;
      updateCartQuantity();
    })
  })

  document.querySelectorAll('.js-delivery-option')
  .forEach((element)=>{
    element.addEventListener('click',()=>{
      const {productId,deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId,deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    })
  })
}


/*15=>ESM
=> we learnerd the external library let'do some pratical libraries 
=> lt's do some pratical examples
=> we're going to go back to the checkout page 
=> we're going to use DJs to create the delivery options here
=> so the way this works is that we can select one of these delivery option
=> when we click an option it should change the delivery date in the above image 
=> it should change the prices in the right side 

=> MAIN idea of JavaScript
save the data
generate the HTML
make it interactive

save the data
=> each option has price
=> delivery time and date

cart =[{
productId:'',
quantity
},{
productId:'',
quantity
}]

=> looks like now we could save the delivery option details in the cart
=> like however notice that this data gets duplicated for each product in the cart
=> instaed we're going to save the delivery options seperately 
=> then just save an ID that points to teh delivery option

deliveryOptions = [{
id:'',
deliveryTime:'',
deliveryPrice:''
},{
id:'',
deliveryTime:'',
deliveryPrice:''
}]

=> this techinque is called normalization the data
=> we save the delivery options seperately and 
=> then we just save an ID that points to the full delivery option

=> step 1 in deliveryOptions.js
=> to save variables
=>cart.js 
save the delivery option ID in p1,p2
in addtocart else save the deliveryOptionId with default value 1
delete the default in the localStorage
localStorage.removeItem('cart') by this

=> if we use any error with in promise
delete it by localStorage.clear()
=>byt this it will remoe evrything from the localstorage

=>generate HTML 
=> find the delivery option ctrl+f to find in file
=> create a function to generate a generate the HTML
=> steps loop through delivery options we created earlier
=> for each option generate some HTML
=> combine the HTML together

=> import {deliveryOptions} from '../data/deliveryOptions.js'
=>use export in the deliveryOptions variable
=> copy the deliveryoption html into the function we created 
=> to change days create a variable to store and get the data from DAYjs const today = dayjs();
=> it has two parameter
=> how many days we want to add deliveryOptions.deliveryDays
with his we can give the date in the 
=> length of time we want to add => days
=> const deliveryDate = today.add(deliveryOptions.deliveryDays,'days) with this to get 
=> dayjs.format() => by using this to an easy to read format 
by using like this we can make it
const dateString = deliveryDate.format('dddd,MMMM,D')

=> each delivery option has a property option sense
=> if the priceCents is  0 => FREE
=> if priceCnets is NOT 0

      const priceString = deliveryOption.priceCents
       === 0 
       ?
       'FREE'
       :
       `$${formatCurrency(deliveryOption.priceCents)} -`;

=> in the above coding we used ternary operator to check 
=> if the condition is true it will print the statement that is left side to the semicolon
=> if the condition is false it will print the statement that is right side to teh semicolon

=> finally combine all this HTML togehter 
=> in generating the HTML you can see the matchingproduct variable
=> but this variable is not accessable inside the function
=> let's actually pass the matching product into here
=> so at the top add a parameter to the deliveryOptionalHtml(matchingProduct)
=> when calling the function the html file change it like this ${deliveryOptionsHTML(matchingProduct)}

=> checked option

const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

${isChecked ? 'checked' : ''}

=> now we have to change the date that is above the image in the cart
=> by using like this  const deliveryOptionId = cartItem.deliveryOptionId;
=> we have to get out the deliveryOptionId and put it in the date

    let deliveryOption;

    deliveryOptions.forEach((option)=>{
      if (option.id === deliveryOptionId){
        deliveryOption = option
      }
    })
by coding like this we are getting the four delivery options

=> when we click the delivery option => make two thing
=> Update deliveryOptionId in the cart
=> Update the page

=>create a function for updating the deliveryOptionId
=> the two things we need is the productId,deliveryOption
=>steps
=> loop through the cart
=> update the deliveryOptionId of the product
=> step 1 => cartitem matches the productid
let matchingItem;

    cart.forEach((cartItem)=>{
      if (productId === cartItem.productId) { 
        matchingItem = cartItem;
      }
    })
=> update the deliveryOptionId

matchingItem.deliveryOptionId = deliveryOptionId;

=>by using the below code we are adding listenrs to the option
  document.querySelectorAll('.js-delivery-option')
  .forEach((element)=>{
    element.addEventListener('click',()=>{
      updateDeliveryOption(productId,deliveryOptionId);
    })
  })

=>to give valeus to these parameter we have to access it 
(productId,deliveryOptionId)
=> for that we are adding data attribute to these 
data-product-id="${matchingProduct.id}"
    data-delivery-option-id="${deliveryOption.id}"
=>by using this shorthand method we are getting the data
const {productId,deliveryOptionId} = element.dataset;
*/
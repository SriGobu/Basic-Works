/*
Main idea of java script 
=> Save the data
=> Generates the HTML
=> Make it interactive

=> Find the HTML for one product just copy and paste the other one 
=> improtant skill for a bigger project
=> How to find the code for something on the page
=> using inspect option is more professional 
=> Ctrl + F to search for code in a file 

=> once we find the HTML code 
=> we can make copy of it but 
=> if we expand the HTML and we can see that each product has the lots of HTML code 
=> if we simply copy the code and making over and over pasting
=> it will be a lots of code and hard and manage 
=> instead Generate this HTML code using javaScript

=> we're going to genereate the HTML code by using javaScript instead of using HTML

=> Save The Data
=> data => information in this amazon project (information about our products) => name,image,cost,rating
=> the datas are inside our HTML
=> we can see the information of a product in the HTML

=> we have to save the data in our javScript
=> javaScript can use it

=> create a variable to save the data
=> we have to create something that closely matches ou data
=> in this project we have a list of projects
=> for that we are creating a array
=> inside the array we have many labels of the product
=> each product contains names,image,cost 
=> for that we are creating a obejct to represent each product 
=> because en object letus us group multiple values
=> object => lets us groups multiple values together

*/
/* => this is called as save the data
=> we create something in the javaScript that closely matches the data that we have on the page
=> this is also called as dataStructure
=> it structures or organizes the data and this represents a list of products 
*/


/*
=> Now use the data to generate the HTML 
=> instead of writting HTML manually 
=> so that we have to loop through this array and for each fo these products we're going to create some HTML
*/
/*
=> foreach => it takes the each objects and save it in the parameter and => then it runs the function 
=> foreach we have to create HTML for it 

=> the one problem here is that in the HTML we genrate we don't want to
have the previous names and image to the next new product that we are going to generate
=> for that  we are going to insert the properties in the obejct to the new generated products

=> in the image part the new images we're going to insert it has to be exist
=> previous image => images/ratings/rating-4.5.png
=> open images folder => open ratings folder there is no image called images/ratings/rating-4.5.png 
=> instead we have rating-45.png
=> if the rating we give 4.5 we have to convert it to 45 to get the exist image
=> if rating-4.png => rating-40.png
${products.rating.stars * 10} we can convert it by giving like this
=> we converted the price from dollar to cents when we stored it in the objects
=> but to insert the value in the html we have to convert it to dollar ( 100 cents = dollar )
${products.priceCents / 100}  

=> mistake one => when we insert values to the HTML we have to give the parameter name like this ${product.image} 
=> not like this ${products.image} because when we give the obejctname.property it displays a error that it can't read
=> because the obejct property are saved in the parameter for each time the loop
*/
/* 
next => combine this HTML together 
=> put it on the webpage
=> we have to create a variable for combining all the strings together
=> we make it empty string to start
=>the each time we go through the loop we're going to add the HTML string we created to the empty variable  
=> in below we changed the Html variable to the productsHTML
=> accumulator pattern 
=> each time we loop through the array we are adding to the result so we are 

last => take all the HTML and put it on the page
=> we can do that by using the DOM
=> first we're going to get an HTML element from the page and put it inside our javaScript
document.querySelector('.js-products-grid').innerHTML = productsHTML like this
even though we deleted the productscontainer in our HTML file we can still see the products 
=> because we generting the HTML and put it on the page

=> mistake 2 in the first procut cost we a have 10.9 but we want 10.90
=> because the priceCents = 1090 => 1090 / 100 = 10.9
=> if we force it to show the 10.90 two decimal point we have special method in the number
${(product.priceCents / 100).toFixed(2)} 
=> by using the .tofixed(2) => tofixed will convert a number into a string 
=> but we can tell it how many decimals we want between the brackets
*/
/*
benefits of generating the HTML =>
=> if we want to add another product we don't have to copy paste all of the HTML we generated in the javaScript
=> all we need to do is to go up to the data and add the data for a new product 
*/

import {cart, addToCart, calculateCartQuantity} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

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
            ${formatCurrency(product.priceCents)};
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
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

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
  `;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML


function updateCartQuantity(){

  const cartQuantity = calculateCartQuantity();
  document.querySelector('.js-cart-quantity').innerHTML = `${cartQuantity}`;
  
}

document.querySelectorAll('.js-add-to-cart').forEach((button)=>{

    // closure. Each time we run the loop, it will create
    // a new variable called addedMessageTimeoutId and do
    // button.addEventListener().
    //
    // Then, because of closure, the function we give to
    // button.addEventListener() will get a unique copy
    // of the addedMessageTimeoutId variable and it will
    //
    // keep this copy of the variable forever.
    // (Reminder: closure = if a function has access to a
    // value/variable, it will always have access to that
    // value/variable).
    //
    // This allows us to create many unique copies of the
    // addedMessageTimeoutId variable (one for every time
    // we run the loop) so it lets us keep track of many
    // timeoutIds (one for each product).
    let addedMessageTimeoutId;

  button.addEventListener('click',() => {
    const productId = button.dataset.productId;
    addToCart(productId);
    updateCartQuantity();    

      const addedMessage = document.querySelector(
        `.js-added-to-cart-${productId}`
      );
  
      addedMessage.classList.add(
        'added-to-cart-visible');
      
      // Check if a previous timeoutId exists. If it does,
      // we will stop it.
      if (addedMessageTimeoutId) {
        clearTimeout(addedMessageTimeoutId);
      }
  
      const timeoutId = setTimeout(() => {
        addedMessage.classList.remove(
          'added-to-cart-visible');
      }, 2000);
  
      // Save the timeoutId so we can stop it later.
      addedMessageTimeoutId = timeoutId;

  });
});

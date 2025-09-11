/*
=> a cart is basically a list
=> inside the list the product we want to buy and the quantity or the number of thi project
=>we can represent this in javaScript as an array
=> inside the array we can have some objects and each objects is going to contain the product and a quantity

const cart = [
{ product:'basketball,
quantity: 1 },
{ product:'T-shirt',
quantity }
]
*/
/*
=> now we have a cart 
=> we need to figure out what happens when we click a button 
=> how we add the product to this cart ( cart.js )

=> method one =>
=> go to amazon project find the eventlistenr that we added to the cart button
=> cart.push({
product.name:'basetball',
quntity:1
})

=> when we click the button 
=> how do we know which product to add?
=> to solve this problem we're going to learn a feature of HTML called a data 
=> method two =>

=> DATA attribute 
=> it just another HTML attribute
=> it allows ut to attach any information to an  html element
data-product-name="${product.name}" 
=> -product-name => is any name we want 
=> ${product.name} => by this we are inserting the product name of the cart button we click
=> after this check it in the console
=> syntax for a  Data Attribute
=> it just an HTML attribute
=> right side       left side
data-product-name = ${products.name}
=> have to start with 'data-'
=> then give it any name
=> but we have to seperate the names => it is called as kebab case
=> it's purpose is that we can add any information to the data => img,name,
=> .dataset => it gives us all the data attributes that are attached to the element
=> we can access the elements in the dataset just like we did it in the object 
=> to access the product name we just have to type dot product name
=> .dataset.productName 
=> notice that the kebab case converted to camil case 
*/

/* 
steps to remove cart from the page
=> use the DOM to get the element to remove
=> use.remove() method
=> how do we know which element to get from the page
=> the one way to identify which produc this is for 
=> add a special class to this element
=> checkout.js => when we click delete we have the product id here
=> we can use this to select that's special class that we're going to add

*/

/* => removeFromCart()
steps to remove cart =>
=> create a array
=> loop through the cart
=> add each product to the new array,except for this productId
=> except if it has this => productId
=> now we are going to take the new cart replace it in the const cart=[];
=> cart = newCart because we're assiging this variable and change it from const to let
*/

/*
=> error 5 
=> i accidentally typed const cart = [{}].
=> when i typed like this 
=> when each time its loops trough the array and generate the HTML for the products
=> it  creates a empty object inside the array as default
=> for everything happens like this way the incrementation of the quantity becomes NaN
*/

  /*
  lastly => we have to store the products in the localStorage
  => because if we save datas in variables
  => it will reset when we refresh the page
  => we go to a different page
  => to solve this we are going to store it in the localStorage
  => let's create a function for saving the cart to the localStorage 
  => because we might want to reuse the code
  => whenever we update the cart 
  => we need to save it to localStorage

  => but when we first use the website 
  => we might not have a cart in the localStorage
  => so if we don't have a cart saved 
  => localStorage will give us NULL
  => so in this situation
  => if this value is null we want to give the cart a default value
  */
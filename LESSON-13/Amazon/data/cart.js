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
const cart = [];
/*
=> error 5 
=> i accidentally typed const cart = [{}].
=> when i typed like this 
=> when each time its loops trough the array and generate the HTML for the products
=> it  creates a empty object inside the array as default
=> for everything happens like this way the incrementation of the quantity becomes NaN
*/
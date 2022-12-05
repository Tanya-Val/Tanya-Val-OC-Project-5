//-----------------------------------------------------
//------Milestone #4: Making links between the products on the homepage and on the product page
//Prints the entire href
const url = window.location
console.log(url);

//Prints the entire parameter string
const queryString = window.location.search;
console.log(queryString);

//------Milestone #5: Collecting the ID of a product you wish to display
const urlParams = new URLSearchParams(queryString);

//id variable stores the id of the product to be displayed
const id = urlParams.get("id");
console.log(id);
//-----------------------------------------------------

//-----------------------------------------------------
// fetching data on the products from the server to have acces to the product details
fetch('http://localhost:3000/api/products/')
  .then(res => res.json())
  .then(data => {
    //console.log(data);
    //call the function to display product details by passing data from server as an argument
    displayProductDeatils(data);


  });
//-----------------------------------------------------

//-----------------------------------------------------
//-------Milestone #6: Inserting a product and its details into a product page

//Declaring the variables to manipulate the DOM 
const productImage = document.querySelector(".item__img");
const productName = document.querySelector("#title");
const productPrice = document.querySelector("#price");
const productDescription = document.querySelector("#description");
const productColor = document.querySelector("#colors");
let productQuantity = document.querySelector("#quantity")


//Function to display product details
function displayProductDeatils(productDataFromServer) {
  //DOM manipulation to display product details
  //for loop to iterate through data from server to display product details
  for (product of productDataFromServer) {
    if (id === product._id) {
      productImage.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
      productName.textContent = `${product.name}`;
      productPrice.textContent = `${product.price}`;
      productDescription.textContent = `${product.description}`;

      //for loop to iterate through array of color from server
      for (let color of product.colors) {
        productColor.innerHTML += `<option value=${color}>${color}</option>`
      };
    };
  };
};


const addToCartFunction = function addProductToCart() {
  console.log("button pressed")
  if(!localStorage.getItem('cart')){
    localStorage.setItem('cart','[]')
  };

   let productInfo = {
    id: id,
    name: productName.textContent,
    //price: productPrice.textContent,
    color: productColor.value,
    quantity: productQuantity.value,
    description: productDescription.textContent,
    imageUrl: product.imageUrl,
    altTxt: product.altTxt,
  };

  //everithing id dtoreg in the shoping cart in local storage
  let cartParse = JSON.parse(localStorage.getItem('cart'));


  let push = true;
  if (productQuantity.value == 0 || productColor.value == undefined) {
    console.log('add detales'); //add alert message
  } else {
    if (cartParse) {
      cartParse.forEach(function (product, key) {
        if (product.id == id &&
          product.color == productColor.value) {
          cartParse[key].quantity = parseInt(product.quantity) +
            parseInt(productQuantity.value);
          push = false;
          cart = localStorage.setItem('cart', JSON.stringify(cartParse));
          cartParse = JSON.parse(localStorage.getItem('cart'));
        };
      });
    };

    if (push) {
      cartParse.push(productInfo);

      cart = JSON.stringify(cartParse);
      localStorage.setItem('cart', cart);
      cartParse = JSON.parse(cart);
    }
  }; 
};


//console.log(productName.textContent); //works!
//console.log(productPrice.textContent); //works!
//console.log(productColor.value); //works!
//console.log(id); //works!
//console.log(productQuantity.value) //works!

//event listener to the Add button
const addToCartButton = document.getElementById('addToCart');
//console.log(addToCartButton);
addToCartButton.addEventListener('click', addToCartFunction);
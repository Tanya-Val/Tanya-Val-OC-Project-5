//----- Milestone #4: Making links between the products on the homepage and on the product page -----

//Collecting and storing href into a variable
const url = window.location
//Uncomment the following line to print the href
//console.log(url);

//Collecting and storing a parameter string into a variable 
const queryString = window.location.search;

//Uncomment the following line to print the parameter string
//console.log(queryString);
//----------------------------------------------------------------------------

//----- Milestone #5: Collecting the ID of a product you wish to display -----

//Collecting and storing URLSearchParams methond in a variable
const urlPar = new URLSearchParams(queryString);

//Collecting and storing the url ID
//id variable stores the id of the product to be displayed
const id = urlPar.get("id");
//Uncomment the following to print the id of the page that is equal to the ID of the product
//console.log(id);
//----------------------------------------------------------------------------

//----- Milestone #6: Inserting a product and its details into a product page -----

// Collecting data from the API using the fetch() method. 
// Collected data contain descriptive information about the products.
fetch('http://localhost:3000/api/products/')
  .then(res => res.json())
  .then(data => {
    //Uncomment the following to print the data from API
    //console.log(data);

    //The function displays product details from API on the home page using DOM
    displayProductDeatils(data);
  });

//Declaring variables to manipulate the DOM that will be used later to display product details from the API
const productImage = document.querySelector(".item__img");
const productName = document.querySelector("#title");
const productPrice = document.querySelector("#price");
const productDescription = document.querySelector("#description");
const productColor = document.querySelector("#colors");
let productQuantity = document.querySelector("#quantity")

//Function is called in the fetch() method with data from API as an argument.
//Data is passed through the "for" loop to display product details on the home page using DOM
function displayProductDeatils(productDataFromServer) {
  //DOM manipulation to display product details
  //for loop to iterate through data from server to display product details
  for (product of productDataFromServer) {
    if (id === product._id) {
      productImage.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
      productName.textContent = `${product.name}`;
      productPrice.textContent = `${product.price}`;
      productDescription.textContent = `${product.description}`;

      //for loop to iterate through array of colors of the product from server
      for (let color of product.colors) {
        productColor.innerHTML += `<option value=${color}>${color}</option>`
      };
    };
  };
};
//----------------------------------------------------------------------------

//----- Milestone #7: Adding products to the cart -----
//Declaring variables to manipulate the DOM for the 'Add to Cart' button
const addToCartButton = document.getElementById('addToCart');

//Adding an event listener to the 'Add to Cart' button
addToCartButton.addEventListener('click', (event) => {
  event.preventDefault();
  
  //calling the function so the product is added to the cart when the button is pressed
  addProductToCart();
});

//Function initiants the 'cart' array in local storage if it is ampty.
function cartInitLocalStorage () {
  //'if' statment checks if 'cart' array exists
  //if 'cart' array does not exist in local storage, it is initiated
  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', '[]')
  };
}

//Function to add the product to the cart 
//by checking if the same product is already in the cart,
//if the product is in the cart, the function updates the quantity
//if not, the function pushes a new object that contains product details.
function addProductToCart() {

  //Uncomment the following line to console log the message when the button "Add to cart" is pressed
  //console.log("button pressed")
  
  //Calling the function to check if 'cart' exists, if not, it initiates the 'cart' array in the local storage
  cartInitLocalStorage ();

  //declaring an object that will hold information about the product
  //this object will be pushed to the local storage
  const productInfo = {
    id: id,
    name: productName.textContent,
    //Price info should not be saved in local storage
    //price: productPrice.textContent,
    color: productColor.value,
    quantity: productQuantity.value,
    description: productDescription.textContent,
    imageUrl: product.imageUrl,
    altTxt: product.altTxt,
  };

  //Variable that holds parsed data from local storage
  let cartParse = JSON.parse(localStorage.getItem('cart'));
  
   //'if' statement checks if the user indicated the quantity and color of the product to be added to the cart
  let push = true;
  if (productQuantity.value == 0 || productColor.value == undefined) {
    alert("Add product color and/or quantity");
    //console.log('add detales'); 
  } else {
    //if the user entered the quantity and color of the selected product and 
    //if local storage already holds same product, the quantity will be updated 
    
    //'if' statement check if cart is true(holds infromation) or false(ampty)
    if (cartParse) {

      //if the cart holds information, the forEach function will iterate through all the objects 
      //to find if some objects have the same id and color as the product that the user wants to add to the cart
      cartParse.forEach(function (product, key) {
        if (product.id == id &&
          product.color == productColor.value) {
            //if the function finds the product with the same id and color, 
            //the quantity of the product in local storage will be updated
            //by adding the quantity of the product the user selected to the quantity of the same product from local storage
          cartParse[key].quantity = parseInt(product.quantity) +
            parseInt(productQuantity.value);
            //new object will not be pushed to the local storage
          push = false;

          //update local storage
          cart = localStorage.setItem('cart', JSON.stringify(cartParse));
          cartParse = JSON.parse(localStorage.getItem('cart'));
        };
      });
    };

     //if local storage does not contain the product with the same id and color as the selected product by the user,
    //the 'productInfo' object will be pushed to the local storage
    if (push) {
      cartParse.push(productInfo);
//update local storage
      cart = JSON.stringify(cartParse);
      localStorage.setItem('cart', cart);
      cartParse = JSON.parse(cart);
    }
  };
};
//END OF PRODUCT.JS FILE


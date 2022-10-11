//https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams

//-----------------------------------------------------
//Milestone #4: Making links between the products on the homepage and on the product page
//Prints the entire href
const url = window.location
//Prints the entire parameter string
const queryString = window.location.search;
console.log(queryString); 
const urlParams = new URLSearchParams(queryString); 
//Milestone #5: Collecting the ID of a product you wish to display
const id = urlParams.get("id");
console.log(id); 
//-----------------------------------------------------


//-----------------------------------------------------
// fetching data on the products from the server
fetch('http://localhost:3000/api/products/')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            displayProductsDetails(data);

        })
//-----------------------------------------------------


//Milestone #6: Inserting a product and its details into a product page
function displayProductsDetails (productData) {
    let productImage = document.querySelector(".item__img");
    let productTitle = document.querySelector("#title");
    let productPrice = document.querySelector("#price");
    let productDescription = document.querySelector("#description");
    let productColor = document.querySelector("#colors");
    //??For each of the products from the homepage you will have to set up the “a” tag and the “href” property.
    for (product of productData){
        if (id === product._id) {
            productImage.innerHTML = `<img src=${product.imageUrl} alt=${product.altTxt}>`
            productTitle.textContent = `${product.name}`;
            productPrice.textContent = `${product.price}`;
            productDescription.textContent = `${product.description}`;
            //Color option
            for (let color of product.colors){
                productColor.innerHTML += `<option value=${color}>${color}</option>`
            }
        }
    }
}

//ADD to Cart Button 
//const productQuantity = document.querySelector("#quantity");
//console.log(productQuantity);

//const cartArray = {}


////////
//Getting HTML values from HTML
/////////
// Getting the quantity 
function productQuantityValue() {
    let productQuantity = document.getElementById("quantity").value;
    return productQuantity;
  }
  
  // Getting the color
  function productColorValue() {
    let productColor = document.getElementById("colors").value;
    return productColor;
  }
  
  // HTML element : button add to cart
  const cartButton = document.getElementById("addToCart");
  
  // at button press : toCartBtn, function addCart that activates the 2 other function by click
  cartButton.addEventListener("click", () => {
    let productQuantity = parseInt(productQuantityValue());
    let productColor = productColorValue();
    productAddToCart(id, productColor, productQuantity);
    
  });


  //checking if the cart has something 
  function getCart() {
    let items = []; 
    if (localStorage.getItem("cart") != null) {
      items = JSON.parse(localStorage.getItem("cart"));
    }
    return items;
  }
  
  function productAddToCart(productId, productColor, productQuantity) {
    if (productQuantity <= 0 || productColor == "") {
      console.log("warning!"); //!!!!!!to add a warning popup with the message
      return;
    }
    let items = getCart();
    if (items.length == 0) {
      items = [{
        id: productId, 
        color: productColor, 
        quantity: productQuantity}];
    } else {
      let exist = false;
      for (let i = 0; i < items.length; i++) {
        if (productId === items[i][0] && productColor === items[i][1]) {
          exist = true;
          items[i][2] += productQuantity;
        }
      }
      if (!exist) {
          items.push({
          id: productId, 
          color: productColor, 
          quantity: productQuantity});
      }
    }
    localStorage.setItem("cart", JSON.stringify(items));
  }
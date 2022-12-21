//----- Milestone #8: Displaying a recap table of purchases on the cart page -----

//Variable that holds parsed data from local storage
let cartParse = JSON.parse(localStorage.getItem('cart'));

// Collecting data from the API using the fetch() method. 
// Collected data contain descriptive information about the products.
fetch('http://localhost:3000/api/products/')
  .then(res => res.json())
  .then(data => {

    //Call the function to display product details by passing data from server as an argument
    displayCart(data);

    //Call the function to calculate and display the total price of all products in the cart
    //Function takes as an argument the data from API to extract the prices of products
    calcTotalPrice(data);
  });

//Function function that collects data from API and local storage and displays it on the cart page 
function displayCart(dataFromApi) {
  let cartParse = JSON.parse(localStorage.getItem("cart"));

  //Uncomment the following line to print the data stored in the local storage
  //console.log(cartParse)

  //'if' statement check is cart is true(holds infromation) or false(empty)
  if (cartParse) {

    //if the cart holds information, 
    //the 'for' will iterate through each object in the local storage
    for (let product of cartParse) {

      //Uncomment the following line to print the product info that is going to be passed by the next 'for' loop
      //console.log(product);

      //the 'for' loop iterates through each object in API
      for (let productData of dataFromApi) {

        //if the product ID from local storage equals the product ID from API,
        //the price and image URL from the API are assigned to the variables 
        //that later will be used to display it on the web page
        if (product.id === productData._id) {
          product.price = productData.price;
          product.image = productData.imageUrl;

          //Uncomment the following line to print the price of the product that is iterated.
          //console.log(product.price)

        };
      };
    };

    //Function takes as an argument 'cartParse' that holds data about products in the cart
    //if the cart is not empty, the function displays product details on the page
    //taking into consideration data extracted from API (price and URL image)
    displayInfoProductCart(cartParse);

  } else {
    //if the cart is empty, set the total quantity and total price to zero
    document.querySelector("#totalQuantity").innerHTML = "0";
    document.querySelector("#totalPrice").innerHTML = "0";
  };

  //Call the functions that check if the if some products were deleted or the quantity was changed
  changeQuantity();
  deleteProduct();
};

//the function that calculates and displays the total quantity of the products in the cart
//the function will take as an argument the data from API to access the price of the products
function calcTotalPrice(dataPriceFromAPI) {

  //Variable that holds parsed data from local storage
  let cartParse = JSON.parse(localStorage.getItem("cart"));

  //Uncomment the following line to print the list of objects from the local storage
  //console.log(cartParse)

  //Declaring the variable that will hold the value of the total price
  let updatePrice = 0;

  //'if' statement check is cart is true(holds infromation) or false(empty)
  if (cartParse) {
    //Uncomment the following line to print the length of the list of objects from the local storage
    //console.log(cartParse.length);


    //if the cart holds information, 
    //the 'for' will iterate through each object in the local storage
    for (let product of cartParse) {

      //the 'for' loop iterates through each object in API
      for (let productData of dataPriceFromAPI) {

        //Declaring the variable that will hold the value of the total price for each product
        let totalPrice = 0;

        //if the product ID from local storage equals the product ID from API,
        //the price from the API is assigned to the variables 
        if (product.id === productData._id) {
          product.price = productData.price;

          //Uncomment the following lines to print the id and quantity of the product passed in the 'for' loop
          //console.log(product.id)
          //console.log(product.quantity)

          //'totalPrice' variable is updated by calculating the total price for each product (price*qunatity)
          totalPrice = product.price * product.quantity;

          //Uncomment the following lines to print the the total price of the product passed in the 'for' loop
          //console.log(totalPrice);

          //Calculating the total price of all product in cart by adding total price of each products
          updatePrice += totalPrice;

          //Uncomment the following lines to print the the total price of the products in cart
          //console.log(updatePrice);

          //DOM manipulation to display total price on the web page
          const displayTotalPrice = document.getElementById("totalPrice");
          displayTotalPrice.textContent = updatePrice;
        };
      };
    };
  };
};

//Function that calculates and displays the total quantity of all products in the cart
function cartTotalQuantity() {
  //Declaring the variable that will hold the value of the total quantity of all products in cart
  let totalProductQuantityCart = 0;

  //the 'for' will iterate through each object in the local storage
  for (productQtt in cartParse) {

    //Declaring the variable that holds the quantity of proctuct from local storage that is passed through the loop 
    const calcFinalQtt = parseInt(cartParse[productQtt].quantity);

    //Uncomment the following line to print the quantity of proctuct from local storage that is passed through the loop
    //console.log(calcFinalQtt);

    //Calculating the total quantity of all product in cart by adding total quantity of each products
    totalProductQuantityCart += calcFinalQtt;

    //Uncomment the following line to print the quantity of all proctucts in cart
    //console.log(totalProductQuantityCart);
  };

  //DOM manipulation to display total quantity on the web page
  const updateQtt = document.getElementById("totalQuantity");
  updateQtt.textContent = totalProductQuantityCart;
};

//DOM manipulation to display product info on the web page
function displayInfoProductCart(productInfo) {

  //Selecting the class that displays product info 
  let productInfoCartPage = document.querySelector("#cart__items");

  //map() calls a function once for each element in an array. 
  //Iterates through product array and finds corresponding data to be displayed  
  productInfoCartPage.innerHTML += productInfo.map((product) =>
    `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
    <div class="cart__item__img">
      <img src="${product.image}" alt=${product.alt}>
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${product.name}</h2>
        <p>${product.color}</p>
        <p>${product.price} € </p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Quantity : </p>
          <input type="number" class="itemQuantity" 
          name="itemQuantity" min="1" max="100" value="${product.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Delete</p>
        </div>
      </div>
    </div>
  </article>`
  );

  //Calling the function to calculate and display the total quantity of the products in the cart
  cartTotalQuantity();
};

//-----Milestone #9: Dealing with any modifications or removals of products on the cart page

//Function reads the changes in the quantity of the product in a cart page and updates the local storage
function changeQuantity() {

  //Selecting the class to display product info
  let cartItems = document.querySelectorAll(".cart__item");

  //Uncomment the following line to print the list of objects from the local storage
  //console.log(cartParse)

  //The 'for' loop iterates through all products displayd on the cart page,
  for (let item of cartItems) {
    //add event listener to read the changes of quantity
    item.addEventListener('change', (event) => {

      //the 'for' loop will iterate through each object in the local storage
      for (product of cartParse) {

        //Check if product id and color of which quantity is changed equals to id and color of a product from local storage
        if (product.id === item.dataset.id && product.color === item.dataset.color) {

          //if the 'if' statement is true, the quantity on the page is updated
          product.quantity = event.target.value;

          //if quantity is changed, the local storage is updated with the new quantity
          localStorage.cart = JSON.stringify(cartParse);
          //update the quantity in local storage
          item.dataset.quantity = event.target.value;
          //the page to update the total price and quantity on the page 
          return location.reload();
        };
      };
    });
  };
};


function deleteProduct() {
  const deleteProduct = document.querySelectorAll('.deleteItem');

  //console.log(typeof deleteProduct)

  for (let product of deleteProduct) {

    product.addEventListener('click', (event) => {
      //console.log('buton pressed');
      

      event.preventDefault();

      for (product in cartParse) {
        if (product.id === product.dataset.id && product.color === product.dataset.color) {

          console.log(product.id);
          
          cartParse.splice(product, 1);
          localStorage.cart = JSON.stringify(cartParse);
          return location.reload();
        };
      };
    });
  };
};








const orderBnt = document.getElementById('order');
orderBnt.addEventListener('click', (event) => {

  event.preventDefault();

  console.log('button works')

  if (validControl()) {
    contactObjInit();
    postRequest();
  } else {
    formValidation();
  }

})

//get values from the inputs
//trim() - delete extra space





let contactObj = {
  firstName: firstName.value.trim(),
  lastName: lastName.value.trim(),
  address: address.value.trim(),
  city: city.value.trim(),
  email: email.value.trim()
}

function validateFirstName() {
  const firstName = document.getElementById('firstName');
  const firstNameValue = firstName.value.trim()
  const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");

  //let letters = /[a-zA-Z\s]+$/;
  if (/[a-zA-Z\s]+$/.test(firstNameValue)) {
    firstNameErrorMsg.innerHTML = " ";
    return true;
  } else {

    firstNameErrorMsg.innerHTML = "Add valid first name";
    return false;
  }
};

function validateLastName() {
  const lastName = document.getElementById('lastName');
  const lastNameValue = lastName.value.trim()
  const lastNameErrorMsg = document.getElementById('lastNameErrorMsg');

  if (/[a-zA-Z\s]+$/.test(lastNameValue)) {
    lastNameErrorMsg.innerHTML = " ";
    return true;
  } else {

    lastNameErrorMsg.innerHTML = "Add valid last name";
  }
};

function validateAddress() {
  const address = document.getElementById('address');
  const addressValue = address.value.trim()
  const addressErrorMsg = document.getElementById('addressErrorMsg');

  if (/\d{2}[ ]?\d{3}$/.test(addressValue)) {
    addressErrorMsg.innerHTML = " ";
    return true;
  } else {

    addressErrorMsg.innerHTML = "Add valid address";
  }
};

function validateCity() {
  const city = document.getElementById('city');
  const cityValue = city.value.trim()
  const cityErrorMsg = document.getElementById('cityErrorMsg');


  if (/[a-zA-Z\s]+$/.test(cityValue)) {
    cityErrorMsg.innerHTML = " ";
    return true;
  } else {

    cityErrorMsg.innerHTML = "Add valid address";
  }
};

function validateEmail() {
  const email = document.getElementById('email');
  const emailValue = email.value.trim()
  const emailErrorMsg = document.getElementById('emailErrorMsg');

  if (/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(emailValue)) {
    emailErrorMsg.innerHTML = " ";
    return true;
  } else {

    emailErrorMsg.innerHTML = "Add valid address";
  }
}

function validControl() {
  if (validateFirstName() && validateLastName() && validateCity() && validateAddress() && validateEmail()) {
    return true;
  } else {
    return false;
  }
}

function formValidation() {
  validateFirstName();
  validateLastName()
  validateAddress()
  validateCity()
  validateEmail()
};

function contactObjInit() {
  if (validControl()) {
    contactObj = {
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      address: address.value.trim(),
      city: city.value.trim(),
      email: email.value.trim()
    }

    localStorage.setItem('contactObj', JSON.stringify(contactObj));
    console.log('check passed');
  }
}



//let cartParseObj = JSON.parse(localStorage.getItem('contactObj'));
//console.log(cartParseObj);

const productIdTable = [];

function productTable() {

  let cartParse = JSON.parse(localStorage.getItem("cart"));
  console.log(cartParse)
  for (product of cartParse) {
    //console.log(product.id)
    productIdTable.push(product.id);
  }
  console.log(productIdTable);
}

//https://tecadmin.net/generate-random-string-in-javascript/
function genRandonString(length) {
  let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*-_';
  let charLength = chars.length;
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charLength));
  }
  return result;
}

function postRequest() {
  productTable()
  contactObjInit()

  console.log(contactObj);
  console.log(productIdTable);

  const dataToPOST = {
    productIdTable,
    contactObj,
  };

  console.log(dataToPOST);


  fetch("http://localhost:3000/api/products/order", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dataToPOST
      })
    })
    .then(response => response.json())
    //.then(response => console.log(JSON.stringify(response)))
    .then((data) => {
      let confirmationUrl = "./confirmation.html?id=" + genRandonString(15);
      window.location.href = confirmationUrl;
    })

    .catch(() => {
      alert("Error");
    }); // catching errors
}
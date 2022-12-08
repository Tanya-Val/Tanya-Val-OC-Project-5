let cartParse = JSON.parse(localStorage.getItem('cart'));

// fetching data on the products from the server to have acces to the product details
fetch('http://localhost:3000/api/products/')
  .then(res => res.json())
  .then(data => {
    //console.log(data);
    //call the function to display product details by passing data from server as an argument
    displayCart(data);
    calcTotalPrice(data);

  });


function displayCart(dataFromApi) {
  let cartParse = JSON.parse(localStorage.getItem("cart"));
  console.log(cartParse)

  if (cartParse && cartParse.length != 0) {
    // zone de correspondance clef/valeur de l'api et du panier grâce à l'id produit choisit dans le localStorage
    for (let product of cartParse) {
      console.log(product);

      for (let productData of dataFromApi) {
        if (product.id === productData._id) {
          //product.name = productData.name;
          product.price = productData.price;
          product.image = productData.imageUrl;
          //product.description = productData.description;
          //product.alt = productData.altTxt;

          console.log(product.price)

        }
      }
    }

    displayInfoProductCart(cartParse);

  } else {
    document.querySelector("#totalQuantity").innerHTML = "0";
    document.querySelector("#totalPrice").innerHTML = "0";

  }

  changeQuantity();
  deleteProduct();

}


function calcTotalPrice(dataPriceFromAPI) {
  let cartParse = JSON.parse(localStorage.getItem("cart"));
  console.log(cartParse)

  let updatePrice = 0;

  if (cartParse && cartParse.length != 0) {
    //console.log(cartParse.length);
    for (let product of cartParse) {
      for (let productData of dataPriceFromAPI) {
        let totalPrice = 0;
        if (product.id === productData._id) {
          product.price = productData.price;

          console.log(product.id)
          console.log(product.quantity)
          totalPrice = product.price * product.quantity;

          //console.log(totalPrice);
          updatePrice += totalPrice;

          //console.log(updatePrice);

          const displayTotalPrice = document.getElementById("totalPrice");
          displayTotalPrice.textContent = updatePrice;

        }
      }
    }
  };
};


//-------Milestone #8: Displaying a recap table of purchases on the cart page
function displayInfoProductCart(productInfo) {

  let productInfoCartPage = document.querySelector("#cart__items");
  // map() calls a function once for each element in an array. Iteration throug all product array and finds corresponding data to be displayed 
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

  )
  cartTotalProductAndPrice();
  //cartTotalPrice();
}


//display total products and total price
function cartTotalProductAndPrice() {
  let totalProduct = 0;

  for (productQtt in cartParse) {
    const calcFinalQtt = parseInt(cartParse[productQtt].quantity);
    //console.log(calcFinalQtt);
    totalProduct += calcFinalQtt;
    console.log(totalProduct);
  }
  const updateQtt = document.getElementById("totalQuantity");
  updateQtt.textContent = totalProduct;
};


//-----Milestone #9: Dealing with any modifications or removals of products on the cart page
//-----change quantity. add new quantity to the local storage
function changeQuantity() {
  let cartItems = document.querySelectorAll(".cart__item");

  console.log(cartParse)

  for (let item of cartItems) {
    item.addEventListener('change', (event) => {
      console.log("function work!")
      for (product of cartParse) {
        if (product.id === item.dataset.id && product.color === item.dataset.color) {

          product.quantity = event.target.value;
          localStorage.cart = JSON.stringify(cartParse);
          // update
          item.dataset.quantity = event.target.value;
          return location.reload();
        }
      };
    });
  };
};

function deleteProduct() {
  const deleteProduct = document.querySelectorAll('.deleteItem');

  console.log(typeof deleteProduct)

  for (let productOnpage of deleteProduct) {

    productOnpage.addEventListener('click', (event) => {
      console.log('buton pressed');
      //console.log(typeof product);

      //event.preventDefault();

      for (product in cartParse) {
        if (product.id === productOnpage.dataset.id && product.color === productOnpage.dataset.color) {

          console.log(product.id);
          cartParse.splice(product, 1);
          localStorage.cart = JSON.stringify(cartParse);
          return location.reload();
        };
      };

    });

  }
}



const orderBnt = document.getElementById('order');
orderBnt.addEventListener('click', (event) => {

  event.preventDefault();

  console.log('button works')

  formValidation();
  validControl();
  
  contactObjInit();

  postRequest ();
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
  if (validateFirstName() && validateLastName() && validateCity() && validateAddress() && validateEmail() === true) {

    return true;
  } else {
    alert('Please, check the validity of entered data')
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
  if (validControl() === true){
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


function postRequest (){
  productTable()
  contactObjInit()

  console.log(contactObj);
  console.log(productIdTable);


}


//vvvvv



//(\d{1,}) [a-zA-Z0-9\s]+(\.)? [a-zA-Z]+(\,)? [A-Z]{2} [0-9]{5,6}

/*
//--------------form check
function postForm() {
  const order = document.getElementById('order');
  order.addEventListener('click', (event) => {
    event.preventDefault();


    const contact = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      address: document.getElementById('address').value,
      city: document.getElementById('city').value,
      email: document.getElementById('email').value
    }


    function controlFirstName() {
      const validFirstName = contact.firstName;
      if (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/.test(validFirstName)) {
        return true;
      } else {
        let firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
        firstNameErrorMsg.innerText = "min 3 characters";
      }
    }


    function controlName() {
      const validName = contact.lastName;
      if (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/.test(validName)) {
        return true;
      } else {
        let lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
        lastNameErrorMsg.innerText = "min 3 characters";
      }
    }


    function controlAddress() {
      const validAddress = contact.address;
      if (/\d{2}[ ]?\d{3}$/.test(validAddress)) {
        return true;
      } else {
        let addressErrorMsg = document.getElementById('addressErrorMsg');
        addressErrorMsg.innerText = "add error message";
      }
    }


    function controlCity() {
      const validAddress = contact.city;
      if (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,10}$/.test(validAddress)) {
        return true;
      } else {
        let cityErrorMsg = document.getElementById('cityErrorMsg');
        cityErrorMsg.innerText = "Merci de vérifier le nom de la ville, 3 caractères minimum, avec des lettres uniquement";
      }
    }


    function controlEmail() {
      const validEmail = contact.email;
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(validEmail)) {
        return true;
      } else {
        let emailErrorMsg = document.getElementById('emailErrorMsg');
        emailErrorMsg.innerText = "Erreur ! Email non valide";
      }
    }


    function validControl() {
      if (controlFirstName() && controlName() && controlAddress() && controlCity() && controlEmail()) {
        localStorage.setItem('contact', JSON.stringify(contact));
        return true;
      } else {
        alert('Merci de revérifier les données du formulaire')
      }
    }
    validControl()


    const sendFormData = {
      contact,
      products,
    }



    const options = {
      method: 'POST',
      body: JSON.stringify(sendFormData),
      headers: {
        'Content-Type': 'application/json',
      }
    };

    fetch("http://localhost:3000/api/products/order", options)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('orderId', data.orderId);
        if (validControl()) {
          document.location.href = 'confirmation.html?id=' + data.orderId;
        }
      });

  })
}
postForm();*/
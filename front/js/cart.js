let cartParse = JSON.parse(localStorage.getItem('cart'));
console.log(cartParse);

//-------Milestone #8: Displaying a recap table of purchases on the cart page

const itemInCart = document.getElementById('cart__items');

for (let product of cartParse) {


  itemInCart.innerHTML += `
    
    <article class="cart__item" data-id="${product.id}" data-color="${product.color}">
                <div class="cart__item__img">
                  <img src="${product.imageUrl}" alt=${product.altTxt}>
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
              </article>
    
    `
};

/* addEventListener('input', function () {
    let changeQnt = document.getElementsByClassName('.itemQuantity');
    console.log(changeQnt);
    for (let i = 0; i < changeQnt.length; i++) {
        changeQnt[i].addEventListener('change', (event) => {
            let productQnt = event.target.value;
            console.log(productQnt);
            if (productQnt == 0 || productQnt > 99) {
                console.error("Can not order 0 or more than 99 products");
                productQnt = `${cartParse[i].quantity}`;
            } else {
                cartParse.map((prodObj) => {
                    if (prodObj.id == cartParse[i].id, prodObj.color == cartParse[i].color) {
                        prodObj.quantity = parseInt(productQuantity);
                    };
                });

                localStorage.setItem('cart', JSON.stringify(cartParse));
            };
        });
    };
}); */


//-----Milestone #9: Dealing with any modifications or removals of products on the cart page
//-----change quantity. add new quantity to the local storage
function changeQuantity() {
  let cartItems = document.querySelectorAll(".cart__item");


  cartItems.forEach((changeQnt) => {
    changeQnt.addEventListener('change', (event) => {
      console.log("function work!")
      for (article of cartParse)
        if (article.id === changeQnt.dataset.id &&
          changeQnt.dataset.color === article.color) {

          article.quantity = event.target.value;
          localStorage.cart = JSON.stringify(cartParse);
          // update
          changeQnt.dataset.quantity = event.target.value;
        };
    });
  });

  /* 
      if (newqtt == 0 || newqtt > 99) {
          console.error("Can not order 0 or more than 99 products");
          // the value is not 
      };
   });*/
   
};

changeQuantity();



//----------------------------
//display total products and total price
function cartTotalProductAndPrice() {
  let totalProduct = 0;
  let totalPrice = 0;

  for (productQtt in cartParse) {
    const calcFinalQtt = parseInt(cartParse[productQtt].quantity);
    totalProduct += calcFinalQtt;

    const calcFinalPrice = parseInt(cartParse[productQtt].quantity) * parseInt(cartParse[productQtt].price)
    totalPrice += calcFinalPrice;
  };

  /* cartToChangePrice.forEach((changePrice) => {
//console.log(changePrice)
    totalProduct += parseInt(changePrice.dataset.quantity);
    //console.log(totalProduct);
    totalPrice = changePrice 

  });*/
  const updateQtt = document.getElementById("totalQuantity");
  updateQtt.textContent = totalProduct;

  const updatePrice = document.getElementById("totalPrice");
  updatePrice.textContent = totalPrice;
};

cartTotalProductAndPrice();


function deleteProduct() {
  const deleteProduct = document.querySelectorAll('.deleteItem');
  console.log('buton pressed')
  for (let i = 0; i < deleteProduct.length; i++) { 
    deleteProduct[i].addEventListener('click', (event) => {
    event.preventDefault();

    // enregistrer l'id et la couleur séléctionnés par le bouton supprimer
    let deleteId = cartParse[i].id;
    let deleteColor = cartParse[i].color;

    // filtrer l'élément cliqué par le bouton supprimer
    // en respectant les conditions du callback
    cartParse = cartParse.filter( elt => elt.id !== deleteId || elt.color !== deleteColor);
      
    // envoyer les nouvelles données dans le localStorage
    localStorage.setItem('cart', JSON.stringify(cartParse));

    window.location.href = "cart.html";
    });
  }
}

deleteProduct()



//--------------form check
function postForm() {
  const order = document.getElementById('order');
  order.addEventListener('click', (event) => {
  event.preventDefault();

  
  const contact = {
    firstName : document.getElementById('firstName').value,
    lastName : document.getElementById('lastName').value,
    address : document.getElementById('address').value,
    city : document.getElementById('city').value,
    email : document.getElementById('email').value
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
          document.location.href = 'confirmation.html?id='+ data.orderId;
        }
    });

}) 
} 
postForm();


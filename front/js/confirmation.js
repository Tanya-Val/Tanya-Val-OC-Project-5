//Collecting and storing href into a variable
const str = window.location;

//Returns a created URL object representing the URL defined by the parameters
const url = new URL(str);

//Get ID from URL parameter
const id = url.searchParams.get("id");

//Manipulating the DOM to display the order ID
const orderId = document.getElementById("orderId");
orderId.innerHTML = id;

//localStorage.clear();
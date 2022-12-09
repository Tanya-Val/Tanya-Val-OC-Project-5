// Collecting data from the API using the fetch() method. 
// Collected data contain descriptive information about the products. 
fetch('http://localhost:3000/api/products/')
        .then(res => res.json())
        .then(data => {
                //Uncomment next line to print the data from API
                //console.log(data);

                //The function displays product details from API on the home page using DOM
                displayProducts(data);
        })


//-----Milestone #3: Inserting the products into the homepage-----
//Inserting all of the products from the API into the website using DOM.

//Function is called in the fetch() method with data from API as an argument.
//Data is passed through the "for" loop to display product details on the home page using DOM
function displayProducts(itemList) { 
        let productDisplay = document.querySelector("#items")
        
        for (let i in itemList) {
                productDisplay.innerHTML += `
                <a href="./product.html?id=${itemList[i]._id}">
                <article>
                <img src="${itemList[i].imageUrl}" alt="${itemList[i].altTxt}">
                <h3 class="productName">${itemList[i].name}</h3>
                <p class="productDescription">${itemList[i].description}</p>
                </article>
                </a>
                `
        };
};
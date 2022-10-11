// fetching data on the products from the server
fetch('http://localhost:3000/api/products/')
        .then(res => res.json())
        .then(data => {
                console.log(data);
                displayProducts(data);
        })



//
//Milestone #3: Inserting the products into the homepage
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
        }
}
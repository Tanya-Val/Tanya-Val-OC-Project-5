// fetching data on the products from the server
fetch('http://localhost:3000/api/products/')
        .then(res => res.json())
        .then(data => {
                //console.log(data);
                displayProducts(data);
        })

const productItems = document.getElementById('items');
const itemsListLength = itemList.length;

function displayProducts(itemList) {
        for (let i = 0; i < itemList.length; i++) {
                let productForm = `
                <a href="./product.html?id=${itemList[i]._id}">
                <article>
                <img src="${itemList[i].imageUrl}" alt="${itemList[i].altTxt}">
                <h3 class="productName">${itemList[i].name}</h3>
                <p class="productDescription">${itemList[i].description}</p>
                </article>
                </a>
                `
                console.log(itemList[i]);
                items.insertAdjacentHTML('beforeend', productForm)
        }
}
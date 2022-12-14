# Kanap #

This is the front end and back end server for Project 5 of the Web Developer path.

### Back end Prerequisites ###

You will need to have Node and `npm` installed locally on your machine.

### Back end Installation ###

Clone this repo. From the "back" folder of the project, run `npm install`. You 
can then run the server with `node server`. 
The server should run on `localhost` with default port `3000`. If the
server runs on another port for any reason, this is printed to the
console when the server starts, e.g. `Listening on port 3001`.

###General Architecture
The online app will be made up of 4 pages:

A homepage which will (dynamically) display all of the articles that are available for purchase

A “product” page which will (dynamically) display the details of the product that the user clicked on when on the homepage. From the product page users will be able to select the required quantity and colour and then add the product to the cart

A “cart” page. This page will contain several parts:
    
    - A summary of the products in the cart and the total price. Users should be
able to change the quantity of product or to completely remove a product from
the cart
    
    - A form to be submitted in order to confirm the order. The data entered into
this form should be correct and properly formatted before it is sent to the back
end, for example there should be no numbers in the name field.

A “confirmation” page:
   
   - An order confirmation message thanking the user for their order and displaying the order number sent by the API

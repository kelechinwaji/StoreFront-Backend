# FORTE API DOCUMENTATION

FORTE is an E-commerce mall that has a in-built cart functionality to store products and show products.
To access the products a client would need to create a user account and perform Crud(Create, view, update and delete) operation on the cart.

### API STRUCTURE

The API have the following models
#### Users

* Index
* Show 
* Create
* Login [token required]
* Update [token required]
* Delete [token required]

#### Products

* Index
* Show
* Create [token required]
* Update [token required]
* Delete [token required]
* Products by Category

#### Orders

* Index
* Show
* Create [token required]
* Complete Orders [token required]
* Current Orders [token required]
* User Orders [token required]
* Delete [token required]


### Data Shapes

The database  has the following schema

#### User

* id [Serially generated]
* First Name
* Last Name
* Password

#### Products

* id [Serially generated]
* Name
* Price
* Category

#### Orders

* id [Serially generated]
* User Id
* Status

#### Order Products

* id [Serially generated]
* Quantity
* Order id
* Product id

### API Endpoints
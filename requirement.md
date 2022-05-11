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

The default port is set to `5000`, although you can change it to what you prefer.

#### Users

* To create a new user, follow these steps

`Method: POST`
Url `/users`

1. Then include the details on the payload:

{
    firstName: "",
    lastName: "",
    password: "",
    userName: ""
}

2. Response

 Success: Status code 200

 Error: status code 404

* Show Single User

`Method: GET`
Url `/user/:id`

1. Response

 Success: Status code 200

 Error: status code 404

* Show All User

`Method: GET`
Url `/users/`

1. Response

 Success: Status code 200

 Error: status code 404

* Login to user account

`Method: POST`
Url `/login`

1. Then include the details on the payload:

{
    userName:  "",
    password: "",
}

2. Response

 Success: Status code 200

 Error: status code 404


* Update user account

`Method: PATCH`
Url `/login/:id`

1. Then include the details on the payload:

{
    firstName: "",
    lastName: ""
}

2. Response

 Success: Status code 200

 Error: status code 404


* Delete user account

 `Method: DELETE`
Url `/user/:id`

1. Response

 Success: Status code 200

 Error: status code 404


 #### Products

* To create a new product, follow these steps

`Method: POST`
Url `/products`

1. Then include the details on the payload:

{
    Name: "",
    Price: "",
    Category: "",
}

2. Response

 Success: Status code 200

 Error: status code 404


* Show Single products

`Method: GET`
Url `/products/:id`

1. Response

 Success: Status code 200

 Error: status code 404


* Show all products

`Method: GET`
Url `/products/`

1. Response

 Success: Status code 200

 Error: status code 404

* To update existing product, follow these steps

`Method: PUT`
Url `/products/:id`

1. Then include the details on the payload:

{
    Name: "",
    Price: "",
    Category: "",
}

2. Response

 Success: Status code 200

 Error: status code 404


* Show Delete products

`Method: DELETE`
Url `/products/:id`

1. Response

 Success: Status code 200

 Error: status code 404

  
#### Orders

* To create a new Order, follow these steps

`Method: POST`
Url `/order`

1. Then include the details on the payload:

{
    UserId: "",
    Status: ""
}

2. Response

 Success: Status code 200

 Error: status code 404


* Show Single order

`Method: GET`
Url `/order/:id`

1. Response

 Success: Status code 200

 Error: status code 404


* Show all Orders

`Method: GET`
Url `/orders/`

1. Response

 Success: Status code 200

 Error: status code 404


* Show Completed Orders

`Method: GET`
Url `/order/complete/:id`

1. Response

 Success: Status code 200

 Error: status code 404


* Show Current Orders

`Method: GET`
Url `/order/current/:id`

1. Response

 Success: Status code 200

 Error: status code 404


* Show User Orders

`Method: GET`
Url `/order/show/user/:id`

1. Response

 Success: Status code 200

 Error: status code 404


* Delete Orders

`Method: DELETE`
Url `/order/:id`

1. Response

 Success: Status code 200

 Error: status code 404

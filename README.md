# FORTE-STOREFRONT(Backend).

#### FORTE is an E-commerce mall, that uses API's to display products available for purchase.

# API FUNCTIONALITY

An MVC model architecture is used in building the restful api which connects to a postgreSQL database for storing, retrieving data and performing advanced crud functionality.  Implementing Jason Web tokens to provide stateless authenticated access for retrieving and storing data in persistent storage.

The available API's for FORTE provides these Endpoints:

* Create, update and delete users account.
* Get all user account.
* Authenticate user account.
* Create products for display.
* Get all products available.
* View products by category.
* View single product.
* update and delete products.
* Create orders by authenticated users.
* Get all orders by specific status.
* Show orders by users.
* Delete orders

## Tools and Technology

FORTE was built with a list of modern tools and technology:

* [Node](https://nodejs.org/en/):Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
* [TypeScript](https://www.typescriptlang.org/): TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
* [PostgreSQL](https://www.postgresql.org/): PostgreSQL is a powerful, open source object-relational database system
* [JasonWebTokens](https://jwt.io/): JWT allows you to decode, verify and generate JWT.
* [ExpressJs](https://expressjs.com/): Fast, un-opinionated, minimalist web framework for Node.js
* [Jasmine](https://jasmine.github.io/): Jasmine for testing
* [Es-lint](https://eslint.org/): Find and fix problems in your code
* [Prettier](https://prettier.io/): For formatting code 

These tools listed are available on the `package.json` file.

* Please Note: Node and PostgreSQL would need to be installed on your local machine.


## Installation and Environment Setup

The setup require few easy steps, the steps are listed below:

* On your local terminal, Clone the repository

`git clone https://github.com/kelechinwaji/StoreFront-Backend`

Ensure to Change directory `cd StoreFront-Backend`

* Setup the node-modules to access the packages and dependencies run `npm install` on your terminal.

* To start the application run `npm run dev` 

Yaay!! you should see a `app listening on port 5000`

### Setting up Database

* You might need to specify your password on the `database.json` file

* Next create the necessary database on postgres

`CREATE DATABASE fantex;
CREATE DATABASE fantex_test;
 `

 ### API ENDPOINTS

 A detailed description of api usage is available on the `requirement.md` file available on this repository.

  ### Jasmine Test

  To test the endpoints run the following commands:

  `npm run testing`

  This command would set up the migration tables on the test database.

  To test the models and endpoints run the following commands :

  `npm run testing-db`

  To drop the tables on the test database run the following commands :

  `drop-test-db`

### Let me know if you like this

* Give a ⭐  to this project

* If you would like to contribute, please do!

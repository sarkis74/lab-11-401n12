![CF](http://i.imgur.com/7v5ASc8.png)  

# 401N12-Lab-11-Authentication
[![Build Status](https://travis-ci.org/sarkis74/lab-11-401n12.svg?branch=master)](https://travis-ci.org/sarkis74/lab-11-401n12)  
=================================================

### Author: Sarkis Aghazarian

### Links and Resources
![github](https://github.com/sarkis74/lab-11-401n12)  
![heroku](https://lab-11-401n12.herokuapp.com/)  
![travis](https://travis-ci.org/sarkis74/lab-11-401n12)


### Modules
#### `server.js`
#### `index.js`
##### Exported Values and Methods

###### 



### Setup
* npm i supertest
* env.PORT || 3000


#### Running the app
* `npm start`

#### Tests
`npm run test`


##### Assertions
* login fails for a user with the incorrect basic credentials
* login succeeds for a user with the incorrect basic credentials
* returns error when unauthorized user tries to GET /books
* returns books when unauthorized user tries to GET /books
* can create a new user
* can signin a user

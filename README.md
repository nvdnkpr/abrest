# Abrest [![Build Status](https://secure.travis-ci.org/jamescostian/abrest.png?branch=master)](https://travis-ci.org/jamescostian/abrest) [![Dependency Status](https://gemnasium.com/jamescostian/abrest.png)](https://gemnasium.com/jamescostian/abrest)

**Ab**straction for dealing with **REST**ful services so your can always be *abreast*.

Abrest works on both the client and the server side (assuming your server side is running Node.JS). If you have any AMD setup (e.g. RequireJS or Almond), Abrest will use that. Otherwise, Abrest will just attach itself to the `this` variable (which is usually going to be `window`).

## Installation
To install Abrest for your client side, you can run `bower install abrest` and to install it for your server-side (assuming you're using Node.JS) you can run `npm install abrest`

## API
```javascript
// Creates an instance of Abrest in the variable 'user' and sets '/api' is the
// base URL. In addition, {id: 5379} will be set as the default data that will
// always be sent unless it is overriden. Also, {'user-agent': 'abrest'} is set
// as the default header that will be sent unless it is overriden.
var user = new Abrest('/api/', {id: 5379}, {'user-agent': 'abrest'})

// Sends a GET request from the 'user' instance of Abrest. The URL that it will
// get is '/api/name' (because '/api/' is the base URL for the 'user' instance)
// and all of the default headers will be sent, none of which will be overriden
user.get('name', function (error, result) {
    if (error) {
        throw error
    }
    else {
        // result (should) be the user's name
    }
})

// Sends a POST request from the 'user' instance of Abrest. The URL that it
// will get is '/api/favorite_color' and the data that it will send will be
// a combination of the default data and {foo: 'bar'}. Also, because there
// aren't any headers here, the default ones will be used.
user.delete('favorite_color', {foo: 'bar'}, function (error, result) {
    if (error) {
        throw error
    }
    else {
        // restult (should) be the user's favorite color
    }
})
// And also Abrest (should) support POST and PUT
```

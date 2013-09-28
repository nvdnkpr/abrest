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

## Advanced Options
When you create an instance of Abrest, you can modify some of that instance's properties. Here's an example:
```javascript
var user = new Abrest() // Creates a new instance of Abrest

// Sets the request timeout to 0, which means that it will never timeout.
// The default timeout is 1000 (which is 1 second).
user.timeout = 0

// Sets the default headers to {foo: 'bar'}. So, if a request is sent without
// any headers, then Abrest will still send the header 'foo: bar'. In order to
// override this header, one must send a request with a header that
// specifically sets 'foo' to something else.
user.defaultHeaders = {foo: 'bar'}

// Sets the default data to {foo: 'bar'}. So, if a request is sent without
// any data, then Abrest will still send the data 'foo=bar'. In order to
// override this data, one must send a request with a data that specifically
// sets 'foo' to something else.
user.defaultData = {foo: 'bar'}
```

## Side Note for Client-Side
In the client-side, it's almost always good to set the `content-type` header to `application/x-www-form-urlencoded`.
So that's what Abrest does.

If you don't want that header to be sent, all you have to do is override it by giving a new default `content-type` header or by giving a new header in the actual request.

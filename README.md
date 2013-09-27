# Abrest [![Build Status](https://secure.travis-ci.org/jamescostian/abrest.png?branch=master)](https://travis-ci.org/jamescostian/abrest) [![Dependency Status](https://gemnasium.com/jamescostian/abrest.png)](https://gemnasium.com/jamescostian/abrest)

**Ab**straction for dealing with **REST**ful services so that your client side can be *abreast* of your server side

Please note that Abrest is for the *client* side **only**.

## Installation
`bower install Abrest`

## API
```javascript
var user = new Abrest('/api') // '/api' is the base URL

user.get('name', function (error, result) {
    if (error) {
        throw error
    }
    else {
        // result (should) be the user's name
    }
})
user.delete('favorite_color', function (error, result) {
    if (error) {
        throw error
    }
})
// And also Abrest (should) support POST and PUT
```

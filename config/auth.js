// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '979040215534553', // your App ID
        'clientSecret'  : '2c920e705229afac9c6a7cc7d7d56b5b', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },

    'githubAuth' : {
        'clientID'      : '979040215534553', // your App ID
        'clientSecret'  : '2c920e705229afac9c6a7cc7d7d56b5b', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    }

};

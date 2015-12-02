var htmlparser = require('htmlparser2'),
	request = require('request'),
	iconv  = require('iconv-lite'),
	q = require('q');

iconv.extendNodeEncodings();

function getJoke(options) {
	var deferred = q.defer();
  request.get({
    url: 'http://api.icndb.com/jokes/random/',
    json: true
  }, function (error, response, body) {
    if(!error && response.statusCode == 200 && body && body.type === 'success') {
      deferred.resolve([body.value.joke]);
    } else {
      deferred.reject();
    }
  });
  return deferred.promise;
}

exports.get = getJoke;

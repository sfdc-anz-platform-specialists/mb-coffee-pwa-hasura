var request = require('request');
var options = {
  'method': 'GET',
  'url': 'http://localhost:8080/getcoffee',
  'headers': {
  }
};
request(options, function (error, response) { 
  if (error) throw new Error(error);
  console.log(response.body);
});

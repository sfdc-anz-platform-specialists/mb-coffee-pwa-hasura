var express = require('express');
var app = express();
var path = require('path');


var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://mb-hasura-mikebnibs3.herokuapp.com/v1alpha1/graphql',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query: 'query  {\n  salesforce_coffee__c {\n    id\n    image__c\n    name\n    origin__c\n    price__c\n    skuid__c\n    stockonhand__c\n  }\n  \n}',
    variables: {}
  })
};

const gql = require('graphql-tag');

  const coffees = {
    "data": {
      "coffees": [
        {
          "id": 2,
          "image": "images/coffee1.jpg",
          "name": "Perspiciatis",
          "origin": "Brazil",
          "price": 12.34
        },
        {
          "id": 3,
          "image": "images/coffee2.jpg",
          "name": "Voluptatem",
          "origin": "Ecuador",
          "price": 12.78
        }
      ]
    }
  }

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile('index.html');
});

app.get('/oldgetcoffee', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(coffees));
});

app.get('/getcoffee',function (req, res) {
    
      request(options, function (error, response) { 
        if (error) throw new Error(error);
        console.log(response.body);
        res.send((response.body));
      });
  
  
    });


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));

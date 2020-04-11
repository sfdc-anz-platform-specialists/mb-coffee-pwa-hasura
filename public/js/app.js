const container = document.querySelector(".container")
/*
const coffees = {[
  { name: "Perspiciatis",origin:"Brazil",price: 12.34,stockonhand: 25, image: "images/coffee1.jpg" },
  { name: "Voluptatem", origin:"Brazil",price: 12.34,stockonhand: 25, image: "images/coffee2.jpg" },
  { name: "Explicabo", origin:"Guatemala",price: 12.34,stockonhand: 25, image: "images/coffee3.jpg" },
  { name: "Rchitecto", origin:"Brazil",price: 12.34,stockonhand: 25, image: "images/coffee4.jpg" },
  { name: " Beatae", origin:"Ecuador",price: 12.34,stockonhand: 25, image: "images/coffee5.jpg" },
  { name: " Vitae", origin:"Brazil",price: 12.34,stockonhand: 25, image: "images/coffee6.jpg" },
  { name: "Inventore", origin:"Italy",price: 12.34,stockonhand: 25, image: "images/coffee7.jpg" },
  { name: "Veritatis",origin:"Colombia",price: 12.34,stockonhand: 25, image: "images/coffee8.jpg" },
  { name: "Accusantium",origin:"Sri Lanka",price: 12.34,stockonhand: 25, image: "images/coffee9.jpg" },
]}
*/

//const coffees = {data:[{ name: "Perspiciatis",origin:"Brazil",price: 12.34,stockonhand: 25, image: "images/coffee1.jpg" },{ name: "Voluptatem", origin:"Brazil",price: 12.34,stockonhand: 25, image: "images/coffee2.jpg" }]};

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



  function showCoffees(kafee) {
    console.log('showCoffees() -  Rendering:', JSON.stringify(kafee));
    let output = ""
    var json=JSON.stringify(kafee);
    for (var i=0; i<kafee.data.salesforce_coffee__c.length; i++) {
      var obj = kafee.data.salesforce_coffee__c[i];
      output += `
              <div class="card">
                <img class="card--avatar" src=${obj.image__c} />
                <h1 class="card--title">${obj.skuid__c} - ${obj.name}</h1>
                <p>Price: $${obj.price__c}</p>
                <p>Stock on hand: ${obj.stockonhand__c}</p>
                <p>Origin: ${obj.origin__c}</p>
                <a class="card--link" href="#">Taste</a>
              </div>
              `
} 
  container.innerHTML = output
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}

document.addEventListener("DOMContentLoaded", showCoffees)

function getFromNetwork() {
  console.log('getFromNetwork() - fetching /getCoffee');
  return fetch('/getcoffee')
  .then((resp) => resp.json()) // Transform the data into json
  .then(function(data) {
    console.log(data);
    return data;
    // Create and append the li's to the ul
    })
  }

  function getFromCache() {
    // CODELAB: Add code to get weather forecast from the caches object.
    console.log('getFromCache()');

    if (!('caches' in window)) {
    return null;
  }


  
  const url = '/getcoffee';
  console.log('getFromCache() - url: ', url);

  return caches.match(url)
      .then((response) => {
        if (response) {
          console.log('getFromCache() - found a cache entry: ',url); 
          return response;
        }
        console.log('getFromCache(): not found here: ', url);
        return null;
      })
      .catch((err) => {
        console.error('getFromCache() - Error getting data from cache: ', err);
        return null;
      });
  }




function updateData() {

console.log('updateData() - calling getFromCache()');
getFromCache()
 .then((data) => {
  if (data) {data.json().then(function(parsedJson) {
  console.log('updateData(): Received from Cache: ', parsedJson);
  showCoffees(parsedJson);
  })
}
 });
 
 console.log('updateData() - calling getFromNetwork()');
 getFromNetwork()
  .then((data) => {
    console.log('updateData() - Received from Network: ', JSON.stringify(data)); 
    showCoffees(data);
  });
}

function init() {
  console.log('Init() - calling updateData() ');
  updateData();
  document.getElementById('butRefresh').addEventListener('click', updateData);
}


init();
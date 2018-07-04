# WebSocket 

## Description: 
A Websocket developed in Node.js hosted on a Heroku server to make a link between a browser and a tool for generating data. It allows to generate these data:

- / now: to retrieve the instantaneous values of the current index of a city every second.
- / day: to retrieve the instantaneous values of the current index of a city every second + all values of the day since 00: 00: 01 + 00: 00
- / today: to retrieve all the values of the day since 00: 00: 01 + 00: 00
- / last24 : to retrieve the last 24h values
- / year: to retrieve the opening + closing index of all the last days elapsed.

## Installation:
- Deploy the files on your server.
- Using **npm** : Type the `````npm install````` command to install all the modules in package.json
- Launch server.js

## Usage: 
### Authentication : 
Use `````jsonwebtoken````` module to secure webscoket. <br/>Documentation here : 
https://github.com/auth0/node-jsonwebtoken 
**Exemple** : `````token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1MzAyNjM3MDd9.jGuM_vciKXZehZtIs6wXCbmaDjOylnX6BvZyYsTGzT0`````

### Init the WebSocket (Client)
To get the instant value : 
`````
var socket = io('wss://salty-bastion-25542.herokuapp.com', {
   query: {
      token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1MzAyNjM3MDd9.jGuM_vciKXZehZtIs6wXCbmaDjOylnX6BvZyYsTGzT0",
      ville: "Paris",
      date: "12/12/2018,
      route: "now"
   }
});
socket.on('now', function(data) {
   console.log(data);
});
`````

## /now : 
### JSON return values : 
`````
{
   "indice_actuel": (int),
   "timestamp" : (int),
   "ville": (string),
   "date": (string)
}
`````

## /today : 
### JSON return values : 
`````
{
   "ville": (string),
   "date": (date format),
   "datas": [{
      "indice": (int),
      "timestamp" : (int)
   }, {
      "indice": (int),
      "timestamp" : (int)
   }, ...{
      "indice": (int),
      "timestamp" : (int)
   }]
}
`````
  
## /day : 
### JSON return values : 
`````
{
   "ville": (string),
   "date": (date format),
   "indice_ouverture": (int),
   "indice_fermeture": (int),
   "datas": [{
      "indice": (int),
      "timestamp" : (int)
   }, {
      "indice": (int),
      "timestamp" : (int)
   }, ...{
      "indice": (int),
      "timestamp" : (int)
   }]
}
`````

## /last24 : 
### JSON return values : 
`````
{
   "ville": (string),
   "datas": [{
      "indice": (int),
      "timestamp" : (int)
   }, {
      "indice": (int),
      "timestamp" : (int)
   }, ...{
      "indice": (int),
      "timestamp" : (int)
   }]
}
`````
        
## /year : 
### JSON return values : 
`````
{
   "ville": (string),
   "datas": [{
      "indice_ouverture": (int),
      "indice_fermeture": (int),
      "timestamp" : (int)
   }, {
      "indice_ouverture": (int),
      "indice_fermeture": (int),
      "timestamp" : (int)
   }, ...{
      "indice_ouverture": (int),
      "indice_fermeture": (int),
      "timestamp" : (int)
   }]
}
`````

**Full exemple here /now** : https://github.com/MathieuDuboy/websocket_immo/blob/master/exemple/socket_instant.html<br />
**Full exemple here /day** : https://github.com/MathieuDuboy/websocket_immo/blob/master/exemple/socket_day.html<br />
**Full exemple here /today** : https://github.com/MathieuDuboy/websocket_immo/blob/master/exemple/socket_today.html<br />
**Full exemple here /last24** : https://github.com/MathieuDuboy/websocket_immo/blob/master/exemple/socket_last24.html<br />
**Full exemple here /year** : https://github.com/MathieuDuboy/websocket_immo/blob/master/exemple/socket_year.html<br /><br />
**Demo here** : https://mon-chatbot.com/WebSocket/socket_instant.html

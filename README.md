# WebSocket 

## Description: 
A Websocket developed in Node.js hosted on a Heroku server to make a link between a browser and a tool for generating data. It allows to generate these data:

- / now: to retrieve the instantaneous values of the current index of a city every second.
- / day: to retrieve the instantaneous values of the current index of a city every second + all values of the day since 00: 00: 01 + 00: 00
- / today: to retrieve all the values of the day since 00: 00: 01 + 00: 00
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
**Full exemple here** : <br />
**Demo here** : https://mon-chatbot.com/WebSocket/socket_instant.html

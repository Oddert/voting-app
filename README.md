# Voting App

A full stack straw pole app made for the FreeCodeCamp full stack challenges

Front end built with EJS tamplates, D3 used for data visualisation backend built with express, MongoDB / Mongoose for storage.

## Live Demo
[https://clever-growth.glitch.me/](https://clever-growth.glitch.me/)

## Installation
You will need to setup a mongodb server and connect it via an .env file
```
$ git clone https://github.com/Oddert/voting-app.git
$ cd voting-app
$ npm i
```
### For development
```
$ npm run dev
```
### For a production build
```
$ npm start
```

## Scripts
| script | command                                        | action
|--------|------------------------------------------------|------------------------------------------------|
| start  | node app.js                                    | runs the server                                |
| dev | nodemon app.js                                 | runs the server with auto restart              |
//On crée ici un objet de la classe Socket qui interagit avec votre navigateur
//Lorsqu’un client établit une connexion, l’évènement connection est détecté et
//la fonction anonyme associée est déclenchée.

const express = require('express');
const app = express();
const socket = require('socket.io');
const cors = require('cors');
const PORT = 8000;

app.use(cors())


const server = app.listen(PORT, () => {
    console.log('server is running on port ' + PORT)
});

const io = socket(server, {cors: {
    origin: "*"
    }});


//A chaque fois que l’object socket intercepte un évènement SERVER_MSG, il déclenche la fonction anonyme associée.
//socket.on('SERVER_MSG', msg => {
//setNewMessage(msg);
//});
//socket.on (etc) devient:
io.on('connection', socket => {
    console.log("socket=",socket.id);
    socket.on('CLIENT_MSG', data => {
        console.log("msg=", data);
        io.emit('SERVER_MSG', data)
    })
});
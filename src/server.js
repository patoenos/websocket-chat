const express = require('express')
const app = express()
const {Server:IOServer} = require('socket.io') // Nos traemos la propiedad Server pero nosotros internamente la llamaremos IOServer de socket.io
const path = require('path')
const { Console } = require('console')
const expressServer = app.listen(8080,()=>{
    console.log('Servidor escuchando puerto 8080')
})

const io = new IOServer(expressServer) //inicializar servidor IOServer se pone new porque IOServer es una clase
const messagesArray = []

app.use(express.static(path.join(__dirname,'../public')))

io.on('connection', socket=>{
    socket.emit('server:mensajes', messagesArray)
    console.log(`Se conectó un usuario: ${socket.id}`)
    socket.on('client:message', messageInfo =>{
    messagesArray.push(messageInfo) //actualiza el array
    /* console.log('MessageInfo: ',messageInfo) */ //Era para probar que todo funciona bien, manda el objeto a la consola
    io.emit('server:mensajes', messagesArray ) //retransmite a todos los sockets y manda el array actualizado

    })
})
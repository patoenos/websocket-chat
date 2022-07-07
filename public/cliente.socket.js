const socket = io()
const messageForm = document.querySelector('#messageForm')
const usernameInput = document.querySelector('#usernameInput')
const messageInput = document.querySelector('#messageInput')
const messagesPool = document.querySelector('#messagesPool')

function sendMessage(messageInfo){ //Funcion encargada de mandar un mensaje al servidor
    socket.emit('client:message', messageInfo)
}

function renderMessages(messagesInfo){ //va a renderizar nuestros mensajes
    console.log('Messages Info: ',messagesInfo)
    const html = messagesInfo.map(messageInfoAlias=>{

        return (`<div>
                <strong>${messageInfoAlias.username}</strong>:
                <em>${messageInfoAlias.message}</em></div>`)
    }).join(" ")
    console.log('HTML:',html)
    messagesPool.innerHTML=html
}

function submitHandler(e){
    e.preventDefault()
    const messageInfo = {username: usernameInput.value , message: messageInput.value}
    sendMessage(messageInfo)
}

messageForm.addEventListener('submit', submitHandler)

socket.on ('server:mensajes', renderMessages)
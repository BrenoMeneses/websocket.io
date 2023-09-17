const form = document.querySelector("form")
const mensagem = document.querySelector("#texto")
const UL = document.querySelector("#mensagens")
const digitando = document.querySelector('#digitando')
const usuariosConectados = document.querySelector('#usuariosConectados')

const socket = io()

//variaveis=========================================================================================================

const urlParams = new URLSearchParams(window.location.search)

const nickname = urlParams.get('nick')
const chatName = urlParams.get('chatName')

let my = true
let other = true

//emitindo e recebendo mensagem de conexão===============================================================================

socket.emit('conectado', nickname, chatName)

socket.on('conectado', (user)=>{

    let Mensagem = document.createElement('li')
    Mensagem.classList.add('mensagemLI')
    Mensagem.classList.add('conectado')

    if(socket.id === user.id){
        Mensagem.textContent = 'você se conectou ao ' + user.chatName
    }else{
        Mensagem.textContent = user.nickname + ' se conectou ao ' + user.chatName
    }

    UL.appendChild(Mensagem)

})

//enviando e recebendo mensagens de chat===============================================================================

form.addEventListener('submit', (e)=>{

    e.preventDefault()

    if(mensagem.value === ''){
                
    }else{
        socket.emit('chat msg', mensagem.value, nickname)
        mensagem.value = ''
    }

})

socket.on('chat msg', (msg, nickname, id)=>{

    let Mensagem = document.createElement('li')
    Mensagem.classList.add('mensagemLI')

    if(socket.id === id){

        if(my){
            Mensagem.classList.add('firstMSG')
            other = true
        }

        Mensagem.classList.add('myMSG')
        Mensagem.textContent = msg

        my = false

    }else{

        if(other){
            Mensagem.classList.add('firstMSG')
            my = true
        }

        Mensagem.classList.add('otherMSG')
        Mensagem.textContent = nickname + ': ' + msg

        other = false

    }

    UL.appendChild(Mensagem)

})

//emitindo e recebendo status digitando===================================================================================

mensagem.addEventListener('keypress', (e)=>{
    
    socket.emit('typing', nickname, chatName)

})

socket.on('typing', (nickname)=>{

    digitando.innerHTML = nickname + ' esta digitando...'
    setTimeout(()=>{
        digitando.innerHTML = '.'
    }, 1000)
    
})

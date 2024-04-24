const express = require('express')
const app = express()

const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new  Server(server)
const path = require('path')

//config=====================================================================================

app.use(express.static(path.join(__dirname, "public")))

//rotas=====================================================================

app.get('/cadastro', (req, res)=>{
    res.sendFile(__dirname + '/views/cadastro.html')
})

app.get('/chat', (req, res)=>{
    res.sendFile(__dirname + '/views/chat.html')
})

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/views/home.html')
})

// servidor socket=====================================================================
let users = []

io.on('connection', (socket) => {

    socket.on('conectado', (nickname, chatName)=>{

        socket.join(chatName)

        const userExist = users.find((e)=>{
            return e.nickname === nickname && e.chatName === chatName
        })

        if(userExist){
            userExist.id = socket.id
        }else{
            let user = {
                nickname: nickname,
                chatName: chatName,
                id: socket.id
            }
            users.push(user)
            io.to(chatName).emit('conectado', user)
        }

    })

    socket.on('chat msg', (msg, nickname)=>{
        io.emit('chat msg', msg, nickname, socket.id)
    })

    socket.on('typing', (nickname, chatName)=>{
        socket.broadcast.to(chatName).emit('typing', nickname)
    })

})

//rodando o servidor na porta 8081======================================================================================

server.listen(8081, ()=>{
    console.log("run in http://localhost:8081")
})

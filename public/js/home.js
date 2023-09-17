const form = document.querySelector('form')
const nick = document.querySelector('#texto')
const chatName = document.querySelector('#chatName')
const nickErr = document.querySelector('#nickErr')
const chatErr = document.querySelector('#chatErr')

form.addEventListener('submit', (e)=>{

    if(nick.value === ''){
        e.preventDefault()
        nickErr.innerHTML = 'digite seu nickname...'
    }else{
        nickErr.innerHTML = ''
    }

    if(chatName.value === ''){
        e.preventDefault()
        chatErr.innerHTML = 'escolha um chat...'
    }else{
        chatErr.innerHTML = ''
    }
})

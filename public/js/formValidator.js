const form = document.querySelector('form')
const inputs = [...form.querySelectorAll('input[name]')]

inputs.forEach(input => {
    input.addEventListener('focus', () => {
        const message = input.nextElementSibling

        message.innerHTML = ''
        message.style.display = 'none'
    })
})

form.addEventListener('submit', event => {
    const login = inputs.find(input => input.name === 'login')
    const password = inputs.find(input => input.name === 'password')

    const loginMessage = login.nextElementSibling
    const passwordMessage = password.nextElementSibling

    if (login.value.length < 4) {
        loginMessage.innerHTML = 'Login is too short'
    } else if (login.value.length > 20) {
        loginMessage.innerHTML = 'Login is too long'
    }

    if (password.value.length < 6) {
        passwordMessage.innerHTML = 'Password is too short'
    }else if (password.value.length > 20) {
        passwordMessage.innerHTML = 'Password is too long'
    }

    if (loginMessage.innerHTML) {
        loginMessage.style.display = 'block'
        event.preventDefault()
    }
    if (passwordMessage.innerHTML) {
        passwordMessage.style.display = 'block'
        event.preventDefault()
    }
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = "📍    " + data.location
                messageTwo.textContent = "⛅   " + data.forecast.split(":")[0]
                messageThree.textContent = "🌡️  " + data.forecast.split(":")[1]
                messageFour.textContent = "🌧   " + data.forecast.split(":")[2]
            }
        })
    })
})
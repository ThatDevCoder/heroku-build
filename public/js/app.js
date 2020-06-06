const weatherForm = document.querySelector('form')
const searchButton = document.querySelector('input')
const buttonEvent = document.querySelector('#search-button')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

// messageOne.textContent = 'From Inner JS'
messageOne.textContent = ''
messageTwo.textContent = ''
messageThree.textContent = ''


weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()

    const location = searchButton.value

    messageOne.textContent = 'Fetching the data from API'
    messageTwo.textContent = ''
    messageThree.textContent = ''

    fetch(`http://api.weatherstack.com/current?access_key=e598625c82eef882e22cc8a3fe24526d&query=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                // console.log(data);
                messageOne.textContent = data.error.info
                return
            }
            // console.log(data);
            messageThree.textContent = data.location.name + ", " + data.location.country
            messageOne.textContent = "Current Temperature " + data.current.temperature
            messageTwo.textContent = "Feels like " + data.current.feelslike
        })
    })

})


buttonEvent.addEventListener('click',(e) => {
    e.preventDefault()

    const location = searchButton.value

    messageOne.textContent = 'Fetching the data from API'
    messageTwo.textContent = ''
    messageThree.textContent = ''

    fetch(`http://api.weatherstack.com/current?access_key=e598625c82eef882e22cc8a3fe24526d&query=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                // console.log(data);
                messageOne.textContent = data.error.info
                return
            }
            // console.log(data);
            messageThree.textContent = data.location.name + ", " + data.location.country
            messageOne.textContent = "Current Temperature " + data.current.temperature
            messageTwo.textContent = "Feels like " + data.current.feelslike
        })
    })

})
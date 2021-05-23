console.log('client side server is loaded')


const WeatherForm = document.querySelector('form')
const search =document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



WeatherForm.addEventListener('submit' , (e)=>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent='Loading..'
    messageTwo.textContent=''
const fetchData = fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            return messageOne.textContent=data.error
        }
        messageOne.textContent= data.location
        messageTwo.textContent=data.forecast
      

    })
})

    console.log(fetchData)
})
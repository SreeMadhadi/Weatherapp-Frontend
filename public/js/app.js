var fetchWeather = "/weather";

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const weatherIcon = document.querySelector('.weatherIcon i');
const weatherCondition = document.querySelector('.weatherCondition');

const tempElement = document.querySelector('.temperature span');

const locationElement = document.querySelector('.place');

const dateElement = document.querySelector('.date');

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

dateElement.textContent = new Date().getDate() + ", " + monthNames[new Date().getMonth()].substring(0, 3);


              weatherCondition.textContent = "";


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
        locationElement.textContent = "Loading...";
        tempElement.textContent = "";
        weatherCondition.textContent = "";
        // fetch(`http://localhost:3001/weather?location=${search.value}`)
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=Bellevue&appid=57ff476e13e22af493e6e34db002481c`)
        .then(response => response.json())
        .then(data =>
           {

            console.log("data",data)
               if(data.length==0){
                locationElement.textContent = "No data to show";
                tempElement.textContent = "";
                weatherCondition.textContent = "";
               }else{
                if(data.description === "rain" || data.description === "fog") {
                    weatherIcon.className = "wi wi-day-" + data.description
                } else {
                     weatherIcon.className = "wi wi-day-cloudy"
                    }
                    locationElement.textContent = data[0].place;
                    tempElement.textContent = data[0].temperature + String.fromCharCode(176);
                    weatherCondition.textContent = data[0].description.toUpperCase();
                } 
           }
            
            
            );
    
})




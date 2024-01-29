
AOS.init();


//active navbar

const anchoring=document.querySelectorAll('.navbar .anchor')
const sections=document.querySelectorAll('.sections')

let currentone='home';
window.addEventListener('scroll',()=>
{
    sections.forEach(sectionelement =>
        {
            if(window.scrollY >= sectionelement.offsetTop-sectionelement.clientHeight/4)
            {
currentone=sectionelement.id;
            }
        });
    
 
        anchoring.forEach(anchorelement=>
            {
                if(anchorelement.href.includes(currentone))
                {
                    document.querySelector('.active').classList.remove('active');
                    anchorelement.classList.add('active');
                }
            });

        });

//active navbar


//location name and temperature

document.addEventListener('DOMContentLoaded', () => {
            getLocation();
        });

        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition,showError);
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        }

        function showPosition(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Display location name and district
            getLocationDetails(latitude, longitude);

            //Call the weather API
            getWeather(latitude, longitude); 
        }

        function showError(error) {
            alert("Error getting location: " + error.message);
        }

        function getLocationDetails(latitude, longitude) {
            const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`;

            fetch(apiUrl)
                .then(response => (response.json()))
                .then(data=>{
                    const locationName = data.address ? data.address.suburb :'unknown location';
                    const name=locationName.split(" ");
                    let finalname=name[2];
                 document.getElementById("location").innerHTML=finalname;
                })
                .catch(error => console.error('Error fetching location data:', error));
        
            }
            function getWeather(latitude, longitude) 
            {
            const apiKey = '9a47f0966d3d209042692503ea62d497';
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    const temperatureCelsius = data.main.temp;
                  document.getElementById('weather').innerHTML =temperatureCelsius+"°C";
                })
                .catch(error => console.error('Error fetching weather data:', error));
                
        }  
//location name and temperature
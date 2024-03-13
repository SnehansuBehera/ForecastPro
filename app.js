
const apiKey = "34e9de12a1643b6ed59e4e83557f75cc";
const inputCity = document.querySelector(".printResult");
const btn = document.querySelector(".speak");
var temp1 = document.querySelector(".temp");
var city = document.querySelector(".city");
var tempPara = document.querySelector(".tempPara");
var max_min = document.querySelector(".max-min");
var chancesOf = document.querySelector(".chancesOf");
var favcon = document.querySelector(".favcon");
var time = document.querySelector(".time");
var date = document.querySelector(".date");
var bg = document.querySelector(".bgImage");
var icon = document.querySelector(".forecast");
var timeOfrise = document.querySelector(".timeOfrise");
var timeOfset = document.querySelector(".timeOfset");
var windSpeed = document.querySelector(".windSpeed");
var humidity = document.querySelector(".humidity");
var form = document.querySelector("form");
var loader = document.getElementById('preloader');
var block = document.querySelector('block');

bg.addEventListener('load', () => {
    loader.style.display = 'none';
})

inputCity.value = 'Kalyani';
citySite = inputCity.value;
async function fetchWeather(citySite) {



    cityName = citySite;
    inputCity.blur();
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric` + `&appid=${apiKey}`);
    var data = await response.json();
    console.log(data)
    var data1 = data.dt;
    const datas = new Date(data1 * 1000);
    var sunriseTime = data.sys.sunrise;
    sunriseTime = new Date(sunriseTime * 1000);
    var sunsetTime = data.sys.sunset;
    sunsetTime = new Date(sunsetTime * 1000);

    console.log(datas);



    tempPara.textContent = `Feels like ${data.main.feels_like}°C`;
    max_min.textContent = `Max: ${data.main.temp_max}°C   Min: ${data.main.temp_min}°C`;
    chancesOf.textContent = `${data.weather[0].description[0].toUpperCase() + data.weather[0].description.slice(1)} :: Pressure: ${data.main.pressure}`;
    temp1.textContent = `${Math.floor(data.main.temp)}°C`;
    city.textContent = `${data.name}, ${data.sys.country}`;
    time.textContent = `${datas.getHours()}hrs ${datas.getMinutes()}mins`;
    date.textContent = `${datas.toDateString()}`;
    timeOfrise.textContent = `${sunriseTime.getHours()}.${sunriseTime.getMinutes()}am`
    timeOfset.textContent = `${sunsetTime.getHours()}.${sunsetTime.getMinutes()}pm`
    humidity.textContent = `${data.main.humidity} mb`;
    windSpeed.textContent = `${data.wind.speed} kph, ${data.wind.deg}deg`;
    weatherArray.forEach((index) => {
        if (index.weather == data.weather[0].main) {
            bg.src = `${index.bg}`;
            icon.src = `${index.icon}`;
            favcon.src = `${index.icon}`;

        }
    })
    inputCity.value = "";



    gsap.set('.c1', {
        opacity: 0,
        x: -80,
    })
    gsap.to('.c1', {
        opacity: 1,
        duration: 2,
        x: 0,
    })
    gsap.set('.c2', {
        opacity: 0,
        x: 80,
    })
    gsap.to('.c2', {
        opacity: 1,
        duration: 2,
        x: 0,
    })
    gsap.from('.block', {
        opacity: 0,
        duration: 2,
    })
    gsap.to('.block', {
        opacity: 1,
        duration: 2,
    })


}
fetchWeather(citySite);
form.addEventListener("submit", (e) => {
    e.preventDefault();
    inputValue = inputCity.value;
    fetchWeather(inputValue);

})

btn.addEventListener("click", () => {
    inputValue = inputCity.value;
    fetchWeather(inputValue);
})


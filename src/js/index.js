//App del clima

//Mostrar el tiempo actual (temperaturas, lluvias, etc)
//Pronóstico a futuro

//PASOS A SEGUIR:
// 1º Estructura HTML y CSS básica
// 2º JavaScript:
// - Llamada a API
// - Pintar llamada a API

/*
EJEMPLO LLAMADA
https://api.openweathermap.org/data/2.5/weather?id={city id}&appid={API key}&units=metric
*/

/*
EJEMPLO IMG
https://openweathermap.org/img/wn/10d@4x.png
*/

//DATOS MADRID
/*
{
    "id": 3117732,
    "name": "Comunidad de Madrid",
    "state": "",
    "country": "ES",
    "coord": {
        "lon": -3.69063,
        "lat": 40.425259
    }
}
*/

//SELECTORES
// 1º
const cityElement = document.getElementById('city');
const tempMinElement = document.getElementById('temp-min');
const tempMaxElement = document.getElementById('temp-max');
const degreesElement = document.getElementById('degrees');
const mainIconElement = document.getElementById('main-icon');
// 2º
const currentForecastContainerElement = document.getElementById(
  'main-current-forecast'
);
// 3º
const realFeelElement = document.getElementById('real-feel');
const windElement = document.getElementById('wind');
const humidityElement = document.getElementById('humidity');
const cloudsElement = document.getElementById('clouds');

//ASSETS
const BASE_URL = 'https://api.openweathermap.org/';
const API_KEY = '92b37db5e80c18e50fcf3050f58c1197';
const units_metric = '&units=metric';
const madridId = 3117732;

const API_URLS = {
  currentWeather_madrid: `${BASE_URL}data/2.5/weather?id=${madridId}&appid=${API_KEY}${units_metric}`,
  currentForecast_madrid: `${BASE_URL}data/2.5/forecast?id=${madridId}&appid=${API_KEY}${units_metric}`,
};

//FUNCIONES

//petición
const fetchData = async url => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    //console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

//pintar clima actual
const printCurrentWeather = async () => {
  const data = await fetchData(API_URLS.currentWeather_madrid);

  cityElement.textContent = data.name;
  tempMinElement.textContent = `Min. Temperature: ${Math.round(
    data.main.temp_min
  )}º`;
  tempMaxElement.textContent = `Max. Temperature: ${Math.round(
    data.main.temp_max
  )}º`;
  degreesElement.textContent = `${Math.round(data.main.temp)}º`;
  mainIconElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

  getCurrentForecast();
  getOthers(data);
};

//obtener pronóstico de hoy
const getCurrentForecast = async () => {
  const data = await fetchData(API_URLS.currentForecast_madrid);
  const todayForecast = data.list.slice(0, 6);

  printCurrentForecast(todayForecast);
};

//pintar pronóstico de hoy
const printCurrentForecast = async forecast => {
  //console.log(forecast);
  const newDiv = document.createElement('div');
  newDiv.classList.add('main__current--forecast--hours');

  forecast.forEach(day => {
    //box
    const newBox = document.createElement('div');
    newBox.classList.add('main__current--forecast--hours--box');
    //time
    const newHour = document.createElement('h4');
    const horaFormateada = getFormattedTime(day.dt_txt);
    newHour.textContent = horaFormateada;
    //img
    const newImg = document.createElement('img');
    newImg.src = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
    //degrees
    const newDegrees = document.createElement('h3');
    newDegrees.textContent = `${Math.round(day.main.temp)}º`;

    newBox.append(newHour, newImg, newDegrees);
    newDiv.append(newBox);
  });

  currentForecastContainerElement.append(newDiv);
};

//formatear hora
function getFormattedTime(timestamp) {
  const fecha = new Date(timestamp);
  return fecha.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

//obtener otros datos
const getOthers = async data => {
  console.log(data);
  realFeelElement.textContent = `${Math.round(data.main.feels_like)}º`;
  windElement.textContent = `${data.wind.speed} km/h`;
  humidityElement.textContent = `${data.main.humidity}%`;
  cloudsElement.textContent = `${data.clouds.all}%`;
};

printCurrentWeather();

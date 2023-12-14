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

//ASSETS
const BASE_URL = 'https://api.openweathermap.org/';
const API_KEY = '92b37db5e80c18e50fcf3050f58c1197';
const units_metric = '&units=metric';

const API_URLS = {
  currentWeather_madrid: `${BASE_URL}data/2.5/weather?id=3117732&appid=${API_KEY}${units_metric}`,
};

//FUNCIONES
const fetchData = async url => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.weather[0]);
  } catch (err) {
    console.log(err);
  }
};

fetchData(API_URLS.currentWeather_madrid);

//App del clima

//Mostrar el tiempo actual (temperaturas, lluvias, etc)
//Pronóstico a futuro

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
export const BASE_URL = 'https://api.openweathermap.org/';
export const API_KEY = '92b37db5e80c18e50fcf3050f58c1197';
export const units_metric = '&units=metric';
export const madridId = 3117732;
export const londonId = 2643743;
export const tokyoId = 1850147;
export const sydneyId = 2147714;
export const rioDeJaneiroId = 3451190;
export const nyId = 5128581;

export const API_URLS = {
  currentWeather_madrid: `${BASE_URL}data/2.5/weather?id=${madridId}&appid=${API_KEY}${units_metric}`,
  currentForecast_madrid: `${BASE_URL}data/2.5/forecast?id=${madridId}&appid=${API_KEY}${units_metric}`,

  currentWeather_tokyo: `${BASE_URL}data/2.5/weather?id=${tokyoId}&appid=${API_KEY}${units_metric}`,
  currentForecast_tokyo: `${BASE_URL}data/2.5/forecast?id=${tokyoId}&appid=${API_KEY}${units_metric}`,

  currentWeather_london: `${BASE_URL}data/2.5/weather?id=${londonId}&appid=${API_KEY}${units_metric}`,
  currentForecast_london: `${BASE_URL}data/2.5/forecast?id=${londonId}&appid=${API_KEY}${units_metric}`,

  currentWeather_sydney: `${BASE_URL}data/2.5/weather?id=${sydneyId}&appid=${API_KEY}${units_metric}`,
  currentForecast_sydney: `${BASE_URL}data/2.5/forecast?id=${sydneyId}&appid=${API_KEY}${units_metric}`,

  currentWeather_rio: `${BASE_URL}data/2.5/weather?id=${rioDeJaneiroId}&appid=${API_KEY}${units_metric}`,
  currentForecast_rio: `${BASE_URL}data/2.5/forecast?id=${rioDeJaneiroId}&appid=${API_KEY}${units_metric}`,

  currentWeather_ny: `${BASE_URL}data/2.5/weather?id=${nyId}&appid=${API_KEY}${units_metric}`,
  currentForecast_ny: `${BASE_URL}data/2.5/forecast?id=${nyId}&appid=${API_KEY}${units_metric}`,
};

export const images = {
  '01d': './assets/images/weather-icons/4x/01d.png',
  '01n': './assets/images/weather-icons/4x/01d.png',
  '02d': './assets/images/weather-icons/4x/02d.png',
  '02n': './assets/images/weather-icons/4x/02d.png',
  '03d': './assets/images/weather-icons/4x/03d.png',
  '03n': './assets/images/weather-icons/4x/03d.png',
  '04d': './assets/images/weather-icons/4x/04d.png',
  '04n': './assets/images/weather-icons/4x/04d.png',
  '09d': './assets/images/weather-icons/4x/05d.png',
  '09n': './assets/images/weather-icons/4x/05n.png',
  '10d': './assets/images/weather-icons/4x/06d.png',
  '10n': './assets/images/weather-icons/4x/06d.png',
  '11d': './assets/images/weather-icons/4x/07d.png',
  '11n': './assets/images/weather-icons/4x/07d.png',
  '13d': './assets/images/weather-icons/4x/08d.png',
  '13n': './assets/images/weather-icons/4x/08d.png',
  '50d': './assets/images/weather-icons/4x/09d.png',
  '50n': './assets/images/weather-icons/4x/09d.png',
};

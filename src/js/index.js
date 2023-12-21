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
// 4º
const forecastContainerElement = document.getElementById('main-forecast');
// nav-bar
const citiesElement = document.getElementById('cities');
//dark-mode
const darkModeBtn = document.getElementById('btn-dark-mode');

//ASSETS
const BASE_URL = 'https://api.openweathermap.org/';
const API_KEY = '92b37db5e80c18e50fcf3050f58c1197';
const units_metric = '&units=metric';
const madridId = 3117732;
const londonId = 2643743;
const tokyoId = 1850147;
const sydneyId = 2147714;
const rioDeJaneiroId = 3451190;
const nyId = 5128581;

const API_URLS = {
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

const images = {
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

//FUNCIONES
//petición
const fetchData = async url => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

//pintar clima actual
const printCurrentWeather = async city => {
  const data = await fetchData(API_URLS[`currentWeather_${city}`]);
  const objectIcon = data.weather[0].icon;

  cityElement.textContent = data.name;
  tempMinElement.textContent = `Min. Temperature: ${Math.round(
    data.main.temp_min
  )}º`;
  tempMaxElement.textContent = `Max. Temperature: ${Math.round(
    data.main.temp_max
  )}º`;
  degreesElement.textContent = `${Math.round(data.main.temp)}º`;
  mainIconElement.src = `${images[objectIcon]}`;
  mainIconElement.classList.add('main--img');

  getCurrentForecast(city);
  printOthers(data);
};

//obtener pronóstico de hoy
const getCurrentForecast = async city => {
  const data = await fetchData(API_URLS[`currentForecast_${city}`]);
  const todayForecast = data.list.slice(0, 6);

  printCurrentForecast(todayForecast);
  get5DaysForecast(data);
};

//pintar pronóstico de hoy
const printCurrentForecast = async forecast => {
  const newDiv = document.createElement('div');
  newDiv.classList.add('main__current--forecast--hours');
  newDiv.id = 'current-forecast-container';

  forecast.forEach(day => {
    const objectIcon = day.weather[0].icon;
    //box
    const newBox = document.createElement('div');
    newBox.classList.add('main__current--forecast--hours--box');
    //time
    const newHour = document.createElement('h4');
    const horaFormateada = getFormattedTime(day.dt_txt);
    newHour.textContent = horaFormateada;
    newHour.classList.add('light');
    //img
    const newImg = document.createElement('img');
    newImg.src = `${images[objectIcon]}`;
    newImg.classList.add('forecast--img');
    //degrees
    const newDegrees = document.createElement('h3');
    newDegrees.textContent = `${Math.round(day.main.temp)}º`;
    newDegrees.classList.add('bold');

    newBox.append(newHour, newImg, newDegrees);
    newDiv.append(newBox);
  });

  currentForecastContainerElement.append(newDiv);
};

//formatear hora
const getFormattedTime = timestamp => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

//obtener otros datos
const printOthers = async data => {
  realFeelElement.textContent = `${Math.round(data.main.feels_like)}º`;
  windElement.textContent = `${data.wind.speed} km/h`;
  humidityElement.textContent = `${data.main.humidity}%`;
  cloudsElement.textContent = `${data.clouds.all}%`;
};

//obtener datos 5 DÍAS
const get5DaysForecast = async data => {
  const daysForecast = [];

  for (let i = 0; i < data.list.length; i += 8) {
    daysForecast.push(data.list[i]);
  }

  print5DaysForecast(daysForecast);
};

//pintar datos 6 DÍAS
const print5DaysForecast = async data => {
  const newContainer = document.createElement('div');
  newContainer.classList.add('main__forecast--container');
  newContainer.id = 'main-forecast-container';

  data.forEach(day => {
    const objectIcon = day.weather[0].icon;
    //box
    const newBox = document.createElement('div');
    newBox.classList.add('main__forecast--box');
    //day
    const newDay = document.createElement('h4');
    newDay.textContent = getFormattedDays(day.dt_txt);
    newDay.classList.add('light');
    //img
    const newImg = document.createElement('img');
    newImg.src = `${images[objectIcon]}`;
    //sky
    const newSky = document.createElement('h4');
    newSky.textContent = day.weather[0].main;
    newSky.classList.add('sky');
    //degrees
    const newH4 = document.createElement('h4');
    newH4.textContent = `${Math.round(day.main.temp_max)}º/${Math.round(
      day.main.temp_min
    )}º`;
    newH4.classList.add('bold');

    newBox.append(newDay, newImg, newSky, newH4);
    newContainer.append(newBox);
  });
  forecastContainerElement.append(newContainer);
};

//formatear días
const getFormattedDays = date => {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const objectDay = new Date(date);

  const correctDay = weekDays[objectDay.getDay()];

  return correctDay;
};

//cambiar dark/light mode
const switchMode = () => {
  document.body.classList.toggle('dark-mode');
};

//Events
darkModeBtn.addEventListener('change', switchMode);
printCurrentWeather('madrid');
citiesElement.addEventListener('click', event => {
  const currentForecastContainer = document.getElementById(
    'current-forecast-container'
  );
  const mainForecastContainerElement = document.getElementById(
    'main-forecast-container'
  );

  if (event.target.closest('#tokyo')) {
    if (currentForecastContainer) {
      currentForecastContainer.remove();
    }
    if (mainForecastContainerElement) {
      mainForecastContainerElement.remove();
    }
    printCurrentWeather('tokyo');
  } else if (event.target.closest('#london')) {
    if (currentForecastContainer) {
      currentForecastContainer.remove();
    }
    if (mainForecastContainerElement) {
      mainForecastContainerElement.remove();
    }
    printCurrentWeather('london');
  } else if (event.target.closest('#madrid')) {
    if (currentForecastContainer) {
      currentForecastContainer.remove();
    }
    if (mainForecastContainerElement) {
      mainForecastContainerElement.remove();
    }
    printCurrentWeather('madrid');
  } else if (event.target.closest('#sydney')) {
    if (currentForecastContainer) {
      currentForecastContainer.remove();
    }
    if (mainForecastContainerElement) {
      mainForecastContainerElement.remove();
    }
    printCurrentWeather('sydney');
  } else if (event.target.closest('#rio')) {
    if (currentForecastContainer) {
      currentForecastContainer.remove();
    }
    if (mainForecastContainerElement) {
      mainForecastContainerElement.remove();
    }
    printCurrentWeather('rio');
  } else if (event.target.closest('#ny')) {
    if (currentForecastContainer) {
      currentForecastContainer.remove();
    }
    if (mainForecastContainerElement) {
      mainForecastContainerElement.remove();
    }
    printCurrentWeather('ny');
  }
});

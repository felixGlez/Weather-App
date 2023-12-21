import {
  BASE_URL,
  API_KEY,
  units_metric,
  madridId,
  londonId,
  tokyoId,
  sydneyId,
  rioDeJaneiroId,
  nyId,
  API_URLS,
  images,
} from './data';

import {
  cityElement,
  tempMinElement,
  tempMaxElement,
  degreesElement,
  mainIconElement,
  currentForecastContainerElement,
  realFeelElement,
  windElement,
  humidityElement,
  cloudsElement,
  forecastContainerElement,
  citiesElement,
  darkModeBtn,
} from './dom';

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
export const printCurrentWeather = async city => {
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
export const switchMode = () => {
  document.body.classList.toggle('dark-mode');
};

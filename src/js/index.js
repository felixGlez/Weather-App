import { darkModeBtn, citiesElement } from './dom';
import { printCurrentWeather, switchMode } from './functions';

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

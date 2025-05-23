const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

$(document).ready(function () {
  weatherFn('Noida');
});

async function weatherFn(cName) {
  $('#weather-info').hide();
  $('#error-message').hide();

  const temp = `${url}?q=${cName}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(temp);
    const data = await res.json();

    if (res.ok) {
      weatherShowFn(data);
    } else {
      $('#error-message').text('City not found. Please try again.').fadeIn();
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    $('#error-message').text('Something went wrong.').fadeIn();
  }
}

function weatherShowFn(data) {
  $('#city-name').text(data.name);
  $('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
  $('#temperature').html(`<i class="fas fa-thermometer-half"></i> ${Math.round(data.main.temp)}°C`);
  $('#description').text(data.weather[0].description);
  $('#wind-speed').html(`<i class="fas fa-wind"></i> Wind Speed: ${data.wind.speed} m/s`);
  $('#weather-icon').attr('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
  $('#weather-info').fadeIn();
}

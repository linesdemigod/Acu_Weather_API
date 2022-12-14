const key = "3Y2r12nAjYGlxuK4lMpwHwC08qFgd0H3";

const getWeather = async id => {
  const base = "http://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${id}?apikey=${key}`;

  const response = await axios.get(base + query);
  const data = await response.data;

  return data[0];
};

//make request to get the ciyt
const getCity = async city => {
  const config = {
    headers: {
      Accept: "application/json",
    },
    params: {
      apikey: key,
      q: city,
    },
  };

  const response = await axios.get(
    "http://dataservice.accuweather.com/locations/v1/cities/search",
    config
  );

  const data = await response.data;

  return data[0];
};

// function

const updateCity = async city => {
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);

  return {
    cityDetails: cityDetails,
    weather: weather,
  };
};
const getWeatherForm = document.getElementById("get-weather");

async function weatherForm(e) {
  e.preventDefault();
  var city = document.getElementById("city").value.trim();
  getWeatherForm.reset();

  updateCity(city)
    .then(data => {
      document.getElementById("city-name").innerText =
        data.cityDetails.LocalizedName;
      document.getElementById("temp").innerHTML = `
        ${data.weather.Temperature.Metric.Value} &#8451;`;
      document.getElementById("weather-text").innerText =
        data.weather.WeatherText;

      const getImage =
        data.weather.IsDayTime == false ? "img/night.jpg" : "img/day.jpg";
      document.getElementById("image").src = getImage;

      document.getElementById("country").innerText =
        data.cityDetails.Country.EnglishName;

      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
}

getWeatherForm?.addEventListener("submit", weatherForm);

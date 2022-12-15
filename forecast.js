const key = "3Y2r12nAjYGlxuK4lMpwHwC08qFgd0H3";

//get another request by passing the city key to get the weather details
const getWeather = async id => {
  const base = `http://dataservice.accuweather.com/currentconditions/v1/`;
  const param = `${id}?apikey=${key}`;

  const response = await axios.get(base + param);
  const data = await response.data;

  return data[0];
};

//make request to get the location details
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

//
const updateCity = async city => {
  const cityDetails = await getCity(city); //get the city details by passing the name of the location
  const weather = await getWeather(cityDetails.Key); //get the weather details by passing the location key from the cityDetails

  //return them as object
  return {
    cityDetails: cityDetails,
    weather: weather,
  };
};

//get the form
const getWeatherForm = document.getElementById("get-weather");

async function weatherForm(e) {
  e.preventDefault();

  //get the value of the input in the form
  var city = document.getElementById("city").value.trim();
  getWeatherForm.reset(); //reset the form

  //get the necessary values and put it to the DOM
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

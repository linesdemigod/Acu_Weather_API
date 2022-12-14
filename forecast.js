const key = API_KEY;

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
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
}

getWeatherForm?.addEventListener("submit", weatherForm);

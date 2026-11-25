const geocodeCity = async (city) => {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Unable to search for this city right now.");
  const data = await response.json();
  if (!data.results?.length) throw new Error("City not found. Please check the spelling.");
  return data.results[0];
};
const weatherDescription = (code) => {
  const map = {0:"Clear sky",1:"Mainly clear",2:"Partly cloudy",3:"Overcast",45:"Fog",48:"Rime fog",51:"Light drizzle",53:"Drizzle",55:"Dense drizzle",61:"Light rain",63:"Rain",65:"Heavy rain",71:"Light snow",73:"Snow",75:"Heavy snow",80:"Rain showers",81:"Rain showers",82:"Heavy showers",95:"Thunderstorm",96:"Thunderstorm with hail",99:"Thunderstorm with hail"};
  return map[code] || "Weather conditions";
};
export async function getWeather(city){
  const place=await geocodeCity(city);
  const url=`https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&temperature_unit=celsius&wind_speed_unit=kmh`;
  const response=await fetch(url);
  if(!response.ok)throw new Error("Weather data could not be loaded.");
  const data=await response.json();
  return {name:place.name,country:place.country,temp:data.current.temperature_2m,humidity:data.current.relative_humidity_2m,wind:data.current.wind_speed_10m,description:weatherDescription(data.current.weather_code),code:data.current.weather_code};
}

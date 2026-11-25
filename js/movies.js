// OMDb requires a free API key: https://www.omdbapi.com/apikey.aspx
const API_KEY = "http://www.omdbapi.com/?i=tt3896198&apikey=153c0fd3";
export async function searchMovies(query){
  if(API_KEY==="YOUR_OMDB_API_KEY") throw new Error("Add your OMDb API key in js/movies.js to enable movie search.");
  const response=await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`);
  if(!response.ok)throw new Error("Movie service is unavailable.");
  const data=await response.json();
  if(data.Response==="False")throw new Error(data.Error||"No movies found.");
  return data.Search||[];
}
export async function getMovieDetails(id){
  const response=await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=short`);
  if(!response.ok)throw new Error("Unable to load movie details.");
  return response.json();
}

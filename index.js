`use strict`;

const apikey = '8558c5ac1d7c7852d7cbbb122d60b949';
const searchURL = `https://ws.audioscrobbler.com/2.0/?api_key=${apikey}&format=json`;

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function artistSearch (searchTerm) {
  const params = {
    method: `artist.search`,
    limit: 5,
    artist: searchTerm
  };
  const queryString = formatQueryParams(params)
  const  url= searchURL + `&` + queryString;
  console.log(url);
    fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function getTopTracks(mbid1){
  const params = {
    method: `artist.getTopTracks`,
    mbid: mbid1,
    limit: 3
  };
  const queryString = formatQueryParams(params)
  const  url2 = searchURL + `&` + queryString;
  console.log(url2);
    fetch(url2)
    .then(response => {
      if (response.ok) {
       return displayResults(new1)();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function displayResults (responseJson){
  console.log(responseJson);
  $(`#results-list`).empty();
  for (let i=0;i<responseJson.results.artistmatches.artist.length; i++){
  //new1.forEach(artist=>{
    $('#results-list').append(`
    <div>
      <h2>${responseJson.name}
      </h2>
      <h3><a href=>"${responseJson.url}"</a></h3>
    </div>`);
  //} 
  //console.log(getTopTracks(artist.mbid));
};
$('#results').removeClass('hidden');
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    let searchTerm = $('#js-search-term').val();
   artistSearch(searchTerm);
  });
  
}

$(watchForm);



//instead of json build an area that contain artist results, 
//need an array of objects - keys in string
var exampleObject = [
  {
    name: "frank ocean",
    mbid: 12341234,
    topTracks: [
      "one",
      "two",
      "three"
    ]
  },
  {
    name: "frank sinatra",
    mbid: 12341234,
    topTracks: [
      "one",
      "two",
      "three"
    ]
  }
]

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

function getTopTracks(searchTerm){
  const params = {
    method: `artist.getTopTracks`,
    //mbid: mbid1,
    limit: 3,
    artist: searchTerm
  };
  const queryString = formatQueryParams(params)
  const  url1 = searchURL + `&` + queryString;
  console.log(url1);
    fetch(url1)
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
//const mbid1= "";

//function displayResults1(responseJson){
//console.log(responseJson);
//const mbid1 = responseJson[`artist.mbid`];
//for (let i = 0; i<responseJson.mbid.toptracks.track.length; i++){
//$('#results-list').append(`
 //   <div>
 //     <h2>${responseJson.toptracks.track[i].name}
 //    </h2>
 //  </div>`);}}
function displayResults (responseJson){
  console.log(responseJson);
  $(`#results-list`).empty();
  for (let i = 0; i<responseJson.results.artistmatches.artist.length; i++){
 //responseJson.forEach(artist=>{
    $('#results-list').append(`
    <div>
      <h2>${responseJson.results.artistmatches.artist[i].name}
      </h2>
      <h3><a href=>"${responseJson.results.artistmatches.artist[i].url}"</a></h3>
      <h4>${responseJson.results.artistmatches.artist[i].mbid}</h4>
    </div>`);
//});

//console.log(getTopTracks(artist[i].mbid));
};
//const mbid1 = $(responseJson.results.artistmatches.artist);
$('#results').removeClass('hidden');
};

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    let searchTerm = $('#js-search-term').val();
   artistSearch(searchTerm);
   getTopTracks(searchTerm);
  //getTopTracks(results.artist.mbid1);
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

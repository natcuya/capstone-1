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
        console.log(response.json())
        return response.json().results.artistmatches.artist;
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}
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

function displayResults (new1){
  console.log(new1);
  $(`#results-list`).empty();
  new1.forEach(artist=>{
    console.log(getTopTracks(artist.mbid));
    $('#results-list').append(`
    <div>
      <h2>${artist.name}
      </h2>
      <h3><a href=>"${artist.url}"</a></h3>
    
    </div>`);
    $('#results').removeClass('hidden');
  });
 
}

function getTopTracks(mbid1){
    const params = {
      method: `artist.getTopTracks`,
      mbid: mbid1,
      limit: 3
    };
    const queryString = formatQueryParams(params)
    const  url= searchURL + `&` + queryString;
    console.log(url);
      fetch(url)
      .then(response => {
        if (response.ok) {
          console.log(response.json())
          return response.json();

        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResults(responseJson))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
  }
  

//write function that uses mbid 

//function toptracks (){
 // $(`<h3><a href=>"${artist.url}"</a></h3>`).on(`click`, function (){
 //   $(`#results-list`).empty();
 // })}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    let searchTerm = $('#js-search-term').val();
   artistSearch(searchTerm);
  });
  
}

$(watchForm);
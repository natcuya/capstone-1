`use strict`;

//const apikey = '8558c5ac1d7c7852d7cbbb122d60b949';
//const searchURL = `https://ws.audioscrobbler.com/2.0/?api_key=$//{apikey}&format=json`;

const apikey1 = `355095-capstone-3NMWSODY`;
const searchUrl1 = `https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar`;

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults2 (responseJson){
  console.log(responseJson);
  $(`#results-list`).empty();
  for (let i = 0; i<responseJson.Similar.Info.length; i++){
  $('#results-list').append(`<div><h2> You searched: ${responseJson.Similar.Info[i].Name}</h2><h3>${responseJson.Similar.Info[i].wTeaser}</h3><h4><iframe width="560" height="315" src="${responseJson.Similar.Info[i].yUrl}frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></h4></div>`);}
  for (let i = 0; i<responseJson.Similar.Results.length; i++){
    $('#results-list').append(`
    <div>
      <h3>${responseJson.Similar.Results[i].Name}
      </h3>
      <h4><iframe width="560" height="315" src="${responseJson.Similar.Results[i].yUrl}frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></h4>
    </div>`);
};
$('#results').removeClass('hidden');
};

function tasteDive (searchTerm) {
  const params = {
    q: searchTerm,
    Type: "music",
    limit: 3,
    info: 1,
    k: apikey1,
  };

  const queryString = formatQueryParams(params)
  const  url1= searchUrl1 + `?` + queryString;
  console.log(url1);

    fetch(url1)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults2(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}






//function artistSearch (searchTerm) {
 // const params = {
   // method: `artist.search`,
   // limit: 4,
   // artist: searchTerm};
  //const queryString = formatQueryParams(params)
  //const  url= searchURL + `&` + queryString;
  //console.log(url);
  //  fetch(url)
  //  .then(response => {
  //    if (response.ok) {
   //     return response.json();}
     // throw new Error(response.statusText);})
    //.then(responseJson => displayResults(responseJson))
    //.catch(err => {
    //  $('#js-error-message').text(`Something went wrong: ${err.message}`);
  //  });}

//function getTopTracks(searchTerm){
 // const params = {
  //  method: `artist.getTopTracks`,
    //mbid: mbid1,
  //  limit: 3,
  //  artist: searchTerm
 // };
 // const queryString = formatQueryParams(params)
//  const  url1 = searchURL + `&` + queryString;
//  console.log(url1);
//    fetch(url1)
 //   .then(response => {
 //     if (response.ok) {
//     return response.json();
//      }
 //     throw new Error(response.statusText);   })
  //  .then(responseJson => displayResults1(responseJson))
   // .catch(err => {
   //   $('#js-error-message').text(`Something went wrong: ${err.message}`); });}
//function getmbid(){
 // let mbid1 = (responseJson['results'][0]['mbid']);}

//function displayResults (responseJson){
 // console.log(responseJson);
  //$(`#results-list`).empty();
  //for (let i = 0; i<responseJson.results.artistmatches.artist.length; i++){
  //  $('#results-list').append(`
  //  <div>
   //   <h2 id="artistname"><a href=>"${responseJson.results.artistmatches.artist[i].name}
   //   </a></h2>
   //   <h3><a href=>"${responseJson.results.artistmatches.artist[i].url}"</a></h3>
   //   <h4>${responseJson.results.artistmatches.artist[i].mbid}</h4>
   // </div>`);};
//$('#results').removeClass('hidden');};

//function displayResults1(responseJson){
  //console.log(responseJson);
 // for (let i = 0; i<responseJson.toptracks.track.length; i++){
 // $('#results-list').append(`
  //    <div>
  //      <h4>${responseJson.toptracks.track[i].name}
   //    </h4>
  //   </div>`);
  //  }}
//function artistTrack(){
// $(`#artistName`).on(`click`, function (event) {
 //  $(`#results-list`).empty();
 //  $(`#results-list`).append(responseJson.toptracks.track[i].name);
 //}
  // );
 // }

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    let searchTerm = $('#js-search-term').val();
  // artistSearch(searchTerm);
  // getTopTracks(searchTerm);
   tasteDive(searchTerm);
  //getTopTracks(mbid1);
  });
  
}

$(watchForm);

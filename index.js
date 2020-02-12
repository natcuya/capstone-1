`use strict`;

const tasteDiveApikey = `355095-capstone-RKTGK7XD`;
const tasteDiveUrl = `https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar`;
const ticketmasterApikey = `MJ8eaEQisaabRvXpujodDgLMlRdGdGWS`;
const ticketmasterUrl= `https://app.ticketmaster.com/discovery/v2/attractions.json`;

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults1 (responseJson){
  //set to empty any previous results from results-list
  $(`#results-list`).empty();
  if (responseJson.Similar.Results.length === 0) {
    $(`#results-list0`).empty();
    $('#results-list0').append(
     `<div class="result-box">
       <h2> No result found, try a different artist.</h2>
      </div>`);
    return;
  } else {
    $(`#results-list0`).empty();
  //iterates through the info array within the "similar" object
  //the similar object holds data of artists,books,etc from TasteDive API
  for (let i = 0; i<responseJson.Similar.Info.length; i++){
  //For each result searched, artist info, youtube link, and description will be listed.
  $('#results-list').append(
    `<div class="result-box">
      <h2> You searched: ${responseJson.Similar.Info[i].Name}</h2>
        <p>${responseJson.Similar.Info[i].wTeaser}</p>
      <div class="flex-cont">
        <p><iframe width="560" height="315" src="${responseJson.Similar.Info[i].yUrl}" allow="autoplay; encrypted-media;" allowfullscreen></iframe></p>
      </div>
    </div>`);
}
  //for each artist listed as similar, artist info, name, youtube link and description will be listed.
  for (let i = 0; i<responseJson.Similar.Results.length; i++){
    $('#results-list0').append(`
    <div class="result-box1"> 
    <h2>SIMILAR ARTIST: </h2>
      <h3>${responseJson.Similar.Results[i].Name}</h3>
        <h4>BIOGRAPHY<br/></h4>
          <p>${responseJson.Similar.Results[i].wTeaser}</p>
      <div class="flex-cont1">
        <p><iframe width="560" height="315" src="${responseJson.Similar.Results[i].yUrl}" allowfullscreen></iframe></p>
      </div>
    </div>`);
  }}
  $('#results').removeClass('hidden');
};

function tasteDive (searchTerm) {
  //setting the parameters necessary to retrieve the data 
  const params = {
    q: searchTerm,
    type: `music`,
    limit: 3,
    k: tasteDiveApikey,
    verbose: 1,
    jsonp: 'callback',
    dataType: 'jsonp',
  };
  const queryString = formatQueryParams(params)
  const  url1= tasteDiveUrl + `?` + queryString;
    fetch(url1)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("sorry no results");
    })
    .then(responseJson => displayResults1(responseJson))
    .catch(error => {
      console.log(error);
    });
} 
   
function displayResults2(responseJson){
    $(`#results-list1`).empty();
    //for each attraction, the name, an image, upcoming event (num), and URL to ticketmaster page will be listed.
    for (let i = 0; i<responseJson._embedded.attractions.length; i++){
      $('#results-list1').append(`
      <div class="result-box2">
        <h2>See ${responseJson._embedded.attractions[i].name} Live!</h2>
          <p><img src="${responseJson._embedded.attractions[i].images[0].url}" alt="image of artist or event"></p> 
          <p> Upcoming Events: ${responseJson._embedded.attractions[i].upcomingEvents._total}</p>
          <p><a href="${responseJson._embedded.attractions[i].url}"target="_blank">Click here for more details about the artist and ticket sales</a></p>
      </div>`);};
    $('#results').removeClass('hidden');
};
  
function ticketmaster (searchTerm) {
  const params = {
    keyword: searchTerm,
    apikey: ticketmasterApikey,
    size: 1
      };
  const queryString = formatQueryParams(params)
  const  url2= ticketmasterUrl + `?` + queryString;
    fetch(url2)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
      })
    .then(responseJson => displayResults2(responseJson))
    .catch(error => {
      console.log(error);
    }); 
}

//watches for submission
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    let searchTerm = $('#search-term').val();
  //captures value of users input in searchbar
  ticketmaster(searchTerm);
  tasteDive(searchTerm);
  });
}

$(watchForm);

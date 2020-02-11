`use strict`;

const apikey1 = `355095-capstone-RKTGK7XD`;
const searchUrl1 = `https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar`;
const apikey2 = `MJ8eaEQisaabRvXpujodDgLMlRdGdGWS`;
const searchUrl2 = `https://app.ticketmaster.com/discovery/v2/attractions.json`;

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}
function displayResults1 (responseJson){
  //set to empty any previous results from results-list
  $(`#results-list`).empty();
  console.log(responseJson);
  if (responseJson.Similar.Results.length === 0) {
    $('#results-list').append(
     `<div id="result-box">
       <h2> No result found, try a different artist.</h2>
      </div>`);
    return;
  }
  //iterates through the info array within the "similar" object
  //the similar object holds data of artists,books,etc from TasteDive API
for (let i = 0; i<responseJson.Similar.Info.length; i++){
  //For each result searched, artist info, youtube link, and description will be listed.
  $('#results-list').append(
    `<div id="result-box">
      <h2> You searched: ${responseJson.Similar.Info[i].Name}</h2>
        <p>${responseJson.Similar.Info[i].wTeaser}</p>
      <div id="flex-cont">
        <p><iframe width="560" height="315" src="${responseJson.Similar.Info[i].yUrl}allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>
      </div>
    </div>`);
}
  //for each artist listed as similar, artist info, name, youtube link and description will be listed.
  for (let i = 0; i<responseJson.Similar.Results.length; i++){
    $('#results-list0').append(`
    <div id="result-box1"> 
    <h2>SIMILAR ARTIST: </h2>
      <h3>${responseJson.Similar.Results[i].Name}</h3>
      <h4>BIOGRAPHY<br/></h4>
        <p>${responseJson.Similar.Results[i].wTeaser}</p>
      <div id="flex-cont1">
        <p><iframe width="560" height="315" src="${responseJson.Similar.Results[i].yUrl} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>
      </div>
    </div>`);
};
$('#results').removeClass('hidden');
};
function tasteDive (searchTerm) {
  //setting the parameters necessary to retrieve the data 
  const params = {
    q: searchTerm,
    type: `music`,
    limit: 3,
    k: apikey1,
    verbose: 1,
    jsonp: 'callback',
    dataType: 'jsonp',
  };
  const queryString = formatQueryParams(params)
  const  url1= searchUrl1 + `?` + queryString;
  console.log(url1);

    fetch(url1)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("sorry no results");
    })
    .then(responseJson => displayResults1(responseJson))
  }   

  function displayResults2(responseJson){
    console.log(responseJson);
    $(`#results-list1`).empty();
    //for each attraction, the name, an image, upcoming event (num), and URL to ticketmaster page will be listed.
    for (let i = 0; i<responseJson._embedded.attractions.length; i++){
      $('#results-list1').append(`
      <div id="result-box2">
      <h2>CHECK OUT THIS EVENT</h2>
        <h3>Event Title: ${responseJson._embedded.attractions[i].name}</h3>
          <p><img src="${responseJson._embedded.attractions[i].images[0].url}" alt="image of artist or event"></p> 
          <p> Upcoming Events: ${responseJson._embedded.attractions[i].upcomingEvents._total}</p>
          <p>Follow on Instagram:  <a href="${responseJson._embedded.attractions[i].externalLinks.instagram[0].url}"target="_blank"><i class="fab fa-instagram"></i></a></p>
          <p><a href="${responseJson._embedded.attractions[i].url}"target="_blank">Click here for more details about the artist and ticket sales</a></p>
      </div>`);};
    $('#results').removeClass('hidden');
  };
  
  function ticketmaster (searchTerm) {
    const params = {
      keyword: searchTerm,
      apikey: apikey2,
      size: 3
    };
    const queryString = formatQueryParams(params)
    const  url2= searchUrl2 + `?` + queryString;
    console.log(url2);
      fetch(url2)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResults2(responseJson)) 
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

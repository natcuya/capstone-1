`use strict`;

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
  $('#results-list').append(`<div id="artistSearch"><h2> You searched: ${responseJson.Similar.Info[i].Name}</h2><p>${responseJson.Similar.Info[i].wTeaser}</p><p><iframe width="560" height="315" src="${responseJson.Similar.Info[i].yUrl}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p></div>`
  );}
  for (let i = 0; i<responseJson.Similar.Results.length; i++){
    $('#results-list').append(`
    <div> Similar Artists:
      <h3>${responseJson.Similar.Results[i].Name}
      </h3><p>${responseJson.Similar.Results[i].wTeaser}</p>
      <p><iframe width="560" height="315" src="${responseJson.Similar.Results[i].yUrl}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>
    </div>`);
};
$('#results').removeClass('hidden');
};

function tasteDive (searchTerm) {
  const params = {
    q: searchTerm,
    type: `music`,
    limit: 3,
    info: 1,
    k: apikey1,
    verbose: 1,
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


function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    let searchTerm = $('#js-search-term').val();
  // artistSearch(searchTerm);
  // getTopTracks(searchTerm);
   tasteDive(searchTerm);
  });
  
}

$(watchForm);

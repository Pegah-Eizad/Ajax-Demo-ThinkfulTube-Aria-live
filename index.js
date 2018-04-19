e strict';

const YOUTUBE_SEARCH_ENDPOINT = 'https://www.googleapis.com/youtube/v3/search';

function handleForm() {
  const youtubeForm = $('form[name=youtube-search]');
  const searchField = $('input[name=search]');
  
  youtubeForm.on('submit', function(e) {
    e.preventDefault();
    
    // get the usersearch entered
     
    const query  = searchField.val();
    //console.log(query);
    /*
    const query = {
    part: 'snippet',
    key: `AIzaSyAKFCsbsJ-lR3nhd4OMAyGh2YOO2KVtAC0`,
    maxResults: 5
  }
    */
    // pass it in along with the YT endpoint
    fetchYTData(YOUTUBE_SEARCH_ENDPOINT, query);
    
    // reset the input
    searchField.val('');
  });
}


function fetchYTData(baseURL, query) {
  
  // make the complete url by concatenating
  // the endpoint and username together
//https://www.googleapis.com/youtube/v3/search?q=surfing&maxResults=2&key=AIzaSyAKFCsbsJ-lR3nhd4OMAyGh2YOO2KVtAC0&part=snippet
  const queryconcat = baseURL+"?q="+query+"&maxResults=5&key=AIzaSyAKFCsbsJ-lR3nhd4OMAyGh2YOO2KVtAC0&part=snippet";
  // try to get some JSON
  console.log(queryconcat);
  // and show something to the user.
  
  $.getJSON(queryconcat, renderData)
  // ... and show an error if we can't.
    .fail(showErr);
}

function renderData(data){
  const results = data.items.map((item, index) => showResults(item));
}

function showResults(resultData) {
  // store the element we'll be appending to
  console.log("!!!!!!");

  const outputElem = $('.js-output');
  
  // Store the parts we want from data
  // using object destructuring
  let videoId = resultData.id.videoId;
  let title = resultData.snippet.title;
  let thumbnail = resultData.snippet.thumbnails.medium.url;
  
  // if there's no name in the profile
  // well inform our user
  if (!title) title = 'undefined :(';
  
  // We'll use the variables above to present
  // the information we got from youtube.
  let queryInfoHTML = "";
  queryInfoHTML += (
    `<div>
      <a class="js-result-name" href="https://www.youtube.com/watch?v=${videoId}" target="_blank" target="_blank"><img src="${thumbnail}"></a>
      <h2><a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">${title}</a></h2>
    </div>`
  );
  
  console.log(queryInfoHTML);
  
  // then empty the output region
  // and append our profile info
  outputElem 
    .prop('hidden', false)
    .append(queryInfoHTML);

}

function showErr(err) {
  const outputElem = $('.js-output');
  
  const errMsg = (
    `<p>We couldn't find any results for that search!`
  );
    
  outputElem
    .prop('hidden', false)
    .html(errMsg);
}

$(handleForm);


//**************************************************



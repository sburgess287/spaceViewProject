'use strict';

const nasaSearchUrl = "https://cors-anywhere.herokuapp.com/https://images-api.nasa.gov/search";
const apiKey = 'MQP3dZedmR0tH2NUAMuRTva9WKV47YnTwF1mbumk';

// https://images-api.nasa.gov/search?media_type=image&q=Jupiter&keywords=planet
function getDataFromApi(query, callback) {
  console.log('getDataFromApi ran');
  console.log(query);
  const params = {
    media_type : 'image',
    q : 'planet',
   // title : query,
  // year_start : '2017',
    q : query

  };
 // Use .ajax method to retrieve data from the Nasa API
  $.ajax(
    {
      url : nasaSearchUrl,
      data : params, 
      method : 'GET',
      headers : {
        api_key : apiKey,
      },
      success : callback,
    }, 
      // error handling here in case api is down?
  ) 

  

}

// remember to add loading text while results are returned
// placeholder? Specify for Planet results page? 
// function generatePlanetsFoundPageString(data) {
//   console.log('renderResult ran and showing json data a second time just after this log');
//   console.log(data);
 
//   return `
//   <!-- Planet page for returning image-->
//   <div class="planet-image-page">
//       <section role="region" class="container col-12">
//           <h2>Planet Page</h2>
//           <p>Choose to search for Planets, Stars, or Nebula</p>
//           <div class="search-options">
//               <button class="planets-btn" type="button">Search Planets</button>
//               <button class="stars-btn" type="button">Search Stars</button>
//               <button class="nebulae-btn" type="button">Search Nebulas</button>
//           </div>
//           <div class="imageContainer">
             
//               <img src="${data.collection.items[i].links[0].href}" class="responsive-image" alt="${data.collection.items[i].data[0].description}">
//           </div> 
//           <div class="pictureInformation">
              
//               <h3>${data.collection.items[i].data[0].title}</h3>

//               <p>${data.collection.items[i].data[0].description}</p>    
                      
             
//               <a href="https://www.jpl.nasa.gov/spaceimages/details.php?id=${collection.items.nasa_id}" class="linkStyleInfo">Link to image on Nasa website</a>
//           </div>
//       </section>
//   </div>
//   `
// }

// add click handlers for buttons at top and search button
function generateNoPlanetsFoundPageString(){
  return `
  <!-- Error Page-->
    <div class="error-page">
        <section role="region" class="container col-12">
            <h2>Your Image was not Found!</h2>
            <p>Choose to search for Planets, Stars, or Nebula</p>
            <!-- update this to take out form;  bad to have 2 forms on 1-->
            <div class="search-options">
                <button class="planets-btn" type="button">Search Planets</button>
                <button class="stars-btn" type="button">Search Stars</button>
                <button class="nebulae-btn" type="button">Search Nebulas</button>
            </div>
            <p>Or ...Please try again!</p>
            <p>Which Planet do you want to View?</p>
            <form class='searchForm'>
                <div>
                    <label for="new-search-planet">Search Planet</label>
                    <!--add it back Removing required on this input because they can also choose other Planets/Stars/Nebula buttons-->
                    <input type="text" id="new-search-planet" name="new-search-planet" required> 
                    <button type="submit">Search</button>
                </div>
            </form>
            <p>Possible search options: Mercury, Venus, Neptune</p>

        </section>

    </div>
  `
}


function displayNasaSearchData(data) {
  console.log('.ajax has returned json, and displayNasaSearchData ran');
  console.log(data);
  console.log(data.collection.items.length);
  $('.contentContainer').empty();
    // handle no elements returned
    if (data.collection.items.length === 0) {
      const noPlanetsFoundPage = generateNoPlanetsFoundPageString();
      $('.contentContainer').html(noPlanetsFoundPage);
    } else {
      for (let i = 0; i < 5; i++) {
      //for (let i = 0; i < data.collection.items.length; i++) {
      //   console.log(data.collection.items[i].data[0].title);
      // const planetsFoundPage = generatePlanetsFoundPageString(data);
      //  $('.contentContainer').html(planetsFoundPage);
      // use .map? .append?  trying to dynamically show a list while at the same time top part of the page is static
        $('.contentContainer').html(
          `
          <!-- Planet page for returning image-->
          <div class="planet-image-page">
            <section role="region" class="container col-12">
              <h2>Planet Page</h2>
              <p>Choose to search for Planets, Stars, or Nebula</p>
              <div class="search-options">
                  <button class="planets-btn" type="button">Search Planets</button>
                  <button class="stars-btn" type="button">Search Stars</button>
                  <button class="nebulae-btn" type="button">Search Nebulas</button>
              </div>  
              <div class=".js-search-results">
                <div class="imageContainer">
                  <img src="${data.collection.items[i].links[0].href}" class="responsive-image" alt="${data.collection.items[i].data[0].description}">
                </div> 
                <div class="pictureInformation">
                    <h3>${data.collection.items[i].data[0].title}</h3>
                    <p>${data.collection.items[i].data[0].description}</p>            
                    <a href="https://www.jpl.nasa.gov/spaceimages/details.php?id=${data.collection.items[i].data[0].nasa_id}" class="linkStyleInfo" target="_blank">Link to image on Nasa website</a>
                </div>
              <div>
            </section>
          </div>`   
        )    
      }
    }
  };

// this function runs on click of the Nebulas button
function showNebulasSearchPage() {
  console.log('showNebulasSearchPage ran');

}

// this function runs on click fo the stars button
function showStarSearchPage() {
  console.log('showStarSearchPage ran');

}


function generatePlanetSearchPageString(){
  return`
  <!-- Planet page for search-->
  <div class="planet-search-page">
      <section role="region" class="container col-12">
          <h2>Planet Page</h2>
          <p>Which Planet do you want to View?</p>
          <form class='search-planet-form'>
              <div>
                  <label for="planet">Search Planet</label>
                  <input type="text" id="planet-input" name="planet" required>
                  <button type="submit">Search</button>
              </div>
          </form>
          <p>Possible search options: Mercury, Venus, Neptune</p>  
      </section>

  </div>
  `
}


// this function runs on click of the planet button
// to load the content to Search the Planet page
function showPlanetsSearchPage() {
  console.log('showPlanetsSearchPage ran');
  const planetPage = generatePlanetSearchPageString();
  $('.contentContainer').html(planetPage);
}



// Function that returns the html to load on the welcome page
function generateNewPageString(){
  return`
  <section role="region" class="welcome-page">
      <h2>Welcome to the Space View!</h2>
      <p>Choose to search for Planets, Stars, or Nebulae</p>
      <div class="search-options">
        <button class="planets-btn" type="button">Search Planets</button>
        <button class="stars-btn" type="button">Search Stars</button>
        <button class="nebulae-btn" type="button">Search Nebulas</button>
      </div>
      <!--Sample image maybe IMage of the day from Nasa-->
      <div class="imageContainer">
        <img src="https://images-assets.nasa.gov/image/PIA22766/PIA22766~thumb.jpg" class="responsive-image" alt="Sweet Picture of Saturn; will use info from API call">
      </div>       
  </section>
  `
}

// Dynamically load the html of the welcome page when the page loads
function showWelcomePage(){
  console.log('showWelcomePage ran');
  const newPage = generateNewPageString();
  $('.contentContainer').html(newPage);
}


function handleForm() {
  console.log('handleForm ran');
  // Show welcome page
  showWelcomePage();

  // 1 function? currently wrote 3 with an event listener on each button
  // On click of planets button, load the search planet page
  // On click of stars button, load the stars page
  // On click of the Nebulas button, load the nebulas page

  // Listen for button clicks using event delegation because they're dynamically loading too

  // $('.planets-btn').click(function() {
  //   console.log('planets button clicked');
  //   showPlanetsSearchPage();
  // });

  // $('.stars-btn').click(function() {
  //   console.log('stars button clicked');
  //   showStarSearchPage();
  // })
  
  // $('.nebulae-btn').click(function() {
  //   console.log('nebulae button clicked');
  //   showNebulasSearchPage();
  // })




  // Listen for the form submit on each page
  // Pass the value of the form to nasa api query
  // Display results (included in function 1 line above?)
  // event delegation 
  $('.contentContainer').on('submit', '.search-planet-form', event => {
 // $('.search-planet-form').submit(event => {
    event.preventDefault();
    const query = $('#planet-input').val();
    console.log(query);
    //queryTarget.val(""); // in case I want to clear the input, not sure if necessary?
    getDataFromApi(query, displayNasaSearchData);

  })


  $('.contentContainer').on('click', '.planets-btn', event => {
    console.log('planets button clicked inside the event delegation function');
    showPlanetsSearchPage();
  })

  $('.contentContainer').on('click', '.stars-btn', event => {
    console.log('stars button clicked inside the event delegation function');
    showStarSearchPage();
  })

  $('.contentContainer').on('click', '.nebulae-btn', event => {
    console.log('nebulae button clicked inside the event delegation function');
    showNebulasSearchPage();
  })



}

$(handleForm);

// Sample data and responses:
// Example object from 1st Nasa Query:
// {
//   "copyright": "Takao Sambommatsu",
//   "date": "2018-10-21",
//   "explanation": "A meteor, a comet, and a photogenic nebula have all been captured in this single image.  The closest and most fleeting is the streaking meteor on the upper right -- it was visible for less than a second. The meteor, which disintegrated in Earth's atmosphere, was likely a small bit of debris from the nucleus of Comet 21P/Giacobini-Zinner, coincidentally the comet captured in the same image. Comet 21P, pictured across the inner Solar System from Earth, is distinctive for its long dust tail spread horizontally across the image center.  This comet has been visible with binoculars for the past few months but is now fading as it heads back out to the orbit of Jupiter.  Farthest out at 3,500 light years distant is the IC 2177, the Seagull Nebula, visible on the left.  The comparatively vast Seagull Nebula, with a wingspan on order 250 light-years, will likely remain visible for hundreds of thousands of years.  Long exposures, taken about two weeks ago from Iwaki-City in Japan, were combined to capture the image's faintest elements.  You, too, could see a meteor like this -- and perhaps sooner than you might think: tonight is the peak of the Orionids meteor shower.",
//   "hdurl": "https://apod.nasa.gov/apod/image/1810/CometMeteorNebula_TSam_5310.jpg",
//   "media_type": "image",
//   "service_version": "v1",
//   "title": "Meteor, Comet, and Seagull (Nebula)",
//   "url": "https://apod.nasa.gov/apod/image/1810/CometMeteorNebula_TSam_1080.jpg"
// }

// var settings = {
    //   "async": true,
    //   "crossDomain": true,
    //   "url": "https://cors-anywhere.herokuapp.com/https://images-api.nasa.gov/search?media_type=image&q=Neptune",
    //   "method": "GET",
    //   "headers": {
    //     "api_key": "MQP3dZedmR0tH2NUAMuRTva9WKV47YnTwF1mbumk",
    //     "keywords": "planet",
    //     "title": "Neptune",
    //     "cache-control": "no-cache",
    //     "postman-token": "ca0cae98-87ec-0b79-730a-2246038d0e76",
    //     "X-Requested-With" : "XMLHttpRequest"
    //   }
    // }
    
    // $.ajax(settings).done(function (response) {
    //   console.log(response);
    // });

    // returns just a couple results
    // var settings = {
    //   "async": true,
    //   "crossDomain": true,
    //   "url": "https://cors-anywhere.herokuapp.com/https://images-api.nasa.gov/search?media_type=image&q=Betelgeuse",
    //   "method": "GET",
    //   "headers": {
    //     "api_key": "MQP3dZedmR0tH2NUAMuRTva9WKV47YnTwF1mbumk",
    //     "cache-control": "no-cache",
    //     "postman-token": "1c3e853b-9041-3e80-6706-1673889f947b",
    //     "X-Requested-With" : "XMLHttpRequest"
    //   }
    // }
    
    // $.ajax(settings).done(function (response) {
    //   console.log(response);
    // });
   

    // // Sample query from: https://api.nasa.gov/planetary/apod?api_key=MQP3dZedmR0tH2NUAMuRTva9WKV47YnTwF1mbumk
    // var settings = {
    //     "async": true,
    //     "crossDomain": true,
    //     "url": "https://api.nasa.gov/planetary/apod?api_key=MQP3dZedmR0tH2NUAMuRTva9WKV47YnTwF1mbumk",
    //     "method": "GET",
    //     "headers": {
    //       "cache-control": "no-cache",
    //       "postman-token": "16b06f60-911f-b377-7af0-909378870dff"
    //     }
    //   }
      
    //   $.ajax(settings).done(function (response) {
    //     console.log(response);
    //   });

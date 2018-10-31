'use strict';

const nasaSearchUrl = "https://cors-anywhere.herokuapp.com/https://images-api.nasa.gov/search";
const apiKey = 'MQP3dZedmR0tH2NUAMuRTva9WKV47YnTwF1mbumk';

// https://images-api.nasa.gov/search?media_type=image&q=Jupiter&keywords=planet
function getDataFromApi(query, description_508, callback) {
//function getDataFromApi(query, callback) {
  console.log('getDataFromApi ran');
  console.log(query);
  const params = {
    media_type : 'image',
    //q : 'planet',
    //title : query,
  // year_start : '2017',
    description_508 : description_508,
    q : query,
    

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
      error : function (a,b,c){
        console.log("whateverI want",c);
      }
    }, 
      
  ) 
}

// Creates the string for No results found page for Planet Search
function generateNoPlanetsFoundPageString(){
  return`
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
        <form class='search-planet-form'>
          <div>
            <label for="planet">Search Planet</label>
            <!--add it back Removing required on this input because they can also choose other Planets/Stars/Nebula buttons-->
            <input type="text" id="planet-input" name="planet" required> 
            <button type="submit">Search</button>
          </div>
        </form>
        <p>Possible search options: Mercury, Venus, Neptune, Pluto, planet</p>

      </section>

    </div>
  `
}

// Creates the string for No results found page for Star Search
function generateNoStarsFoundPageString(){
  return`
  <!-- Error Page Star-->
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
        <p>Which Star do you want to View?</p>
        <form class='search-star-form'>
            <div>
                <label for="new-search-star">Search Stars</label>
                <!--add it back Removing required on this input because they can also choose other Planets/Stars/Nebula buttons-->
                <input type="text" id="star-input" name="Star" required> 
                <button type="submit">Search</button>
            </div>
        </form>
        <p>Possible search options: Sirius, Betelgeuse, Vega, Star system</p>

      </section>

    </div>
  `
}

// Creates the string for No results found page for Nebula Search
function generateNoNebulasFoundPageString(){
  return`
  <!-- Error Page Nebula-->
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
      <p>Which Nebula do you want to View?</p>
      <form class='search-nebulae-form'>
        <div>
          <label for="new-search-nebula">Search Nebulae</label>
          <!--add it back Removing required on this input because they can also choose other Planets/Stars/Nebula buttons-->
          <input type="text" id="nebula-input" name="Nebula" required> 
          <button type="submit">Search</button>
        </div>
      </form>
      <p>Possible search options: Orion Nebula, Helix Nebula, Trifid Nebula</p>
    </section>
  </div>
  `
}

// This function loads images and data for Planet Search from the Nasa API
function displayNasaSearchData(data) {
  console.log('.ajax has returned json, and displayNasaSearchData ran');
  console.log(data);
  console.log(data.collection.items.length);
    // handle no elements returned
    if (data.collection.items.length === 0) {
      const noPlanetsFoundPage = generateNoPlanetsFoundPageString();
      $('.contentContainer').html(noPlanetsFoundPage);
    } else {
      const planetList = []
      const resultArrayLength = data.collection.items.length;
      const numberOfResultsToShow = 5
      // handle fewer objects than numberOfResultsTosShow
      if(resultArrayLength < numberOfResultsToShow){
        for (let i = 0; i < resultArrayLength; i++) {
          planetList.push(
            `<div class="imageContainer">
            <img src="${data.collection.items[i].links[0].href}" class="responsive-image" alt="${data.collection.items[i].data[0].description}">
            </div> 
            <div class="pictureInformation">
              <h3>${data.collection.items[i].data[0].title}</h3>
              <p>${data.collection.items[i].data[0].description}</p>            
              <a href="https://www.jpl.nasa.gov/spaceimages/details.php?id=${data.collection.items[i].data[0].nasa_id}" class="linkStyleInfo" target="_blank">Link to image on Nasa website</a>
            </div>`
          )
        } 
    } else if (resultArrayLength >= numberOfResultsToShow) {
        for (let i = 0; i <= numberOfResultsToShow; i++) {
          planetList.push(
            `<div class="imageContainer">
            <img src="${data.collection.items[i].links[0].href}" class="responsive-image" alt="${data.collection.items[i].data[0].description}">
          </div> 
          <div class="pictureInformation">
            <h3>${data.collection.items[i].data[0].title}</h3>
            <p>${data.collection.items[i].data[0].description}</p>            
            <a href="https://www.jpl.nasa.gov/spaceimages/details.php?id=${data.collection.items[i].data[0].nasa_id}" class="linkStyleInfo" target="_blank">Link to image on Nasa website</a>
          </div>`
          )
        } 
      }

    $('.contentContainer').html(
        `
        <!-- Planet page for returning image-->
        <div class="planet-image-page">
          <section role="region" class="container col-12">
            <h2>Planet Page</h2>
            <p>Choose to search for Planets, Stars, or Nebulae</p>
            <div class="search-options">
              <button class="planets-btn" type="button">Search Planets</button>
              <button class="stars-btn" type="button">Search Stars</button>
              <button class="nebulae-btn" type="button">Search Nebulas</button>
            </div>  
            <div class="js-search-results">
             ${planetList.join('')}
            <div>
          </section>
        </div>`   
      )    
    }
  };

// This function loads images and data for Star Search from the Nasa API
function displayStarSearchData(data){
  console.log('.ajax has returned json and displayStarSearchData ran');
  console.log(data);
  console.log(data.collection.items.length);
    // handle no elements returned after query
    if (data.collection.items.length === 0) {
      const noStarsFoundPage = generateNoStarsFoundPageString();
      $('.contentContainer').html(noStarsFoundPage);
    } else {
      const starList = []
      const resultArrayLength = data.collection.items.length;
      const numberOfStarResultsToShow = 5;
      // handle fewer objects returned than numberOfStarResultsToShow
      if (resultArrayLength < numberOfStarResultsToShow) {
        for (let i = 0; i < resultArrayLength; i++) {
          starList.push(
            `<div class="imageContainer">
            <img src="${data.collection.items[i].links[0].href}" class="responsive-image" alt="${data.collection.items[i].data[0].description}">
            </div> 
            <div class="pictureInformation">
              <h3>${data.collection.items[i].data[0].title}</h3>
              <p>${data.collection.items[i].data[0].description}</p>            
              <a href="https://www.jpl.nasa.gov/spaceimages/details.php?id=${data.collection.items[i].data[0].nasa_id}" class="linkStyleInfo" target="_blank">Link to image on Nasa website</a>
            </div>`
          )
        }
        // handle greater number of results than numberOfStarResultsToShow
      } else if (resultArrayLength >= numberOfStarResultsToShow) {
        for (let i = 0; i < numberOfStarResultsToShow; i++) {
          starList.push(
            `<div class="imageContainer">
            <img src="${data.collection.items[i].links[0].href}" class="responsive-image" alt="${data.collection.items[i].data[0].description}">
            </div> 
            <div class="pictureInformation">
              <h3>${data.collection.items[i].data[0].title}</h3>
              <p>${data.collection.items[i].data[0].description}</p>            
              <a href="https://www.jpl.nasa.gov/spaceimages/details.php?id=${data.collection.items[i].data[0].nasa_id}" class="linkStyleInfo" target="_blank">Link to image on Nasa website</a>
            </div>`
          )
        }
      }
      $('.contentContainer').html(
        `
        <!-- Star Return Image page-->
        <div class="star-image-page" >
          <section role="region" class="container col-12">
            <h2>Star Page</h2>
            <p>Choose to search for Planets, Stars, or Nebulae</p>
            <div class="search-options">
              <button class="planets-btn" type="button">Search Planets</button>
              <button class="stars-btn" type="button">Search Stars</button>
              <button class="nebulae-btn" type="button">Search Nebulas</button>
            </div>
            <div class="js-search-results">
            ${starList.join('')}
          </section>
        </div>
            `
        )
    }
}

// This function loads images and data for Nebula Search from the Nasa API
function displayNebulaSearchData(data){
  console.log('.ajax has returned json and displayNebulaSearchData ran');
  console.log(data);
  console.log(data.collection.items.length);
    // handle no elements returned after query
    if (data.collection.items.length === 0) {
      const noNebulasFoundPage = generateNoNebulasFoundPageString();
      $('.contentContainer').html(noNebulasFoundPage);
    } else {
      const nebulaList = []
      const resultArrayLength = data.collection.items.length;
      const numberOfNebulaResultsToShow = 5
      // handle fewer objects returned than numberOfNebulaResultsToShow
      if (resultArrayLength < numberOfNebulaResultsToShow) {
        for (let i = 0; i < resultArrayLength; i++) {
          nebulaList.push(
            `<div class="imageContainer">
            <img src="${data.collection.items[i].links[0].href}" class="responsive-image" alt="${data.collection.items[i].data[0].description}">
            </div> 
            <div class="pictureInformation">
              <h3>${data.collection.items[i].data[0].title}</h3>
              <p>${data.collection.items[i].data[0].description}</p>            
              <a href="https://www.jpl.nasa.gov/spaceimages/details.php?id=${data.collection.items[i].data[0].nasa_id}" class="linkStyleInfo" target="_blank">Link to image on Nasa website</a>
            </div>
            `
          )
        }
        // handle greater number of results than numberOfNebulaResultsToShow
      } else if (resultArrayLength >= numberOfNebulaResultsToShow) {
        for (let i = 0; i < numberOfNebulaResultsToShow; i++) {
          nebulaList.push(
            `<div class="imageContainer">
            <img src="${data.collection.items[i].links[0].href}" class="responsive-image" alt="${data.collection.items[i].data[0].description}">
            </div> 
            <div class="pictureInformation">
              <h3>${data.collection.items[i].data[0].title}</h3>
              <p>${data.collection.items[i].data[0].description}</p>            
              <a href="https://www.jpl.nasa.gov/spaceimages/details.php?id=${data.collection.items[i].data[0].nasa_id}" class="linkStyleInfo" target="_blank">Link to image on Nasa website</a>
            </div>
            `
          )
        }
      }
        $('.contentContainer').html(
          `
          <!-- Nebula Return Image page-->
            <div class="nebula-image-page">
              <section role="region" class="container col 12">
                <h2>Nebula Page</h2>
                <p>Choose to search for Planets, Stars, or Nebulae</p>
                <div class="search-options">
                  <button class="planets-btn" type="button">Search Planets</button>
                  <button class="stars-btn" type="button">Search Stars</button>
                  <button class="nebulae-btn" type="button">Search Nebulas</button>
                </div>
                <div class="js-search-results">
                ${nebulaList.join('')}
              </section>
            </div>
          `
        )
    } 
}

// Generates string for the Star search page
function generateStarSearchPageString(){
  return`
  <div class="star-search-page">
    <section role="region" class="container col-12">
      <h2>Star Page</h2>
      <!-- considering adding radio buttons?  there's a limited number of planets.-->
      <p>Which Stars do you want to View?</p>
      <form class='search-star-form'>
        <div>
          <label for="star">Search Star</label>
          <input type="text" id="star-input" name="Star" required>
          <button type="submit">Search</button>
        </div>
      </form>
      <p>Possible search options: Sirius, Betelgeuse, Vega, Witch, star system</p>  
    </section>
  </div>
  `
}

// Generates string for the Nebula search page
function generateNebulaSearchPageString(){
  return`
  <!-- Nebula Search page-->
  <div class="nebula-search-page">
    <section role="region" class="container col-12">
      <h2>Nebula Page</h2>
      <p>Which Nebulas do you want to View?</p>
      <form class='search-nebulae-form'>
        <div>
          <label for="new-search-nebula">Search Nebulae</label>
          <input type="text" id="nebula-input" name="Nebula" required>
          <button type="submit">Search</button>
        </div>
      </form>
      <p>Possible search options: Orion Nebula, Helix Nebula, Trifid Nebula, Nebula</p>  
    </section>
  </div>
  `
}

// Listens for Click of the Search Nebulas button, then loads the Nebula Search Page
function showNebulasSearchPage() {
  console.log('showNebulasSearchPage ran');
  const nebulaPage = generateNebulaSearchPageString();
  $('.contentContainer').html(nebulaPage);
}

// Listens for Click of the Search Stars button, then loads the Star Search Page
function showStarSearchPage() {
  console.log('showStarSearchPage ran');
  const starPage = generateStarSearchPageString();
  $('.contentContainer').html(starPage);
}

// Generates string for the Planet search page
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
      <p>Possible search options: Mercury, Venus, Neptune, Pluto, planet</p>  
  </section>
  </div>
  `
}


// Listens for Click of the Search Planet button, then loads the Planet Search Page
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

  // Listen for the form submit on '.search-planet-form'
  // Pass the value of the form to nasa api query
  $('.contentContainer').on('submit', '.search-planet-form', event => {
  // $('.search-planet-form').submit(event => {
    event.preventDefault();
    const query = $('#planet-input').val();
    console.log(query);
    getDataFromApi(query, 'planet', displayNasaSearchData);
  })

  // Listen for the form submit on '.search-star-form'
  // Pass the value of the form to nasa api query
  $('.contentContainer').on('submit', '.search-star-form', event => {
    event.preventDefault();
    const query = $('#star-input').val();
    console.log(query);
    getDataFromApi(query, 'star', displayStarSearchData);
  })

  // Listen for the form submit on '.search-nebulae-form'
  // Pass the value of the form to nasa api query
  $('.contentContainer').on('submit', '.search-nebulae-form', event => {
    event.preventDefault();
    const query = $('#nebula-input').val();
    console.log(query);
    getDataFromApi(query, 'nebulae', displayNebulaSearchData);
  })

  // Listen for clicks on the .contentContainer for clicks on the planet/stars/search buttons 
  // when dynamically loaded on different pages
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

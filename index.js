'use strict';

const nasaSearchUrl = "https://cors-anywhere.herokuapp.com/https://images-api.nasa.gov/search";
const apiKey = 'MQP3dZedmR0tH2NUAMuRTva9WKV47YnTwF1mbumk';

// https://images-api.nasa.gov/search?media_type=image&q=Jupiter&keywords=planet
function getDataFromApi(query, description_508, callback) {
  $('.contentContainer').html(createSpinner);
  const params = {
    media_type : 'image',
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
      error : function (a,b,c) {
        console.log("Error message: ",c);
      }
    },  
  ) 
}

function createSpinner() {
  return `
  <div class="lds-dual-ring"></div>
  `
}

// Creates the string for No results found page for Planet Search
function generateNoPlanetsFoundPageString(){
  return`
  <!-- Error Page-->
    <div class="error-page">
      <section role="region" class="container css-container">
        <h2>Your Image was not Found!</h2>
        <p>Choose to search for Planets, Stars, or Nebula</p>
        <!-- update this to take out form;  bad to have 2 forms on 1-->
        <div class="search-options">
          <button class="planets-btn css-search-buttons" type="button">Planets</button>
          <button class="stars-btn css-search-buttons" type="button">Stars</button>
          <button class="nebulae-btn css-search-buttons" type="button">Nebulas</button>
        </div>
        <p>Or ...Please try again!</p>
        <p>Which Planet do you want to View?</p>
        <form class='search-planet-form'>
          <div>
            <label for="planet-input">Search Planet</label>
            <!--add it back Removing required on this input because they can also choose other Planets/Stars/Nebula buttons-->
            <input class="css-input-forms" type="text" id="planet-input" name="planet" required> 
            <button class="css-search-buttons" type="submit">Search</button>
          </div>
        </form>
        <p>Possible search options: Mars, nebula, Neptune, Pluto, planet, Saturn</p>
        <button class="homepage-btn css-homepage-btn" type="button">Start Over</button>
      </section>
    </div>
  `
}

// Creates the string for No results found page for Star Search
function generateNoStarsFoundPageString(){
  return`
  <!-- Error Page Star-->
  <div class="error-page">
    <section role="region" class="container css-container">
      <h2>Your Image was not Found!</h2>
      <p>Choose to search for Planets, Stars, or Nebula</p>
      <!-- update this to take out form;  bad to have 2 forms on 1-->
      <div class="search-options">
          <button class="planets-btn css-search-buttons" type="button">Planets</button>
          <button class="stars-btn css-search-buttons" type="button">Stars</button>
          <button class="nebulae-btn css-search-buttons" type="button">Nebulas</button>
      </div>
      <p>Or ...Please try again!</p>
      <p>Which Star do you want to View?</p>
      <form class='search-star-form'>
          <div>
              <label for="star-input">Search Stars</label>
              <!--add it back Removing required on this input because they can also choose other Planets/Stars/Nebula buttons-->
              <input class="css-input-forms" type="text" id="star-input" name="Star" required> 
              <button class="css-search-buttons" type="submit">Search</button>
          </div>
      </form>
      <p>Possible search options: Andromeda, Aquila, Cygnus, Gemini, star, Taurus</p>
      <button class="homepage-btn css-homepage-btn" type="button">Start Over</button>
    </section>
  </div>
  `
}

// Creates the string for No results found page for Nebula Search
function generateNoNebulasFoundPageString(){
  return`
  <!-- Error Page Nebula-->
  <div class="error-page">
    <section role="region" class="container css-container">
      <h2>Your Image was not Found!</h2>
      <p>Choose to search for Planets, Stars, or Nebula</p>
      <!-- update this to take out form;  bad to have 2 forms on 1-->
      <div class="search-options">
        <button class="planets-btn css-search-buttons" type="button">Planets</button>
        <button class="stars-btn css-search-buttons" type="button">Stars</button>
        <button class="nebulae-btn css-search-buttons" type="button">Nebulas</button>
      </div>
      <p>Or ...Please try again!</p>
      <p>Which Nebula do you want to View?</p>
      <form class="search-nebulae-form">
        <div>
          <label for="nebula-input">Search Nebulae</label>
          <!--add it back Removing required on this input because they can also choose other Planets/Stars/Nebula buttons-->
          <input class="css-input-forms" type="text" id="nebula-input" name="Nebula" required> 
          <button class="css-search-buttons" type="submit">Search</button>
        </div>
      </form>
      <p>Possible search options: Butterfly Nebula, Ghost of Jupiter, Orion Nebula, Ring Nebula, Sagittarius,</p>
      <button class="homepage-btn css-homepage-btn" type="button">Start Over</button>
    </section>
  </div>
  `
}

// This function loads images and data for Planet Search from the Nasa API
function displayNasaSearchData(data) {
  //console.log('.ajax has returned json, and displayNasaSearchData ran');
  //console.log(data);
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
            `
            <div class="result-cards">
              <div class="imageContainer">
              <a href="https://www.jpl.nasa.gov/spaceimages/details.php?id=${data.collection.items[i].data[0].nasa_id}" target="_blank">
              <img src="${data.collection.items[i].links[0].href}" class="responsive-image" alt="${data.collection.items[i].data[0].description}"></a>
              </div> 
              <div class="pictureInformation">
                <h3>${data.collection.items[i].data[0].title}</h3>
                <p class="css-image-description-text">"${data.collection.items[i].data[0].description}"</p>            
                <a href="https://www.jpl.nasa.gov/spaceimages/details.php?id=${data.collection.items[i].data[0].nasa_id}" class="linkStyleInfo" target="_blank">Link to image on Nasa website</a>
              </div>
            </div>
            `
          )
        } 
      } else if (resultArrayLength >= numberOfResultsToShow) {
        for (let i = 0; i <= numberOfResultsToShow; i++) {
          planetList.push(
            `
            <div class="result-cards">
              <div class="imageContainer">
              <a href="https://www.jpl.nasa.gov/spaceimages/details.php?id=${data.collection.items[i].data[0].nasa_id}" target="_blank">
              <img src="${data.collection.items[i].links[0].href}" class="responsive-image" alt="${data.collection.items[i].data[0].description}"></a>
              </div> 
              <div class="pictureInformation">
                <h3>${data.collection.items[i].data[0].title}</h3>
                <p class="css-image-description-text">"${data.collection.items[i].data[0].description}"</p>            
                <a href="https://www.jpl.nasa.gov/spaceimages/details.php?id=${data.collection.items[i].data[0].nasa_id}" class="linkStyleInfo" target="_blank">Link to image on Nasa website</a>
              </div>
            </div>
            `
          )
        } 
      }

    $('.contentContainer').html(
        `
        <!-- Planet page for returning image-->
        <div class="planet-image-page">
          <section role="region" class="container css-container">
            <h2>Planet Search Results</h2>
            <p>Choose to search for Planets, Stars, or Nebulae</p>
            <div class="search-options">
              <button class="planets-btn css-search-buttons" type="button">Planets</button>
              <button class="stars-btn css-search-buttons" type="button">Stars</button>
              <button class="nebulae-btn css-search-buttons" type="button">Nebulas</button>
            </div>  
            <div>
              <button class="homepage-btn css-homepage-btn" type="button">Start Over</button>
            </div>
            <div class="js-search-results">
             ${planetList.join('')}
             <button class="homepage-btn css-homepage-btn" type="button">Start Over</button>
            <div>
          </section>
        </div>
        `   
      )    
    }
  };

// This function loads images and data for Star Search from the Nasa API
function displayStarSearchData(data){
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
          `
          <div class="result-cards">
            <div class="imageContainer">
            <a href="https://www.jpl.nasa.gov/spaceimages/details.php?id=${data.collection.items[i].data[0].nasa_id}" target="_blank">
            <img src="${data.collection.items[i].links[0].href}" class="responsive-image" alt="${data.collection.items[i].data[0].description}"></a>
            </div> 
            <div class="pictureInformation">
              <h3>${data.collection.items[i].data[0].title}</h3>
              <p class="css-image-description-text">"${data.collection.items[i].data[0].description}"</p>            
              <a href="https://www.jpl.nasa.gov/spaceimages/details.php?id=${data.collection.items[i].data[0].nasa_id}" class="linkStyleInfo" target="_blank">Link to image on Nasa website</a>
            </div>
          </div>
          `
        )
      }
      // handle greater number of results than numberOfStarResultsToShow
    } else if (resultArrayLength >= numberOfStarResultsToShow) {
      for (let i = 0; i < numberOfStarResultsToShow; i++) {
        starList.push(
          `
          <div class="result-cards">
            <div class="imageContainer">
            <a href="https://www.jpl.nasa.gov/spaceimages/details.php?id=${data.collection.items[i].data[0].nasa_id}" target="_blank">
            <img src="${data.collection.items[i].links[0].href}" class="responsive-image" alt="${data.collection.items[i].data[0].description}"></a>
            </div> 
            <div class="pictureInformation">
              <h3>${data.collection.items[i].data[0].title}</h3>
              <p class="css-image-description-text">"${data.collection.items[i].data[0].description}"</p>            
              <a href="https://www.jpl.nasa.gov/spaceimages/details.php?id=${data.collection.items[i].data[0].nasa_id}" class="linkStyleInfo" target="_blank">Link to image on Nasa website</a>
            </div>
          </div>`
        )
      }
    }
    $('.contentContainer').html(
      `
      <!-- Star Return Image page-->
      <div class="star-image-page" >
        <section role="region" class="container css-container">
          <h2>Star Search Results</h2>
          <p>Choose to search for Planets, Stars, or Nebulae</p>
          <div class="search-options">
            <button class="planets-btn css-search-buttons" type="button">Planets</button>
            <button class="stars-btn css-search-buttons" type="button">Stars</button>
            <button class="nebulae-btn css-search-buttons" type="button">Nebulas</button>
          </div>
          <div>
            <button class="homepage-btn css-homepage-btn" type="button">Start Over</button>
          </div>
          <div class="js-search-results">
          ${starList.join('')}
          <button class="homepage-btn css-homepage-btn" type="button">Start Over</button>
        </section>
      </div>
          `
    )
  }
}

// This function loads images and data for Nebula Search from the Nasa API
function displayNebulaSearchData(data){
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
          `
          <div class="result-cards">
            <div class="imageContainer">
            <a href="https://www.jpl.nasa.gov/spaceimages/details.php?id=${data.collection.items[i].data[0].nasa_id}" target="_blank">
            <img src="${data.collection.items[i].links[0].href}" class="responsive-image" alt="${data.collection.items[i].data[0].description}"></a>
            </div> 
            <div class="pictureInformation">
              <h3>${data.collection.items[i].data[0].title}</h3>
              <p class="css-image-description-text">"${data.collection.items[i].data[0].description}"</p>            
              <a href="https://www.jpl.nasa.gov/spaceimages/details.php?id=${data.collection.items[i].data[0].nasa_id}" class="linkStyleInfo" target="_blank">Link to image on Nasa website</a>
            </div>
          </div>
          `
        )
      }
      // handle greater number of results than numberOfNebulaResultsToShow
    } else if (resultArrayLength >= numberOfNebulaResultsToShow) {
      for (let i = 0; i < numberOfNebulaResultsToShow; i++) {
        nebulaList.push(
          `
          <div class="result-cards">
            <div class="imageContainer">
            <a href="https://www.jpl.nasa.gov/spaceimages/details.php?id=${data.collection.items[i].data[0].nasa_id}" target="_blank">
            <img src="${data.collection.items[i].links[0].href}" class="responsive-image" alt="${data.collection.items[i].data[0].description}"></a>
            </div> 
            <div class="pictureInformation">
              <h3>${data.collection.items[i].data[0].title}</h3>
              <p class="css-image-description-text">"${data.collection.items[i].data[0].description}"</p>            
              <a href="https://www.jpl.nasa.gov/spaceimages/details.php?id=${data.collection.items[i].data[0].nasa_id}" class="linkStyleInfo" target="_blank">Link to image on Nasa website</a>
            </div>
          </div>
          `
        )
      }
    }
    $('.contentContainer').html(
      `
      <!-- Nebula Return Image page-->
        <div class="nebula-image-page">
          <section role="region" class="container css-container">
            <h2>Nebulae Search Results</h2>
            <p>Choose to search for Planets, Stars, or Nebulae</p>
            <div class="search-options">
              <button class="planets-btn css-search-buttons" type="button">Planets</button>
              <button class="stars-btn css-search-buttons" type="button">Stars</button>
              <button class="nebulae-btn css-search-buttons" type="button">Nebulas</button>
            </div>
            <div>
              <button class="homepage-btn css-homepage-btn" type="button">Start Over</button>
            </div>
            <div class="js-search-results">
            ${nebulaList.join('')}
            <button class="homepage-btn css-homepage-btn" type="button">Start Over</button>
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
    <section role="region" class="container css-container">
      <h2>Star Page</h2>
      <!-- considering adding radio buttons?  there's a limited number of planets.-->
      <p>Which Stars do you want to View?</p>
      <form class='search-star-form'>
        <div>
          <label for="star-input">Search Star</label>
          <input class="css-input-forms" type="text" id="star-input" name="Star" required>
          <button class="css-search-buttons" type="submit">Search</button>
        </div>
      </form>
      <p>Possible search options: Betelgeuse, Vega, Witch, star system</p>
      <button class="homepage-btn css-homepage-btn" type="button">Start Over</button>
    </section>
  </div>
  `
}

// Generates string for the Nebula search page
function generateNebulaSearchPageString(){
  return`
  <!-- Nebula Search page-->
  <div class="nebula-search-page">
    <section role="region" class="container css-container">
      <h2>Nebula Page</h2>
      <p>Which Nebulas do you want to View?</p>
      <form class='search-nebulae-form'>
        <div>
          <label for="nebula-input">Search Nebulae</label>
          <input class="css-input-forms" type="text" id="nebula-input" name="Nebula" required>
          <button class="css-search-buttons" type="submit">Search</button>
        </div>
      </form>
      <p>Possible search options: Orion Nebula, Helix Nebula, Trifid Nebula, Nebula</p> 
      <button class="homepage-btn css-homepage-btn" type="button">Start Over</button> 
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
    <section role="region" class="container css-container">
      <h2>Planet Page</h2>
      <p>Which Planet do you want to View?</p>
      <form class='search-planet-form'>
        <div>
          <label for="planet-input">Search Planet</label>
          <input class="css-input-forms" type="text" id="planet-input" name="planet" required>
          <button class="css-search-buttons" type="submit">Search</button>
        </div>
      </form>
      <p>Possible search options: Mercury, Venus, Neptune, Pluto, planet</p>
      <button class="homepage-btn css-homepage-btn" type="button">Start Over</button>  
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



// Return html for showWelcomePage()
function generateNewPageString(){
  return`
  <section role="region" class="welcome-page">
      <h2>Welcome to the Space View!</h2>
      <p>Choose to search for Planets, Stars, or Nebulae</p>
      <div class="search-options">
        <button class="planets-btn css-search-buttons" type="button">Planets</button>
        <button class="stars-btn css-search-buttons" type="button">Stars</button>
        <button class="nebulae-btn css-search-buttons" type="button">Nebulas</button>
      </div>
      <!--Sample image: Cassini Spacecraft around Saturn-->
      <div class="imageContainer">
        <img src="https://images-assets.nasa.gov/image/PIA22766/PIA22766~thumb.jpg" class="responsive-image home-image" alt="This illustration shows NASA's 
        Cassini spacecraft in orbit around Saturn. Cassini made 22 orbits that swooped between the rings and the planet before ending its mission 
        on Sept. 15, 2017, with a final plunge into Saturn.">
        <p>"Cassini spacecraft in orbit around Saturn"</p>
      </div>       
  </section>
  `
}

// Dynamically load the html of the welcome page when the page loads.
function showWelcomePage(){
  const newPage = generateNewPageString();
  $('.contentContainer').html(newPage);
}

function handleForm() {
   
  showWelcomePage();

  // Listen for the form submit on '.search-planet-form' and pass to Nasa API query.
  $('.contentContainer').on('submit', '.search-planet-form', event => {
    event.preventDefault();
    const query = $('#planet-input').val();
    console.log(query);
    getDataFromApi(query, 'planet', displayNasaSearchData);
  })

  // Listen for the form submit on '.search-star-form' and pass to Nasa API query.
  $('.contentContainer').on('submit', '.search-star-form', event => {
    event.preventDefault();
    const query = $('#star-input').val();
    console.log(query);
    getDataFromApi(query, 'star', displayStarSearchData);
  })

  // Listen for the form submit on '.search-nebulae-form' and pass to Nasa API query.
  $('.contentContainer').on('submit', '.search-nebulae-form', event => {
    event.preventDefault();
    const query = $('#nebula-input').val();
    console.log(query);
    getDataFromApi(query, 'nebulae', displayNebulaSearchData);
  })

  // Listen for clicks on the .contentContainer for clicks on the planet/stars/nebula search buttons.
  $('.contentContainer').on('click', '.planets-btn', event => {
    showPlanetsSearchPage();
  })

  $('.contentContainer').on('click', '.stars-btn', event => {
    showStarSearchPage();
  })

  $('.contentContainer').on('click', '.nebulae-btn', event => {
    showNebulasSearchPage();
  })

  $('.contentContainer').on('click', '.homepage-btn', event => {
    showWelcomePage();
  })

}

$(handleForm);


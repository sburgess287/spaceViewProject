'use strict';


// this function runs on click of the Nebulas button
function showNebulasSearchPage() {

}

// this function runs on click fo the stars button
function showStarSearchPage() {

}

// this function runs on click of the planet button
function showPlanetsSearchPage() {

}



// Function that returns the html to load on the welcome page

// Dynamically load the html of the welcome page when the page loads
function showWelcomePage(){
  console.log('showWelcomePage ran');
}





function handleForm() {
    console.log('handleForm ran');
    // Show welcome page
    showWelcomePage();

    // On click of planets button, load the search planet page

    // On click of stars button, load the stars page

    // On click of the Nebulas button, load the nebulas page

    // Listen for the form submit on each page
    // Pass the value of the form to nasa api query
    // Display results (this may be part of the function above to pass the value of form to nasa api)

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

}

$(handleForm);

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


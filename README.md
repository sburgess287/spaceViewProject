# SpaceView Project

The Space View Project encourages us to explore the universe by searching for Planets,
Stars, and Nebulae. Powered by the NASA API, beautiful images and descriptions return. 
If no results are found, helpful hints appear which show explorers possible searches
to try.

## Link to the SpaceView Project
https://sburgess287.github.io/spaceViewProject/

### Motivation
There are really amazing documents available on the NASA website. I hope to make
searches for space artifacts more accessible to users of all ages. I want to 
inspire wonder for the universe by showing these incredible images on any size 
device.

### Technology
- HTML
- CSS
- JavaScript
- jQuery

### API
images.nasa.gov API
https://api.nasa.gov/api.html#Images

### Summary
On first view, the SpaceView Project shows options to search by Planet, Star, or Nebulae.
She is able to click on any of those choice, and is brought to a screen with help
text of options to search. She types in an item inside that category, and clicks Search.
If the name matches the title or description of an image in the NASA Image and Video 
Library, then up to five results will show on her screen. She can search on desktop, 
mobile, or tablet devices. If no results are found, she is shown that information on 
a page, along with new helper text. She may choose to search again, start over, or 
search in another category. Any results images are clickable to link out to the NASA
site for a larger size information, along with the link underneath.

### Screenshots

Placeholder

### Further Information on Accessibility
- The background for the SpaceView Project on desktop and tablet size viewports is a 
gradient set in the css. The range of color in the gradient is from #E1E6E3 to #A4EEE9.
I verified the contrast ratio is over 12:1 for both, compared to the text color used
in the app. When running AXE to verify accessibility on Chrome, there was an error
returned that it could not verify contrast because a gradient is being used. 

### Next Steps
- Add a logo! I'd like to add a spiral similar to the favicon to the end of the text. I 
like the current font, and a vector image will make it pop.
- Update the JavaScript to consolidate repeating (ie: page html) code into
separate functions.
- Add more search options; Space Stations, Telescopes, Missions, Moons, Space Probes, 
Asteroids.

### Credits
Thank you to Marc, Joe, Katie, and Skandar for awesome feedback while I was building
out the app. 



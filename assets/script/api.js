//------Presentation Resources (if API fail)--------
// var backupUtellyResponse = { 
//   "results":[
//     0: {
//     "locations":[
//     0: {
//     "display_name":"Netflix"
//     }
//     1: {
//       "display_name":"Amazon Prime"
//     }
//     2: {
//       "display_name":"Google Play"
//     }
//     3: {
//       "display_name":"iTunes"
//     }
//     ]
// }]
// }
//---------------------------------------------------
//create function to run ajax request
function streamingLocation(input) {
  //create variable to hold queryURL for utelly api
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" + input + "&country=uk",
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
      "x-rapidapi-key": "bd1d73db3cmshe29def704ad7f7cp14f31cjsnd1be6b807fca"
    }
  }
  //funtion() to run call for JSON objects (streaming service availability)
  $.ajax(settings).then(function (response) {
    //DOM tree properties stored in variable for semantic
    var movie = response.results[0];
    //var movie = backupResponse.results[0];
    console.log(response);
    movieInfo(input);
    for (var i = 0; i < movie.locations.length; i++) {
      //create nested for loop to iterate through locations for other display_names
      var streamingService = movie.locations[i].display_name;
      //create variable to store info from JSON object to append property values to DOM
      var streamInfo = $("<p>").text(streamingService);
      //append properties to DOM
      $("#information-display").append(streamInfo);
      if (streamingService === "Amazon Prime Video") {
        $("#information-display").append($("<img>").attr("src", "data:image/png;base64,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"))
        .attr("alt", "Amazon Prime Video icon").append($("<a>").attr("href", "https://www.amazon.com/s?k=" + input + "&i=instant-video&ref=nb_sb_noss_2").text("Watch Here"));
      } else if (streamingService === "Amazon Instant Video") {
        $("#information-display").append($("<img>").attr("src", "data:image/png;base64,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"))
        .attr("alt", "Amazon Prime Video icon").append($("<a>").attr("href", "https://www.amazon.com/s?k=" + input + "&i=instant-video&ref=nb_sb_noss_2").text("Watch Here"));
      } else if (streamingService === "Netflix") {
        $("#information-display").append($("<img>").attr("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAEkklEQVR4AcXZA7jkWAKA0XNvUm7b7rVt27Zt2979sLZt27Ztu83nSnKXM9PuepXqN6cq+PzHMiLbcGM8HC/E2/EOvBiPxs1wPvUJhndD3BjXwHaD+QO+jI/hA3MVfE88FBdWz+/wErz0TAXfDM/B+Y3WH/BUvG2UwS/Bg51Zb8Z9MV0neAU+g4uaG3/EdfHbYYI34LtYYW5N4TL4KYMHL8FvsNS5Yxrb8DfHiE7s66eLfdjChl9t6vjK2ravrGv74fq2z61paQeOdIdew4dWdrxiafu/w3tXtD10QdNptPAdNBwjx7FeMchJfl6IztvJnLdRAdCIbnmo9PaxAsD6PLp8K/P7rALrsmBHaRCr8W7c4lTB18b9DeAv/eTgVJLFZKwiYXVMbjkvc2TwWJXsKJM9ZQINHKySAd0cd8LbTrZLvNWAInYVCUDAeFG5RjezJAYj9BqEEwXfHisNqBfZU3CgJA/AoYqFjeCmvcwIdfDIEwU/j8G1AmMluwq6kQSQuPFog+EpaEAEXAsbzFIe+VufKhEQcKioXK+XWZ9HEIzEfNwaIuB2ZqnEwsiOPjsLWgEYS3QawR3nZaCSjMjtIAKuawjtyFTi7/1zdosIZXKjXgbGKqNyDTQiNmGdWUpI6EX+NsNMIgD2F8nlOtGCyB/7SZkIauvhYhEXMaQqsSRjd8GuPp0ITCLLg5v0Mv8sKBIxoL6LRGwzpIROZCrx22m6gYSIfpHceX5uax7tKJNoJDZHbKkTHLAw4/czTFRkgP1lcuVOdO1u5tczSUBQ24qIJWqosDxnb8lf+vQiUKIduXib/QXFiPbjqKYq0Yn0E3+eoRupEHC4YkOTdmSsIgZ1hYgDakiIWJnziykOlbQCMFmxpsGKnJ19otomIv5YNzhhSzP4ymTp0xOlJVmQUCEPnLfFeEVCCOrYFfE7NSUsjuxJyVsPlUIEAsYqtrWYl3G4IqrlTxE/U1NKZIHNefDZydLBmWR+AGYSS3NW5uwtyNTy04jfYocaKkRsaATTic9NVublQQIErG8wXZEMbQo/iIDPqSmgG4EPjxfEAGC8Yn2TbvzffDCUL2M6At6tPlECHx2vHJqpLIjH7BYNDpRkhvJeiICPYZcROVAl7xkr9fIgIaBMbGoAyazN4J0QAfBktQUAHxgrSUTAZMXKBgszJpLZeh4mIALgNdhvRD43UfrLdLI4AwrMz1ieM1EZHAWeAxAdiXsakT4+NVFqZlGFgCKxIjNbD8E0QO5IfBDvwu2cRicEK7Kgn2gENufRyqxypHceLtxnedOaViQlEprBxtygvohXwsmC4U64Klaf+sCqfH+69JOZ5ECVVIkfzZSO9KWpyuP/MWVtI2pgSQwu1olCTAYwhpsN+jJwE36FlpPIURhOKzCdnM6F8bNBg+HC+CZ65t5V8FUYPBjYjC9hg7mxD9fCD2GYYOjidbi9M+tjuAd2Q51ggHvhmVg1+rXq2XiBAQSz08ZD8bD64Q7gJXgBDhpQMJwWboub4KpYZjD78TV8FO/GIXNPG5fB3fEMvPKIT7evwrNxL1wBPTX9C31ZioXqdiXTAAAAAElFTkSuQmCC"))
        .attr("alt", "Netflix icon").append($("<a>").attr("href", "https://www.netflix.com/").text("Watch Here"));
      } else if (streamingService === "Google Play") {
        $("#information-display").append($("<img>").attr("src", "data:image/png;base64,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"))
        .attr("alt", "Google Play icon").append($("<a>").attr("href", "https://play.google.com/store/search?q=" + input + "&hl=en_US").text("Watch Here"));
      } else if (streamingService === "iTunes") {
        $("#information-display").append($("<img>").attr("src", "data:image/png;base64,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"))
        .attr("alt", "iTunes icon").append($("<a>").attr("href", "https://itunes.apple.com/us/movie").text("Watch Here"));
      }
    };
  });
};
//create OMDB ajax request
//----------Presentation Resource (if API fail)-----------
// var backupOmdbResponse = {
//   "Poster":"This is a Poster image",
//   "imdbRating":"9/10",
//   "Released":"June 13, 1993",
//   "Title":"This is the Movie you searched"
// };
//----------------------------------------------------------
function movieInfo(input) {
  var queryURL = "https://www.omdbapi.com/?t=" + input + "&apikey=trilogy";
  // Creates AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    $("#poster-image").append($("<img>").attr("src", response.Poster).attr("alt", "movie search poster image").addClass(".poster-button"));
    // Find the object property for the movie imdb rating
    // create html element  
    // display the property
    $("#information-display").append($("<h6>").text("IMdB Rating: " + response.imdbRating));
    // Find the object property for the movie release date
    // create html element  
    // display the property
    $("#information-display").append($("<h6>").text("Release Date: " + response.Released));
    // Find the object property for the movie plot
    // create html element        
    // display the property
    $("#information-display").prepend($("<h4>").text("Title: " + response.Title));
    $("#poster-image").on("click", function () {
      $(".dropdown-pane").text(response.Plot)
    })
  });
}
var searchResults = [];
var counter = 0;

// Animate search glass into search bar
$("#searchGlass").on("click", function(event) {
  //event.preventDefault();
  $("#searchGlass").addClass("animated zoomOut");
  setTimeout(function(){
    $("#searchGlass").remove();
    $("#searchForm").css("display", "block").addClass("animated fadeIn");
  }, 250);
  $("#wikiSearch").attr("autofocus", true);
});

// Search Wikipedia API and publish results
$("#searchForm").submit( function(event) {
   event.preventDefault();
    var searchRequest = $("#wikiSearch").val();
    //console.log(searchRequest);
    $.ajax({
      url: 'https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=extracts%7Cpageimages&generator=search&exchars=250&exlimit=10&exintro=1&explaintext=1&pithumbsize=100&gsrsearch=' + encodeURIComponent(searchRequest),
      dataType: 'json',
      type: 'GET',
      headers: {'Api-User-Agent': 'Wikipedia Viewer/1.0 (https://codepen.io/kevolong/pen/RyVwrX; kevolong@gmail.com)'},
      success: (function(data) {
        var html = "";
        searchResults = Object.entries(data.query.pages);
        console.log(searchResults);
        
        //Update HTML for each result
        searchResults.forEach(function(entry) {
          // Card div for entry and made a lnk
          html += "<div class = 'card mx-2 my-2' style='width: 21rem;'><a class = 'cardlink'href ='https://en.wikipedia.org/?curid=" + entry[1].pageid + "'target =_blank >";
          // Title
          html += "<h5 class ='card-header'>" + entry[1].title + "</h5>";
          //Body
          html += "<div class = 'card-body'><p class = 'card-text'>" + entry[1].extract + "</p></div></a></div>";
        //}
        }) // End of forEach
        
        // Move interface to top and animate
        if (counter == 0) {
          $("#interface").removeClass("centered").addClass("animated slide-out-up mt-3");
          $("#byKevin").removeClass("by-kevin-initial");
          setTimeout(function(){
            
            $("#breakline").html("<hr style = 'width: 13rem;''>").addClass("fadeIn");
          }, 200);
        }
        
        // Update results HTML and aniamte
        if (counter == 0) {
          $("#results").html(html).addClass("animated zoomInUp");
          setTimeout(function(){
            $("#results").html(html).removeClass("animated zoomInUp");
            $("#byKevin").addClass("by-kevin-results");
          }, 1500);
        } else {
            $("#results").html(html).addClass("animated fadeIn");
            setTimeout(function(){
              $("#results").html(html).removeClass("animated fadeIn");
            }, 1500);
         // $("#byKevin").addClass("animated fadeIn");
        }
        counter++;
  }), // end of success
  }); // end of ajax
  }); // end of submit function

$(document).ready(function() {
  $("#searchGlass").attr("disabled", false)
  
});
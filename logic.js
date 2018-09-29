var topics = ["Chuck Schuldiner", "Dimebag Darrel", "Cliff Burton", "Chris Cornell", "Chester Bennington"];

var personImage = "";


$(".artist").on("click", giffyCreator);


function renderButtons() {
	$(".btn-toolbar").empty();

	for (var i = 0; i < topics.length; i++) {
		var a = $("<button>");
		a.addClass("artist btn btn-secondary");
		a.attr("id", topics[i]);

		a.text(topics[i]);

		$(".btn-toolbar").append(a);
	}
}



$("#add-artist").on("click", function (event) {
    event.preventDefault();
    $("#message").empty();
	var artist = $("#artist-input").val().trim();
    
    if (topics.indexOf(artist)=== -1){

        topics.push(artist); 
        renderButtons();   
    }else{
        $("#message").append("<h5>" + artist + " button already exists</h5>")
    };
    
    $(".artist").on("click", giffyCreator);

});

function giffyCreator() {

    $("#gifs-appear-here").empty();
    var person = $(this).attr("id");

    var APIKey = "&api_key=dc6zaTOxFJmzC&limit=10";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&" + APIKey;

        console.log(person);


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL);
        // console.log(response);
        var results = response.data;
        for (var i = 0; i < 10; i++) {

            var personDiv = $("<span style='float: left'>");

            var rating = $("<h6>").text("Rating: " + results[i].rating);

            personImage = $("<img>");
            personImage.addClass("images")
            personImage.attr("src", results[i].images.fixed_height_still.url);
            personImage.attr("data-animate", results[i].images.fixed_height.url);
            personImage.attr("data-still", results[i].images.fixed_height_still.url);
            personImage.attr("data-state", 'still');

            personDiv.append(rating);
            personDiv.append(personImage);

            // $("#gifs-appear-here").append(rating);
            // $("#gifs-appear-here").append(personImage);
            $("#gifs-appear-here").append(personDiv);

        }

        $(".images").on("click", function() {

            var state = $(this).attr("data-state");
            console.log(state);
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }           
        });
    });
};




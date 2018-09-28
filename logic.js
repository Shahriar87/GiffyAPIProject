var topics = ["Chuck Schuldiner", "Dimebag Darrel", "Cliff Burton", "Chris Cornell", "Chester Bennington"];

$(".artist").on("click", giffyCreator);


function renderButtons() {
	$("#button-view").empty();
	$(".button").empty();

	for (var i = 0; i < topics.length; i++) {
		var a = $("<button>");
		a.addClass("artist");

		a.attr("id", topics[i]);

		a.text(topics[i]);

		$(".button").append(a);
	}
}
$("#add-singer").on("click", function (event) {
	event.preventDefault();
	var artist = $("#singer-input").val().trim();
	topics.push(artist);
	renderButtons();

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
        console.log(response);
        var results = response.data;
        for (var i = 0; i < 10; i++) {

            var personDiv = $("<span>");

            var p = $("<p>").text("Rating: " + results[i].rating);

            var personImage = $("<img>");
            personImage.attr("src", results[i].images.fixed_height.url);

            personDiv.append(p);
            personDiv.append(personImage);

            $("#gifs-appear-here").prepend(personDiv);
        }
    });
};
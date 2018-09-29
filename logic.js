var topics = ["Chuck Schuldiner", "Dimebag Darrel", "Cliff Burton", "Chris Cornell", "Chester Bennington"];
var favorites = [];
var personImage = "";

$(".artist").on("click", giffyCreator);

// Render buttons

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

// Adding new buttons. Show message if duplicate button is pressed

$("#add-artist").on("click", function (event) {
    event.preventDefault();
    $("#message").empty();
    var artist = $("#artist-input").val().trim();

    if (artist != ""){

        if (topics.indexOf(artist) === -1) {

            topics.push(artist);
            renderButtons();
        } else {
            $("#message").append("<h5>" + artist + " button already exists</h5>")
        };

        $(".artist").on("click", giffyCreator);
    }

});

var person = "";


// Appending Gif images

function giffyCreator() {

    $("#gifs-appear-here").empty();

    person = $(this).attr("id");

    var APIKey = "&api_key=dc6zaTOxFJmzC&limit=10";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&" + APIKey;
    // console.log(person);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL);
        // console.log(response);
        var results = response.data;

        $("#gifs-appear-here").empty();

        for (var i = 0; i < 10; i++) {

            var personDiv = $("<span style='float: left; margin: 10px'>");

            var rating = $("<h6>").text("Rating: " + results[i].rating);

            personImage = $("<img>");
            personImage.addClass("images")
            personImage.attr("src", results[i].images.fixed_height_still.url);
            personImage.attr("data-animate", results[i].images.fixed_height.url);
            personImage.attr("data-still", results[i].images.fixed_height_still.url);
            personImage.attr("data-state", 'still');

            personDiv.append(rating);
            personDiv.append(personImage);

            $("#gifs-appear-here").append(personDiv);
        }

        // Animate & be Static on click 

        $(".images").on("click", function () {

            var state = $(this).attr("data-state");
            // console.log(state);
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

// Adding Favourites button

var counter = 0;

$("#favoritesBtn").on("click", function (e) {

    event.preventDefault();

    if (favorites.indexOf(person) === -1 && favorites.length < 3) {
        favorites.push(person);

        appendFav()
        counter++;
    }

    $(".artistTwo").on("click", giffyCreator);

});


// Adding to Local storage. But for some-reason its not loading the saved data after webpage refresh

function appendFav() {

    localStorage.setItem("favorites", JSON.stringify(favorites));

    var person2 = JSON.parse(localStorage.getItem("favorites")).slice(counter).join('');

    $("#favorites").append("<li class='list-group-item'><button id='" + person2 + "'class='artistTwo btn btn-secondary'>" + person2 + "</button></li>")

};


// Reload only 3 latest favorite buttons

$("#favorites").empty();

var refreshPerson1 = JSON.parse(localStorage.getItem("favorites"))[0];
var refreshPerson2 = JSON.parse(localStorage.getItem("favorites"))[1];
var refreshPerson3 = JSON.parse(localStorage.getItem("favorites"))[2];

console.log(refreshPerson1);

$("#favorites").append("<li class='list-group-item'><button id='" + refreshPerson1 + "'class='artistTwo btn btn-secondary'>" + refreshPerson1 + "</button></li>")
$("#favorites").append("<li class='list-group-item'><button id='" + refreshPerson2 + "'class='artistTwo btn btn-secondary'>" + refreshPerson2 + "</button></li>")
$("#favorites").append("<li class='list-group-item'><button id='" + refreshPerson3 + "'class='artistTwo btn btn-secondary'>" + refreshPerson3 + "</button></li>")

$(".artistTwo").on("click", giffyCreator);

//  To clear local storage

// localStorage.clear();






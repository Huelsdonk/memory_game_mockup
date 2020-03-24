$(document).ready(function () {
    // needed to initialize form select 
    $('select').formSelect();

    //====================== global variables ==========================================
    var topic = "";
    var difficulty = "";
    var timer = 0;
    var score = 0;

    //================== BELOW THIS IS BUTTON/GET INPUT VALUE EVENT LISTENERS ==================

    // loads end page, ask for user's name
    function loadEndPage() {
        $("#game").addClass("hide");
        $("#back").addClass("hide");
        $("#end").removeClass("hide");

        if (timer === 0) {
            $("#endMessage").text("Time is up!");
        }
        else {
            $("#endMessage").text("You won!");
        }
        $("#finalScore").text(score);

    }

    // start game timer
    function startGame() {
        // starts timer and displays time
        var timerInterval = setInterval(function () {
            timer--;
            $("#timer").text(timer);

            if ($("#game").hasClass("hide")) {
                clearInterval(timerInterval);
                console.log("done");
            }

            if (timer === 0) {
                clearInterval(timerInterval);
                loadEndPage();
            }

        }, 1000);

        // TODO: update score (global var)
        // TODO: clear interval/stop timer when user finds all matches first
    }

    function setTimerLength() {
        difficulty = $("#difficulty").val();

        if (difficulty === "moderate") {
            timer = 180;
        }
        else if (difficulty === "hard") {
            timer = 200;
        }
        else {
            timer = 120;
        }
    }

    function loadGamePage() {
        $("#landing").addClass("hide");
        $("#hof").addClass("hide");
        $("nav").removeClass("hide");
        $("#back").removeClass("hide");
        $("#game").removeClass("hide");

        setTimerLength();
        $("#timer").text(timer);
        // TODO: create cards with API
        // size based on difficulty (global var)


        // if not topic chosen, val will be null - pick random topic
        var topic = $("#topic").val();



        // countdown before game begins (overlay)
        var secondsLeft = 3;
        var timerInterval = setInterval(function () {
            $("#countdown").text(secondsLeft);
            if (secondsLeft === 0) {
                clearInterval(timerInterval);
                $("#overlay").addClass("hide");
                startGame();
            }
            secondsLeft--;
        }, 1000);

       
    }
    makeGameBoard();
    // TODO: populate rows in leaderboard if difficulty global var
    // empty, display leaderboard for easy level (default option on view from landing)
    // otherwise display based on difficulty level saved (after user submits name)
    // MVP: just get leaderboard working
    function loadLeaderboard() {

    }


    function reset() {
        score = 0;
        timer = 0;
        topic = "";
        difficulty = "";
        $("#overlay").removeClass("hide");
        $("#topic").prop("selectedIndex", 0);
        $("#difficulty").prop('selectedIndex', 0);
        $('select').formSelect();
    }

    function loadLanding() {
        reset();
        $("#leaderboard").addClass("hide");
        $("nav").addClass("hide");
        $("#back").addClass("hide");
        $("#hof").removeClass("hide");
        $("#landing").removeClass("hide");
    }

    // event listeners
    $("#start").click(loadGamePage);
    $("#home").click(loadLanding);
    $("#back").click(function () {
        $("#game").addClass("hide");
        loadLanding();
    });
    // TODO: add user score to leaderboard
    $("#submit").click(function () {
        // gets user input for name
        var user = $("#name").val();


        $("#end").addClass("hide");
        $("#leaderboard").removeClass("hide");
        $("#lbOptionsRow").addClass("hide");
        loadLeaderboard();
    });
    $("#hof").click(function () {
        $("#landing").addClass("hide");
        $("#leaderboard").removeClass("hide");
        $("#lbOptionsRow").removeClass("hide");
        loadLeaderboard();
    });




    //================================== BELOW THIS IS API CALLS =========================================
    $(".card").flip();

    // getPexelsDog();
    // getCat();
    getLandscape();
    var photoArray = [];

    var imgTag = $("img");


    function makeGameBoard() {
        var newRow = $("<div class='row cardRow'>");
        var newRow2 = $("<div class='row cardRow'>");
        var newRow3 = $("<div class='row cardRow'>");
        for (let i = 0; i < 4; i++) {
            var newCol = $("<div class='col s3'>");
            var newCard = $("<div class='card'>");
            var newFront = $("<div class='front'>");
            var newFrontP = $("<p>");
            newFrontP.text("I'm a Placeholder")
            var newBack = $("<div class='back card-image'>");
            var newImg = $("<img src='http://placekitten.com/200/200'>");
            newBack.append(newImg);
            newFront.append(newFrontP);
            newCard.append(newFront, newBack);
            newCol.append(newCard);
            newRow.append(newCol);
        }
        $("#game").append(newRow)
        for (let i = 0; i < 4; i++) {
            var newCol = $("<div class='col s3'>");
            var newCard = $("<div class='card'>");
            var newFront = $("<div class='front'>");
            var newFrontP = $("<p>");
            newFrontP.text("I'm a Placeholder")
            var newBack = $("<div class='back card-image'>");
            var newImg = $("<img src='http://placekitten.com/200/200'>");
            newBack.append(newImg);
            newFront.append(newFrontP);
            newCard.append(newFront, newBack);
            newCol.append(newCard);
            newRow2.append(newCol);
        }
        $("#game").append(newRow2)

        for (let i = 0; i < 4; i++) {
            var newCol = $("<div class='col s3'>");
            var newCard = $("<div class='card'>");
            var newFront = $("<div class='front card-content'>");
            var newFrontP = $("<p>");
            newFrontP.text("I'm a Placeholder")
            var newBack = $("<div class='back card-image'>");
            var newImg = $("<img src='http://placekitten.com/200/200'>");
            newBack.append(newImg);
            newFront.append(newFrontP);
            newCard.append(newFront, newBack);
            newCol.append(newCard);
            newRow3.append(newCol);
        }
        $("#game").append(newRow3);

    }


    function setPhotos(array, element) {
        $(element).each(function (index) {
            $(this).attr({ "src": array[index], "data-": index })
        })
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > -1; i--) {
            const j = Math.floor(Math.random() * i)
            const temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
    }

    function getCat() {
        catUrl = "https://api.thecatapi.com/v1/images/search?limit=6&apikey=5767aba7-30b0-4677-a169-9bd06be152b8";



        $.ajax({
            url: catUrl,
            method: "GET"
        }).then(function (response) {
            $(imgTag).each(function (index) {

                if (index < 2) {
                    photoArray.push(response[0].url);
                } else if (index >= 2 && index < 4) {
                    photoArray.push(response[1].url)
                } else if (index >= 4 && index < 6) {
                    photoArray.push(response[2].url)
                } else if (index >= 6 && index < 8) {
                    photoArray.push(response[3].url)
                } else if (index >= 8 && index < 10) {
                    photoArray.push(response[4].url)
                } else if (index >= 10 && index < 12) {
                    photoArray.push(response[5].url)
                }

            })

            shuffleArray(photoArray);
            setPhotos(photoArray, imgTag);
        })




    }



    function getPexelsDog() {
        var rand = Math.floor(Math.random() * 200 + 1);
        pexelsUrl = "https://api.pexels.com/v1/search?query=dogs&page=" + rand;

        $.ajax({
            url: pexelsUrl,
            headers: { "Authorization": "563492ad6f9170000100000189da3e3e71c041369167af3e07e5a355" },
            method: "GET",
            type: "text/json"
        }).then(function (response) {
            $(imgTag).each(function (index) {

                if (index < 2) {
                    photoArray.push(response.photos[0].src.original);
                } else if (index >= 2 && index < 4) {
                    photoArray.push(response.photos[1].src.original)
                } else if (index >= 4 && index < 6) {
                    photoArray.push(response.photos[2].src.original)
                } else if (index >= 6 && index < 8) {
                    photoArray.push(response.photos[3].src.original)
                } else if (index >= 8 && index < 10) {
                    photoArray.push(response.photos[4].src.original)
                } else if (index >= 10 && index < 12) {
                    photoArray.push(response.photos[5].src.original)
                }

            })

            shuffleArray(photoArray);
            setPhotos(photoArray, imgTag);

        });

    }

    function getLandscape() {
        var rand = Math.floor(Math.random() * 200 + 1);
        pexelsUrl = "https://api.pexels.com/v1/search?query=landscape&page=" + rand;

        $.ajax({
            url: pexelsUrl,
            headers: { "Authorization": "563492ad6f9170000100000189da3e3e71c041369167af3e07e5a355" },
            method: "GET",
            type: "text/json"
        }).then(function (response) {
            $(imgTag).each(function (index) {

                if (index < 2) {
                    photoArray.push(response.photos[0].src.original);
                } else if (index >= 2 && index < 4) {
                    photoArray.push(response.photos[1].src.original)
                } else if (index >= 4 && index < 6) {
                    photoArray.push(response.photos[2].src.original)
                } else if (index >= 6 && index < 8) {
                    photoArray.push(response.photos[3].src.original)
                } else if (index >= 8 && index < 10) {
                    photoArray.push(response.photos[4].src.original)
                } else if (index >= 10 && index < 12) {
                    photoArray.push(response.photos[5].src.original)
                }

            })

            shuffleArray(photoArray);
            console.log(photoArray);
            setPhotos(photoArray, imgTag);

        });

    }

    // function getMovie() {
    //     var theMovie = "star wars";

    //     var queryUrl = "https://www.omdbapi.com/?t=" + theMovie + "&type=movie&apikey=trilogy";

    //     $.ajax({
    //         url: queryUrl,
    //         method: "GET"
    //     }).then(function (response) {
    //         console.log(response);
    //         console.log(response.Poster)
    //     })

    // }


    // function getNASA() {
    //     var randomYear = Math.floor(Math.random() * (2020 - 2015) + 2010);
    //     var randomMonth = Math.floor(Math.random() * (12 - 1) + 1);
    //     var randomDate = Math.floor(Math.random() * (28 - 1) + 1);
    //     var NASAUrl = `https://api.nasa.gov/planetary/apod?date=${randomYear}-${randomMonth}-${randomDate}&api_key=2YVxSEGEXJwH01Wb6QwvfeJyAWtXzKRNBVhIbVJb`


    //     $.ajax({
    //         url: NASAUrl,
    //         method: "GET"
    //     }).then(function (response) {
    //         console.log(response.url);
    //     })
    // }

})
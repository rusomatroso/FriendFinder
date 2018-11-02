let valDifference = [];
let compared = [];
var candidate;

var friendSearch = function () {
    var currentURL = window.location.origin;
    compared.length = 0;
    $.get(currentURL + "/api/friends", function (friends) {
        for (var i = 0; i < friends.length; i++) {
        }
        quantDifference(friends);
    });
};

var quantDifference = function (friends) {
    var userScores = friends[friends.length - 1];
    for (var i = 0; i < friends.length - 1; i++) {
        candidate = friends[i];
        var matchScore = function (friend) {
            for (var i = 0; i < userScores.scores.length; i++) {
                valDifference[i] = Math.abs(parseInt(userScores.scores[i]) - parseInt(friend.scores[i]));
            }
            var sum = valDifference.reduce(add, 0);

            function add(x, y) {
                return x + y;
            }

            compared.push(sum);
        };
        matchScore(candidate);
    }
    var minScore = Math.min(...compared);
    var matchName = friends[compared.indexOf(minScore)].name;
    var matchPhoto = friends[compared.indexOf(minScore)].photo;
    $("#friendMatch").text(matchName);
    $("#friendPic").attr("src", matchPhoto);
};

$(".submit").on("click", function (event) {
    var currentURL = window.location.origin;
    event.preventDefault();

    var newCandidate = {
        name: $("#name").val().trim(),
        photo: $("#photo").val().trim(),
        scores: [$("#q1").val().trim(),
            $("#q2").val().trim(),
            $("#q3").val().trim(),
            $("#q4").val().trim(),
            $("#q5").val().trim(),
            $("#q6").val().trim(),
            $("#q7").val().trim(),
            $("#q8").val().trim(),
            $("#q9").val().trim(),
            $("#q10").val().trim()
        ]
    };
    $.post(currentURL + "/api/friends", newCandidate,
        function (data) {
            if (data) {
                friendSearch();
            }
            else {
                console.log(error);
            }
            $("#name").val("");
            $("#photo").val("");
            $("#q1").val("");
            $("#q2").val("");
            $("#q3").val("");
            $("#q4").val("");
            $("#q5").val("");
            $("#q6").val("");
            $("#q7").val("");
            $("#q8").val("");
            $("#q9").val("");
            $("#q10").val("");
        }
    );
});
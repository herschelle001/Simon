var a = [];
var b = [];
var curr = 0;
var color = ["green_poop", "red_poop", "yellow_poop", "blue_poop"];
var start = false;
let flash = 0;
var on = false;
//document.getElementById("level_button1").style.display="none"
var id = null;
var elem = document.getElementById("start_button");
const size_width = elem.style.width;
const size_height = elem.height;
var scale = 1;

setInterval(function () {
    scale = scale === 1 ? 1.1 : 1
    $('#start_button').css('transform', 'scale(' + scale + ')');
}, 1000)

$("#start_button").click(function () {
    start = true;
    a = [];
    b = [];
    on = false;
    level();
    document.getElementById("start_button").style.display = "none";
    $("#level_button").removeClass("hide_level_button");
});

$(".blocks").click(function () {
    if (on) {
        if (start) {
            b.push($(this).attr("id"));
            if (a[b.length - 1] === $(this).attr("id")) {
                var p = this;
                var i = $(this).attr("id");
                var image = $("#" + i)
                $(this).addClass("pressed_" + i);
                setTimeout(function () {
                    $(p).removeClass("pressed_" + i);
                }, 100);
                audio = new Audio('Sound/' + $(this).attr("id") + '.wav');
                audio.play();
                if (a.length === b.length) {
                    setTimeout(function () {
                        on = false;
                        level();
                    }, 100);
                    b = [];
                }
            } else {
                $("body").addClass("game-over");
                setTimeout(function () {
                    $("body").removeClass("game-over");
                }, 100);
                $("h1").text("Game-over press Reset button to restart the game");
                var audio = new Audio('Sound/wrong.wav');
                audio.play();
                on = false;
                flash = 0;
                start = false;
                a = [];
                b = [];
            }
        }
    }

});

function level() {
    flash = 0;
    $("#level_button").text("Level " + (a.length + 1));
    sound();
}

function sound() {
    var x = Math.random();
    x = Math.floor(x * 4);
    a.push(color[x]);
    interval = setInterval(lightOn, 1000);
}

function lightOn() {
    if (flash < a.length) {
        setTimeout(() => {
            $("#" + a[flash]).fadeOut(100).fadeIn(100);
            var audio = new Audio('Sound/' + a[flash] + '.wav');
            audio.play();
            flash++;
        }, 200);
    } else if (flash === a.length) {
        clearInterval(interval)
        on = true;
        console.log(on);
    }
}
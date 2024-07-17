$(function() {
    var playing = false;
    var score;
    var trialsLeft;
    var step;
    var step2;
    var action; 
    var action2; 
    var fruits = ['apple', 'banana', 'cherry', 'grapes', 'mango', 'orange', 'lemon', 'guava', 'watermelon', 'pears', 'pineapple', 'strawberry'];

    $("#startbut").click(function() {
        if (playing) {
            location.reload();
        } else {
            playing = true;
            score = 0;
            $("#scorevalue").html(score);
            $("#trialsleft").show();
            trialsLeft = 3;
            addHearts();
            $("#gameover").hide();
            $("#startbut").html("Reset Game");
            startAction();
            startAction2();
        }
    });

    $("#fruit1").mouseover(function() {
        score++;
        $("#scorevalue").html(score);
        document.getElementById("slicesound").play(); 
        clearInterval(action); 
        $("#fruit1").hide("explode", { pieces: 3 }, 500); 
        setTimeout(startAction, 1000); 
    });

    $("#bombb").mouseover(function() {
        score--;
        $("#scorevalue").html(score); 
        document.getElementById("bombsound").play(); 
        clearInterval(action2); 
        $("#bombb").hide("explode", { pieces: 3 }, 500); 
        setTimeout(startAction2, 1000); 
    });

    function addHearts() {
        $("#trialsleft").empty();
        for (var i = 0; i < trialsLeft; i++) {
            $("#trialsleft").append('<img src="heart2-removebg-preview.png" class="life">');
        }
    }

    function startAction2() {
        if (Math.random() > 0.3) { 
            $("#bombb").show();
            step2 = 3 + Math.round(3 * Math.random());
            $("#bombb").css({ 'left': Math.round(1200 * Math.random()), 'top': -50 });
            action2 = setInterval(function() {
                $("#bombb").css('top', $("#bombb").position().top + step2);
                if ($("#bombb").position().top > $("#maincontainer2").height()) {
                    // $("#bombb").hide();
                    clearInterval(action2);
                    startAction2();
                }
            }, 22);
        }
    }

    function startAction() {
        $("#fruit1").show();
        chooseFruit();
        $("#fruit1").css({ 'left': Math.round(1200 * Math.random()), 'top': -50 });
        step = 4+ Math.round(5 * Math.random());
        action = setInterval(function() {
            $("#fruit1").css('top', $("#fruit1").position().top + step);
            if ($("#fruit1").position().top > $("#maincontainer2").height()) {
                if (trialsLeft > 1) {
                    trialsLeft--;
                    addHearts();
                    // $("#fruit1").hide();
                    clearInterval(action);
                    startAction();
                } else {
                    playing = false;
                    $("#startbut").html("Start Game");
                    $("#gameover").html('<p>Game Over!</p><p>Your score is ' + score + '</p>');
                    $("#gameover").show();
                    $("#trialsleft").hide();
                    stopAction();
                }
            }
        }, 20);
    }

    function chooseFruit() {
        $("#fruit1").attr('src', 'images/' + fruits[Math.floor(Math.random() * fruits.length)] + '.png');
    }

    function stopAction() {
        clearInterval(action);
        clearInterval(action2);
        $("#fruit1").hide();
        $("#bombb").hide();
    }
});

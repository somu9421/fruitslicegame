$(function() {
    var playing = false;
    var score;
    var trialsLeft;
    var step;
    var step2;
    var action; 
    var action2; 
    var fruits = ['apple', 'banana', 'cherry', 'grapes', 'mango', 'orange', 'lemon', 'guava', 'watermelon', 'pears', 'pineapple', 'strawberry'];




    const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = [
    "#ffb56b",
    "#fdaf69",
    "#f89d63",
    "#f59761",
    "#ef865e",
    "#ec805d",
    "#e36e5c",
    "#df685c",
    "#d5585c",
    "#d1525c",
    "#c5415d",
    "#c03b5d",
    "#b22c5e",
    "#ac265e",
    "#9c155f",
    "#950f5f",
    "#830060",
    "#7c0060",
    "#680060",
    "#60005f",
    "#48005f",
    "#3d005e"
];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function(e){
  coords.x = e.clientX;
  coords.y = e.clientY;
  
});

function animateCircles() {
  
  let x = coords.x;
  let y = coords.y;
  
  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";
    
    circle.style.scale = (circles.length - index) / circles.length;
    
    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 2] || circles[0];
    x += (nextCircle.x - x) * 0.2;
    y += (nextCircle.y - y) * 0.2;
  });
 
  requestAnimationFrame(animateCircles);
}

animateCircles();










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
        if (Math.random() > 0.1) {
            $("#bombb").show();
            step2 = 3 + Math.round(3 * Math.random()); 
            $("#bombb").css({ 'left': Math.round(1200 * Math.random()), 'top': -50 });
            action2 = setInterval(function() {
                $("#bombb").css('top', $("#bombb").position().top + step2);
                if ($("#bombb").position().top > $("#maincontainer2").height()) {
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
        step = 4 + Math.round(5 * Math.random()); 
        action = setInterval(function() {
            $("#fruit1").css('top', $("#fruit1").position().top + step);
            if ($("#fruit1").position().top > $("#maincontainer2").height()) {
                
                if (trialsLeft > 1) {
                    trialsLeft--;
                    addHearts();
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

   
    $(document).ready(function() {
        if (!$("#fruit1").length || !$("#bombb").length || !$("#trialsleft").length) {
            console.warn("Some elements are missing. Game cannot be played correctly.");
            playing = false;
            stopAction();
        }
    });
})();


var playing = false;
var score;
var trialsLeft;
var step;
var step2;
var action; //used for setInterval
var fruits = ['apple', 'banana', 'cherry', 'grapes', 'mango', 'orange', 'lemon', 'guava', 'watermelon','pears','pineapple','strawberry','bomb'];
var bomb = ['bomb'];
$(function(){
    
$("#startbut").click(function(){
   
if (playing==true){

location.reload();

}else{

playing = true;

score=0;
$("#scorevalue").html(score);

$("#trialsleft").show();
trialsleft=3;
addhearts();

$("#gameover").hide();

$("#startbut").html("reset game");

startAction();
startaction2();
}
});

    
//slice a fruit
    
$("#fruit1").mouseover(function(){
    score++;
    
    $("#scorevalue").html(score); //update score
   document.getElementById("slicesound").play();
    $("#slicesound")[0].play();//play sound
    
    //stop fruit
    clearInterval(action);
    
    //hide fruit
    $("#fruit1").hide("explode",{pieces : 3}, 500); //slice fruit
    
    //send new fruit
    
    setTimeout(startAction, 500);
});

$("#bombb").mouseover(function(){
    score--;
    //trialsLeft--;
    $("#scorevalue").html(score); //update score
   document.getElementById("bombsound").play();
    $("#bombsound")[0].play();//play sound
    
    //stop fruit
    clearInterval(action2);
    
    //hide fruit
    $("#bombb").hide("explode",{pieces : 3} ,500); //slice fruit
    
    //send new fruit
    setTimeout(startaction2, 1000);
});




function addhearts(){
    $("#trialsleft").empty();
    for(i=0;i<trialsleft;i++){
        $("#trialsleft").append('<img src="heart2-removebg-preview.png" class="life" >');
    }
}

function startaction2(){


$("#bombb").show();
step2 =  1+Math.round(1*Math.random());
$("#bombb").css({'left' : Math.round(1200*Math.random()),'top' : -50});

action2=setInterval(function(){

    $("#bombb").css('top', $("#bombb").position().top + step);  

    //if($("#bombb").position().top > $("#maincontainer2").height()){
        charm=Math.round(1000*Math.random());
        if(charm==2){
    if(trialsleft > 1){
     
        $("#bombb").show();
        $("#bombb").css({'left' : Math.round(1200*Math.random),'top' : -50});   

       // step2 = 2+ Math.round(2*Math.random);

     //   trialsleft --;
      // addhearts();
        startaction2(); 
    

    }
}
   }, 25);
}


function startAction(){

   $("#fruit1").show();
   choosefruit();
   $("#fruit1").css({'left' : Math.round(1200*Math.random()),'top' : -50});

   step =  3+Math.round(4*Math.random());

   action=setInterval(function(){

    $("#fruit1").css('top', $("#fruit1").position().top + step);  

    if($("#fruit1").position().top >= $("#maincontainer2").height()){

    if(trialsleft > 1){
     
        $("#fruit1").show();
        choosefruit();
        $("#fruit1").css({'left' : Math.round(1200*Math.random),'top' : -50});   

        //step = 5+ Math.round(3*Math.random);

        trialsleft --;

        addhearts();
        startAction();
    }else{
     playing = false;
     $("#startbut").html("Start Game"); // change button to Start Game
     $("#gameover").html('<p>Game Over!</p><p>Your score is '+ score +'</p>');
     $("#gameover").show();
     $("#trialsleft").hide();
     stopaction();
     action3=setInterval(function(){
        location.reload();
     },8000);
    }
    }
   }, 20);
}






function choosefruit(){
$("#fruit1").attr('src' , 'images/' + fruits[Math.round(11*Math.random())] +'.png');
}



function stopaction(){
  clearInterval(action);
  clearInterval(action2);
  $("#fruit1").hide();
  $("#bombb").hide();
}







});
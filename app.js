let gameSeq=[];
let userSeq= [];

let score=0;
let maxScore=0;

let btns=['yellow','red','purple','green']

let started=false;
let level=0;

let h2=document.querySelector('h2');

document.addEventListener('keypress',function(){
    if(started==false){
        console.log("game started");
        started=true;
        levelUp();
    }
})


function gameFlash(btn){
    btn.classList.add("flash");

    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn){
    btn.classList.add("userflash");

    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;

    //random btn choose and flash
    let randIdx=Math.floor(Math.random()*3);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);   
}

function checkAns(idx){
    // console.log("Current level: ",level);

    if (userSeq[idx]===gameSeq[idx]) {
        // console.log("Same Value");
        if (userSeq.length==gameSeq.length) {
            setTimeout(levelUp,1000);
        }
    }else{
        score=level;
        if(maxScore<score) maxScore=score;
        h2.innerHTML=`Game Over! Your score was <b>${score}</b>. <br>Press any key to restart. <br> Max High Score: ${maxScore}`
        document.querySelector('body').style.backgroundColor='red';
        setTimeout(()=>{
            document.querySelector('body').style.backgroundColor='white';
        },150);
        reset();
    }
}

function btnPress(){
    let btn=this;
    // console.log(btn);
    userFlash(btn);

    let userColor=btn.getAttribute('id');
    // console.log(userColor);
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll('.btn');
for(btn of allBtns){
    btn.addEventListener('click', btnPress);
}

function reset() {
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
    score=0;
}
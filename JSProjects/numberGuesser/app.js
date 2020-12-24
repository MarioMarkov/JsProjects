let min=1,
    max=10,
    winningnum =getwnningNum(min,max),
    geuessesLeft =3;





const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');
    
minNum.textContent = min;
maxNum.textContent = max;

guessBtn.addEventListener('click',function(){
    
    let input = parseInt(guessInput.value);
    console.log(input);
    console.log(winningnum);
    if(isNaN(input) ||input> max||input<min){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
        guessInput.value ='';
    }else{
        if(input === winningnum  ){
       
            gameOver(true,`That is right ${winningnum} is correct YOU WIN!!`)
            playAgain();
        }else{
            geuessesLeft--;
            if(geuessesLeft === 0){
                gameOver(false,`Game Over, you lost. The correct number was ${winningnum}`);
            playAgain();

            }else{
                guessInput.style.borderColor = 'red';
                guessInput.value ='';
                setMessage(`No , you have ${geuessesLeft} guesses left`,'orange');
            }
        }
    }
    
    
    
});


function playAgain(){
    guessBtn.value = 'Play Again';
    guessBtn.addEventListener('click',function(){
        location.reload();
    });
}

function setMessage(msg,color){
    message.textContent = msg;
    message.style.color = color;
}

function gameOver(won,msg){
    guessInput.disabled =true;
    let color = won? 'green':'red'
    guessInput.style.borderColor = color;
    setMessage(msg,color);
}

function getwnningNum(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}




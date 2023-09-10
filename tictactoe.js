//Initialize setup
let board = [0,0,0,0,0,0,0,0,0];
let next=1;
let gstate=0; // game in progress

// Helper to convert number to character
function i2c(i)
{
    return i==1 ? 'x' : i==-1 ? 'o' : 'b';
}

function resetBoard()
{
    board = [0,0,0,0,0,0,0,0,0];
    next=1;
    gstate=0; 
    updatePage();
}

// Update the page with present state of board
function updatePage()
{
    const e = document.getElementById("next");
    if(gstate==0){
        e.innerHTML = `<h1>Next move : <img src='assets/${i2c(next)}.png' height='100px' width='100px' /> </h1>`;
    }
    else if (gstate==1){
        e.innerHTML = `<h1>Yay! <img src='assets/x.png' height='100px' width='100px' /> Won!</h1>`;
        e.innerHTML += `<button onclick='resetBoard();'> Play Again? </button>`;
    }
    else if(gstate==-1){
        e.innerHTML=`<h1>Yay! <img src='assets/o.png' height='100px' width='100px'/> Won!</h1>`;
        e.innerHTML += `<button onclick='resetBoard();'> Play Again? </button>`;
    }
    else{
        e.innerHTML=`<h1>That was a boring Draw !!</h1>`;
        e.innerHTML += `<button onclick='resetBoard();'> Play Again? </button>`;
    }

    for(const i in board){
        const e= document.getElementById("td"+i);
        e.innerHTML = `<img src='assets/${i2c(board[i])}.png' height='100px' width='100px' onclick='updateEntry(${i});'/>`;
    }
}

// Check state of play and update messages
function checkState()
{
    let patts = [[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6],[0,3,6],[1,4,7],[2,5,8]];
    for (p of patts){
        const sum = p.reduce((a,i) => a+board[i],0);
        if (sum==3){
            return 1;   //X won
        }
        else if(sum==-3){
            return -1;  // O won
        }
    }
    for(i in board) {
        if(board[i] == 0) return 0; // game in progress
    }
    return 2;   //Draw
}

// Update entry oon click
function updateEntry(x)
{
    if(gstate == 0 && board[x] == 0) {
        board[x]=next;
        next=-next;
        gstate=checkState();
    }
    updatePage();
}

resetBoard();

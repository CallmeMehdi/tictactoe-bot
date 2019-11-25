const PLAYER= "X"
const COMPUTER= "O"
var board=[
    ["","",""],
    ["","",""],
    ["","",""]
]
function gameOver(grid){
    //horizental
    for (let i=0;i<3;i++){
        if (grid[i][0]!="" && grid[i][0]==grid[i][1] && grid[i][1] == grid[i][2])
        {
          return grid[i][0];
        }
    }
    //vertical
    for (let i=0;i<3;i++){
        if (grid[0][i]!="" && grid[0][i]==grid[1][i] && grid[1][i] == grid[2][i])
        {
          // alert(board[i][0], " Won !! ");
          return grid[0][i];
        }
    }
    //diagonal 1
    if(grid[0][0]!="" && grid[0][0] == grid[1][1] && grid[1][1]== grid[2][2])
    {
        // alert(board[0][0], " Won !! ");
        return grid[0][0];
    }
    //diagonal 2
    if(grid[0][2]!="" && grid[0][2] == grid[1][1]&& grid[1][1] == grid[2][0])
    {
        // alert(board[1][1], " Won !! ");
        return grid[1][1];
    }
    //game not over yet
    for(let i =0;i<3;i++){
        for(let j=0;j<3;j++){
            if(grid[i][j]=="")
            return false;
        }
    }
      return null;
}
function computerMove(){
    for(let i =0;i<3;i++){
        for(let j=0;j<3;j++){
            if(board[i][j]=="")
            return {
                i:i,
                j:j
            };
        }
    }
    return null
}

function minmax(newGrid,depth,player)
{
    result= gameOver(newGrid);
    // console.log(result)
    if(result == null)
    {
        // console.log("went through null")
        return 0
    }else if (result == false)
    {
        // console.log("it went through false")
        const values=[]
        for(let i=0;i<3;i++)
        {
            for(let j=0;j<3;j++)
            {
                const boardCopy = _.cloneDeep(newGrid);
                if(boardCopy[i][j]!="")
                {
                    continue;
                }
                // console.log(board)

                boardCopy[i][j]=player;
                //setting new player
                let newPlayer;
                if(player==PLAYER)
                {
                    newPlayer=COMPUTER
                }else{
                    newPlayer=PLAYER
                }
                const result_minmax= minmax(boardCopy,depth+1,newPlayer)
                values.push({
                    cost: result_minmax,
                    cell:{
                        i: i,
                        j: j
                    }
                })
            }
        }
        if(player == COMPUTER)
        {
            //max
            const max= _.maxBy(values, (v)=>{
                return v.cost;
            })
            if (depth==0)
            {
                return max.cell
            }else{
                return max.cost
            }
        }else
        {
            //min
            const min= _.minBy(values, (v)=>{
                return v.cost;
            })
            if (depth==0)
            {
                return min.cell
            }else{
                return min.cost
            }
        }
    }else if(result==COMPUTER){
        // console.log("computer ",10-depth)
        return 10-depth;
    }else if(result==PLAYER)
    {
        // console.log("player ",depth-10)
        return depth-10;
    }
}

function AIMove(){
    return minmax(board,0,COMPUTER)
}



$(document).ready(function(){
    $(".tab").click(function(){
        let i = $(this).data('i');
        let j = $(this).data('j');
        // stopping the player from clicking twice on the same spot
        if(board[i][j]!="")
        {
            return;
        }
        //setting the X where you clicked
        $(this).html(PLAYER)
        
        //updating board
        board[i][j] = PLAYER;
        // checking if game is over
        result = gameOver(board);

        if(result==null)
        {
            alert("TIE");
            return;
        }
        if (result)
        {
            //end game
            alert(result + " Won !! ")
            return;
        }else{
            //insert computer AI move here

            // old stupid AI code
            // move = computerMove();

            // AI code using minmax
            move = AIMove();
            // will bring back an object { i: i, j: j} of the perfect cell
            board[move.i][move.j]=COMPUTER;
            $(".tab[data-i="+move.i+"][data-j=" +move.j +"]").html(COMPUTER);
        }
        // checking if game ended AFTER the COMPUTER move
        result= gameOver(board)
        if (result)
        {
            //end game
            alert(result + " Won !!")
        }
        
    })
    // Reset everything
    $(".restart").click(function(){
        board=[
            ["","",""],
            ["","",""],
            ["","",""]
        ]
        $(".tab").html("");
    })
})


/**
 * selectionOwner
 * **************
 * SELECTION OWNER = 1 -> User
 * SELECTION OWNER = 2 -> Computer
 * SELECTION OWNER = 0 -> No one
 * 
 * 
 * attepmtowner
 * **************
 * ATTEMPT OWNER = 1 -> User
 * ATTEMPT OWNER = 2 -> Computer
 * 
 * stateOfGame
 * **************
 * 
 * STATE OF GAME = 0 -> No game started yet or game is over
 * STATE OF GAME = 1 -> Game is in progress
 * 
 * 
 * WIN POSSIBILITIES
 * *****************
 * 
 * 11 12 13
 * 21 22 23
 * 31 32 33
 * 
 * 11 22 33
 * 13 22 31
 * 
 * 11 21 31
 * 12 22 32
 * 13 23 33
 * 
 */

let position = [11, 12, 13, 21, 22, 23, 31, 32, 33];
let winPossibilities = [
    111213, 212223, 313233, 112233, 132231, 112131, 122232, 132333,
    121113, 222123, 323133, 221133, 221331, 211131, 221232, 231333,
    121311, 222321, 323331, 223311, 223113, 213111, 223212, 233313,

    312111, 322212, 332313, 332211, 132231, 131211, 232221, 333231,
    213111,

];
let positionArrayWinner = [
    {
        position: 0,
        friend1: 1,
        friend2: 2
    },
    {
        position: 0,
        friend1: 3,
        friend2: 6
    }, {
        position: 0,
        friend1: 4,
        friend2: 8
    },
    {
        position: 1,
        friend1: 4,
        friend2: 7
    }, {
        position: 1,
        friend1: 0,
        friend2: 2
    }, {
        position: 2,
        friend1: 0,
        friend2: 1
    }, {
        position: 2,
        friend1: 5,
        friend2: 8
    }, {
        position: 2,
        friend1: 4,
        friend2: 6
    }, {
        position: 3,
        friend1: 4,
        friend2: 5
    }, {
        position: 3,
        friend1: 0,
        friend2: 6
    }, {
        position: 4,
        friend1: 0,
        friend2: 8
    }, {
        position: 4,
        friend1: 2,
        friend2: 6
    }, {
        position: 4,
        friend1: 1,
        friend2: 7
    }, {
        position: 4,
        friend1: 3,
        friend2: 5
    }, {
        position: 5,
        friend1: 2,
        friend2: 8
    }, {
        position: 5,
        friend1: 3,
        friend2: 4
    }, {
        position: 6,
        friend1: 0,
        friend2: 3
    }, {
        position: 6,
        friend1: 7,
        friend2: 8
    }, {
        position: 6,
        friend1: 2,
        friend2: 4
    }, {
        position: 7,
        friend1: 1,
        friend2: 4
    }, {
        position: 7,
        friend1: 6,
        friend2: 8
    }, {
        position: 8,
        friend1: 0,
        friend2: 4
    }, {
        position: 8,
        friend1: 2,
        friend2: 5
    }, {
        position: 8,
        friend1: 6,
        friend2: 7
    }

];
//let winPossibilities = [312111, 322212, 332313, 332211, 132231, 131211, 232221, 333231];
let boxes = [];
let attemptOwner = 0;
let stateOfGame = 0;

function initGame() {

    boxes = [];

    if (stateOfGame == 0) {
        // document.querySelectorAll('.box').forEach(element => {
        //     element.innerHTML = '';
        // })
        document.getElementById('message').innerHTML = '<h1>JUGAR!!</h1>';
        position.forEach(element => {
            boxes.push(
                {
                    position: element,
                    selectionOwner: 0,
                }
            );
        });
        stateOfGame = 1;
        attemptOwner = 1;
        //console.log('A')
    }
}

function select(a) {
    if (stateOfGame == 1) {



        // 
        if (attemptOwner == 1) {
            let found = 0;
            boxes.forEach(element => {
                if (element.position == a && element.selectionOwner == 0) {
                    found = 1;
                    element.selectionOwner = 1;
                    document.getElementById(a).innerHTML = '<img src="fichanegra.png" width="50px" alt="cross">';
                }
            });
            if (found == 1) {

                switch (checkWin('user')) {
                    case 0:
                        stateOfGame = 0;
                        console.log('USER WINS');
                        document.getElementById('message').innerHTML = '<h1>YOU WIN</h1>';
                         document.querySelectorAll('.box').forEach(element => {
                             element.innerHTML  = '';
                         })
                        break;
                    case 1:
                        stateOfGame = 0;
                        console.log('IT IS A DRAW');
                        document.getElementById('message').innerHTML = '<h1>IT IS A DRAW</h1>';
                     document.querySelectorAll('.box').forEach(element => {
                         element.innerHTML  = '';
                     })

                    case 2:
                        attemptOwner = 2;
                        console.log(boxes);
                        console.log('Its computer turn');
                        
                        setTimeout(() => {
                            document.getElementById('message').innerHTML = '<h1>COMPUTER TURN</h1>';
                            selectRandomComputer();
                        }, 1000);
                        break;

                }


            } else {
                console.log('You have selected wrong box');
            }
        } else {



            let found = 0;
            boxes.forEach(element => {
                if (element.position == a && element.selectionOwner == 0) {
                    found = 1;
                    element.selectionOwner = 2;
                    document.getElementById(a).innerHTML = '<img src="ficharoja.png" width="50px" alt="circle">';

                }
            });
            if (found == 1) {


                switch (checkWin('computer')) {
                    case 0:
                        stateOfGame = 0;
                        console.log('COMPUTER WINS');
                        document.querySelectorAll('.box').forEach(element => {
                            element.innerHTML  = '';
                        })
                        document.getElementById('message').innerHTML = '<h1>COMPUTER WINS</h1>';

                        break;
                    case 1:
                        stateOfGame = 0;
                        console.log('IT IS A DRAW');
                        document.querySelectorAll('.box').forEach(element => {
                            element.innerHTML  = '';
                        })
                        document.getElementById('message').innerHTML = '<h1>IT IS A DRAW</h1>';


                    case 2:
                        attemptOwner = 1;
                        console.log(boxes);
                        setTimeout(() => {
                            document.getElementById('message').innerHTML = '<h1>YOUR TURN</h1>';
                            console.log('Its user turn');
                        }, 1000);

                        break;

                }

            } else {
                console.log('You have selected wrong box');
            }








        }




    } else {
        document.getElementById('message').innerHTML = '<h2>EL JUEGO AÚN NO COMIENZA HASTA QUE HAGAS CLIC EN JUGAR</h2>';
        console.log('Game is not started yet or game is over');
    }
}

function checkWin(player) {
    let result = 2;
    let accomulator = [];
    let accomulatorNumber = 0;
    let counterdraw = 0;
    let numberplayer = player == 'user' ? 1 : 2;
    console.log(numberplayer)

    console.log(boxes);
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].selectionOwner != 0) {
            counterdraw++;
        }
    }
    console.log(counterdraw)
    if (counterdraw == 9) {

        result = 1

    } else {
        for (let i = 0; i < boxes.length; i++) {
            if (boxes[i].selectionOwner == numberplayer) {

                accomulator .push(boxes[i].position);
            }

        }
        console.log(accomulator)
        for (let i = 0; i < accomulator.length; i++) {
            let posAux = position.indexOf(accomulator[i]);
            let objectAux=[];
            for (let j = 0; j < positionArrayWinner.length; j++) {
                if (posAux == positionArrayWinner[j].position) {
                    objectAux.push(positionArrayWinner[j]);
                }
            }
            console.log(objectAux)
            for (let j = 0; j < objectAux.length; j++) {

                let counterAux = 0;
                console.log(j)
                for(let k=i;k<accomulator.length; k++){
                    let posAux2 = position.indexOf(accomulator[k]);
                    console.log(objectAux)

                    if (objectAux[j].friend1 == posAux2 || objectAux[j].friend2 == posAux2) {
                        counterAux++;
    
                    }
                }
                console.log(counterAux)
                if (counterAux == 2) {
                    result = 0;
                }




            }


        }

    }
    console.log(result)

    return result;
}

function selectRandomComputer() {
    //     let positionreturn = 0;
    let auxBoxes = [...boxes];
    // for (let i = 0; i < auxBoxes.length; i++) {
    //     if (auxBoxes[i].selectionOwner != 0) {
    //         auxBoxes.splice(i, 1);
    //     }

    // }
    auxBoxes = auxBoxes.filter(e => e.selectionOwner == 0);
    console.log(auxBoxes);
    if (auxBoxes.length > 0) {

        let pos = auxBoxes[Math.floor(getRandomNumber(0, auxBoxes.length))].position;
        select(pos);
    } else {
        console.log('IT IS A DRAW');
    }
}

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


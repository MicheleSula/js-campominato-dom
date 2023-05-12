const playButton = document.getElementById("play-button");
const gridContainer = document.getElementById("main-section");
const scoreOutput = document.getElementById("score-subtitle");
const lossMessage = document.getElementById("loss-message");

let score = 0;

playButton.addEventListener("click", 
    function () {

        // Resetto a zero punteggio e score
        score = 0;
        scoreOutput.innerHTML = "";
        lossMessage.innerHTML = "";

        // Check for grid already existing
        const gridToEliminate = document.querySelector(".grid-container");
        
        // If grid exists remove it
        if (gridToEliminate) {
            gridToEliminate.remove();
        }

        // Creates new div with grid-container class
        const newGrid = createElement("div", "grid-container");
        gridContainer.append(newGrid);

        
        // Gets value from the select
        let userChoice = document.getElementById("select").value;
        // Checks the value and changes the grid difficulty:

        
        
        
        if (userChoice === "facile") {
            // EASY = 100 squares
            createSquaresAndBombs(newGrid, 100, "square-10");

            // for (let i = 1; i <= 100; i++) {

            //     const newSquare = createElement("div", "square-10", "square-flex");
            //     const newText = createElement("h2", "text-white");
            //     newText.innerHTML = i;
            //     newGrid.append(newSquare);
            //     newSquare.append(newText);

                 
            // }
        } else if (userChoice === "medio") {
            // MEDIUM = 81 squares
            createSquaresAndBombs(newGrid, 81, "square-9");
  
        
        } else {
            // HARD = 49 squares
            createSquaresAndBombs(newGrid, 49, "square-7");   
        }  
    }
);





// ******************* Utilities functions **********************

// Create element with tagtype and how many classes you want to add
function createElement (tagType, ...classesToAdd) {
    const newElement = document.createElement(tagType);
    newElement.classList.add(...classesToAdd);
    return newElement;
}

// Takes a collection of items and when you click them it adds how many classes you want to add
function addClassOnClick (className, ...classesToAdd) {
    const collectionOfItems = document.getElementsByClassName(className);

    for (let i = 0; i < collectionOfItems.length; i++) {
        const element = collectionOfItems[i];
        element.addEventListener("click", function() {
            element.classList.add(...classesToAdd);
        });
    }
}

// Adds and removes classes on click (works just like addClassOnClick)
function addRemoveClassOnClick (tagName, classeToAdd, classeToRemove) {
    const collectionOfItems = document.getElementsByTagName(tagName);

    for (let i = 0; i < collectionOfItems.length; i++) {
        const element = collectionOfItems[i];
        element.addEventListener("click", function() {
            element.classList.add(classeToAdd);
            element.classList.remove(classeToRemove);
        });
    }
}



// ******************************* Game core functions *********************************************

function createSquaresAndBombs(newGrid, counter, squareClass) {

    // Setuppo una stringa vuota
    let bombSquare = [];
    

    // Ciclo while per la length della stringa minore di 16
    while (bombSquare.length < 8) {

        // Creo un numero random da 1 a [valore di counter](100 easy, 81 medium, 49 hard) 
        let randomNumber = Math.floor(Math.random() * counter) + 1;
        // Se faccio indexOf nell'array bombSquare cercando il randomNumber e mi esce -1 (ovvero non trova il valore)
        if (bombSquare.indexOf(randomNumber) === -1) {
            // Aggiungo a bombSquare il random number (questa operazione la fa finché l'array non ha length 16)
            bombSquare.push(randomNumber);
        }
    }

    // Ciclo for per la creazione di tutti gli squares
    for (let i = 1; i <= counter; i++) {
        // Setto newSquare = alla funzione CreateElement coi suoi valori (tipo di tag da inserire - le due classi che mi interessano)
        const newSquare = createElement("div", squareClass, "square-flex");
        // Aggiungo la classe background-brown alla casella cliccata
        addClassOnClick("square-flex", "bg-color-lightgreen");
        // Aggiungo la classe display-block all'h2 e tolgo display-none
        addRemoveClassOnClick("h2", "display-block", "display-none");

        // Metto in automatico che ogni casella non è già stata cliccata
        newSquare.clicked = false;

        // Se faccio indexof nell'array BombSquare e trovo un numero che combacia al valore i -->
        // Poteva essere comodo usare includes()
        if (bombSquare.indexOf(i) !== -1) {

            // Se trovo corrispondenza (quindi trovo una bomba)
            newSquare.addEventListener("click", function() {
                newSquare.classList.add("bomb-square");
                newSquare.style.backgroundColor = "red";
                lossMessage.innerHTML = "Hai perso!";
                // Rendo la griglia non cliccabile finché non viene resettata
                newGrid.classList.add("no-pointer");
                // Aggiorno il punteggio
                showScore();

                // Rivelo tutte le bombe
                // for (let j = 1; j <= counter; j++) {
                // if (bombSquare.indexOf(j) !== -1) {
                // displayo le bombe con classList.add etc. }
                // } 
            });
        } else {
            newSquare.addEventListener("click", function() {
                
                if (!newSquare.clicked) {
                    score++;
                    
                    newSquare.clicked = true;
                }
                
                if (closeToBomb(i, bombSquare)) {
                    newSquare.style.backgroundColor = "orange";
                }
            });
        }


        
        const newText = createElement("h2", "display-none");
        newText.innerHTML = numberOfCloseBombs (i, bombSquare);
        newGrid.append(newSquare);
        newSquare.append(newText);
    }
}

// Update scoreOutput
function showScore() {
    scoreOutput.innerHTML = "Il tuo punteggio é: " + score;
    
    if (score < 0) {
        score === 0;
    } else {
        score--;
    }
}


// ONLY WORKS WITH EASY MODE

// Checks if you're close to a bomb horizontally
function closeToBomb (squareIndex, bombSquare) {
    // Se l'indice di bombsquare è uguale all'indice dello square che ho cliccato +/-1 allora ritorna vero
    // Per il diagonale +/- 11 e +/-9 e per il verticale +- 10
    if ((bombSquare.includes(squareIndex - 1) || bombSquare.includes(squareIndex + 1)) || (bombSquare.includes(squareIndex - 9) || bombSquare.includes(squareIndex + 9)) || (bombSquare.includes(squareIndex - 11) || bombSquare.includes(squareIndex + 11)) || (bombSquare.includes(squareIndex - 10) || bombSquare.includes(squareIndex + 10))) {
        return true;
      }
      return false;
}

function numberOfCloseBombs (squareIndex, bombSquare) {

    let bombNumber = 0;
    
    if (bombSquare.includes(squareIndex - 1)) bombNumber++;
    if (bombSquare.includes(squareIndex + 1)) bombNumber++;
    if (bombSquare.includes(squareIndex - 9)) bombNumber++;
    if (bombSquare.includes(squareIndex + 9)) bombNumber++;
    if (bombSquare.includes(squareIndex - 11)) bombNumber++;
    if (bombSquare.includes(squareIndex + 11)) bombNumber++;
    if (bombSquare.includes(squareIndex - 10)) bombNumber++;
    if (bombSquare.includes(squareIndex + 10)) bombNumber++;

    return bombNumber;
}
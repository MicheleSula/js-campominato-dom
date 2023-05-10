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
        const gridToEliminate = gridContainer.querySelector(".grid-container");
        
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

        // EASY = 100 squares
        if (userChoice === "facile") {
            
            createSquaresAndBombs(newGrid, 100, "square-10");

            addClassOnClick("square-flex", "bg-color-brown");

            addRemoveClassOnClick("h2", "display-block", "display-none");

            
            // for (let i = 1; i <= 100; i++) {

            //     const newSquare = createElement("div", "square-10", "square-flex");
            //     const newText = createElement("h2", "text-white");
            //     newText.innerHTML = i;
            //     newGrid.append(newSquare);
            //     newSquare.append(newText);

                 
            // }

        // MEDIUM = 81 squares
        } else if (userChoice === "medio") {

            createSquaresAndBombs(newGrid, 81, "square-9");

            addClassOnClick("square-flex", "bg-color-brown");

            addRemoveClassOnClick("h2", "display-block", "display-none");
            
        // HARD = 49 squares
        } else {

            createSquaresAndBombs(newGrid, 49, "square-7");

            addClassOnClick("square-flex", "bg-color-brown");

            addRemoveClassOnClick("h2", "display-block", "display-none"); 
            
        }  
    }
);





// ******************* Funzioni **********************

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
    while (bombSquare.length < 16) {

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
        // Metto in automatico che ogni casella non è già stata cliccata
        newSquare.clicked = false;
        // Se faccio indexof nell'array BombSquare e trovo un numero che combacia al valore i -->
        if (bombSquare.indexOf(i) !== -1) {

            // Se trovo corrispondenza nei valori al click perdo
            newSquare.addEventListener("click", function() {
                newSquare.classList.add("bomb-square");
                newSquare.style.backgroundColor = "red";
                lossMessage.innerHTML = "Hai perso!";
                // Rendo la griglia non cliccabile finché non viene resettata
                newGrid.classList.add("no-pointer");
                // Aggiorno il punteggio
                showScore();
                
            });
        } else {
            newSquare.addEventListener("click", function() {
                
                if (!newSquare.clicked) {
                    score++;
                    
                    newSquare.clicked = true;
                }  
            });
        }


        const newText = createElement("h2", "display-none");
        newText.innerHTML = i;
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

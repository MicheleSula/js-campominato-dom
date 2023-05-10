const playButton = document.getElementById("play-button");
const gridContainer = document.getElementById("main-section");

playButton.addEventListener("click", 
    function () {
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
        // EASY
        if (userChoice === "facile") {
        
            for (let i = 1; i <= 100; i++) {

                const newSquare = createElement("div", "square-10", "square-flex");
                const newText = createElement("h2", "text-white");
                newText.innerHTML = i;
                newGrid.append(newSquare);
                newSquare.append(newText);

                addClassOnClick("square-flex", "bg-color-brown");
            } 
        // MEDIUM
        } else if (userChoice === "medio") {

            for (let i = 1; i <= 81; i++) {
                const newSquare = createElement("div", "square-9", "square-flex");
                const newText = createElement("h2", "text-white");
                newText.innerHTML = i;
                newGrid.append(newSquare);
                newSquare.append(newText);

                addClassOnClick("square-flex", "bg-color-brown");
            } 
        // HARD
        } else {

            for (let i = 1; i <= 49; i++) {
                const newSquare = createElement("div", "square-7", "square-flex");
                const newText = createElement("h2", "text-white");
                newText.innerHTML = i;
                newGrid.append(newSquare);
                newSquare.append(newText);

                addClassOnClick("square-flex", "bg-color-brown");
            } 
            
        }  
    }
);

// ******************* Funzioni **********************

function createElement (tagType, ...classesToAdd) {
    const newElement = document.createElement(tagType);
    newElement.classList.add(...classesToAdd);
    return newElement;
}

function addClassOnClick (className, ...classesToAdd) {
    const collectionOfItems = document.getElementsByClassName(className);

    for (let i = 0; i < collectionOfItems.length; i++) {
        const element = collectionOfItems[i];
        element.addEventListener("click", function() {
            element.classList.add(...classesToAdd);
        });
    }
}

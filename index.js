/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    games.forEach(function (arrayItem){
      
        // console.log(arrayItem);
        // create a new div element, which will become the game card
        const newGameDiv = document.createElement("div")
        // add the class game-card to the list
        newGameDiv.classList.add("game-card")

        newGameDiv.innerHTML = `
            <img class='game-img' src=${arrayItem.img}>
            <h3>${arrayItem.name}</h3>
            <p>${arrayItem.description}</p>
            <p>Backers: ${arrayItem.backers}</p>
            
       
        `
        const getElement =  document.getElementById("games-container")
        getElement.appendChild(newGameDiv)
    });
    


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

}

addGamesToPage(GAMES_JSON);
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContribution = GAMES_JSON.reduce((a,b) => {
    return a + b.backers;
}, 0)
// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `
    ${totalContribution.toLocaleString('en-US')}
`

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((c,d) => {
    return c + d.pledged
}, 0)

// set inner HTML using template literal
raisedCard.innerHTML = `
    $${totalRaised.toLocaleString('en-US')}
`


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
let totalGameCount = GAMES_JSON.length
gamesCard.innerHTML = `
    ${totalGameCount.toLocaleString('en-US')}

`

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let gamesUnfunded = GAMES_JSON.filter((game) => {
        return game.goal > game.pledged
    }
    )

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(gamesUnfunded)
}
filterUnfundedOnly()


// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let gamesFunded = GAMES_JSON.filter((game) =>{
        return game.goal <= game.pledged
    })

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(gamesFunded)
}
filterFundedOnly()

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON)
}
showAllGames()

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly)
fundedBtn.addEventListener("click", filterFundedOnly)
allBtn.addEventListener("click", showAllGames)

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let unfundedGamesCount = GAMES_JSON.filter((game)=> game.goal > game.pledged).length
// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `
   A total of $${totalRaised.toLocaleString('en-US')} for ${GAMES_JSON.length} games. Currently, ${unfundedGamesCount} remains unfunded. We need your help to fund these amazing games! 
`
// create a new DOM element containing the template string and append it to the description container
descriptionContainer.append(displayStr)
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [first, second, ...rest] = sortedGames

// create a new element to hold the name of the top pledge game, then append it to the correct element
const nameOfFirstGame = first.name
firstGameContainer.append(nameOfFirstGame)
// do the same for the runner up item
const nameOfSecondGame = second.name
secondGameContainer.append(nameOfSecondGame)
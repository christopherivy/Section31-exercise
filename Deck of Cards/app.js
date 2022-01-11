// ------------------- EXERCISE  DECK OF CARDS------------------------

let myRequests = []
let deckId;
let id = document.getElementById('id')
let newDeckURL = 'http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
let min = -50
let max = 50
let zIndex = 0
let btn = document.getElementById('draw-card-btn')






// get the deck ID
let fullDeck = axios.get(newDeckURL)
    .then(res => {
        deckId = res.data.deck_id
        id.innerText = deckId
        return axios.get(newDeckURL)
    })


// console.log('im here:', fullDeck)

const playAgain = document.getElementById('play-again-btn')
playAgain.addEventListener('click', restartGame)

function restartGame(e) {
    e.preventDefault()
    console.log(e)
    location.reload()
}



// form object and listener
const form = document.getElementById('form');
form.addEventListener('click', getNewCard);
const deck = document.getElementById('div-deck')
    // let minRotate = 5
    // let maxRotate = 1

function getNewCard(e) {
    e.preventDefault();
    if (btn.disabled) {
        return;
    }

    let getNewCard = axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(res => {
            let randomNum = Math.floor(Math.random() * (max - min + 1) + min)

            // controls the zIndex of Div
            zIndex++

            // this is a new card
            let card = res.data.cards[0].images.svg
            console.log(res.data)

            // create a new div for new card and image
            let newDiv = document.createElement('DIV')
            let newImg = document.createElement('IMG')

            newDiv.style.zIndex = zIndex.toString()


            // adding class to newDiv
            newDiv.classList.add('card')
            newImg.classList.add('card-img')


            // setting the source of the image
            newImg.src = card
            newDiv.appendChild(newImg)
            deck.insertBefore(newDiv, deck.childNodes[0])
            newImg.style.transform = `rotate(${randomNum}deg)`


            // handle last card
            let remaining = res.data.remaining
                // console.log(remaining)
        })

    .catch((err) => {
        alert('There are no more cards in the deck. Start the game over!')
        btn.disabled = true
    })
}

// ------------------- EXERCISE ------------------------E
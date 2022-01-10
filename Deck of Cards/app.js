// ------------------- EXERCISE  DECK OF CARDS------------------------

let myRequests = []
let deckId;
let id = document.getElementById('id')
let newDeckURL = 'http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
let min = -7
let max = 7





// get the deck ID
let fullDeck = axios.get(newDeckURL)
    .then(res => {
        deckId = res.data.deck_id
        id.innerText = deckId
        return axios.get(newDeckURL)
    })


// console.log('im here:', fullDeck)

// form object and listener
const form = document.getElementById('form');
form.addEventListener('click', getNewCard);
const deck = document.getElementById('div-deck')
    // let minRotate = 5
    // let maxRotate = 1

function getNewCard(e) {
    e.preventDefault();

    let getNewCard = axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(res => {

            let randomNum = Math.floor(Math.random() * (max - min + 1) + min)

            // this is a new card
            let card = res.data.cards[0].images.svg
            console.log(randomNum)

            // create a new div for new card and image
            let newDiv = document.createElement('DIV')
            let newImg = document.createElement('IMG')

            // adding class to newDiv
            newDiv.classList.add('card')
            newImg.classList.add('card-img')


            let remaining = res.data.remaining
            console.log(remaining)
            if (remaining === 0) {
                alert("All cards drawn!")
            }

            // setting the source of the image
            newImg.src = card
            newDiv.appendChild(newImg)
            deck.insertBefore(newDiv, deck.childNodes[0])
            newImg.style.transform = `rotate(${randomNum}deg)`
        })
}

// ------------------- EXERCISE ------------------------E
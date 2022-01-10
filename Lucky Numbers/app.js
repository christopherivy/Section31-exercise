// ------------------- EXERCISE  LUCKY NUM------------------------E

let num = Math.floor(Math.random() * 100);
let type = 'math'

let myRequests = []

let ol = document.getElementById('fact-list')


for (let i = 1; i < 5; i++) {
    myRequests.push(
        axios.get(`http://numbersapi.com/${num}/${type}`)
    )
}

Promise.all(myRequests)
    .then(numsArr => {
        for (const res of numsArr) {
            ol.innerHTML += `<li>${res.data}</li>`
            console.log(res)
        }
    })
    .catch(err => console.log(err))

let fact = document.getElementById('fact')


// ------------------- EXERCISE ------------------------E
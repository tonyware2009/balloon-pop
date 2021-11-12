

// #region region GAME LOGIC AND DATA

//  DATA 
let clickcount = 0
let height = 120
let width = 100
let inflationrate = 20
let maxsize = 300
let highestPopCount = 0
let currentPopCount = 0
let gamelength = 10000
let clockid = 0
let timeRemaining = 0
let currentplayer = {}
let currentcolor = "red"
let possiblecolors = ["red", "green", "blue", "purple", "pink"] 

function startgame(){
document.getElementById("game-controls").classList.remove("hidden")
document.getElementById("main-controls").classList.add("hidden")
document.getElementById("scoreboard").classList.add("hidden")  
  startclock()
  setTimeout( stopgame, gamelength)
}

function startclock(){
  timeRemaining = gamelength
  drawclock()
 clockid = setInterval(drawclock, 1000)
}

function stopClock(){
  clearInterval(clockid)
}

function drawclock(){
let countdownelem = document.getElementById("countdown")
countdownelem.innerText = (timeRemaining / 1000)
timeRemaining -= 1000
}

function inflate(){
  clickcount++
  height += inflationrate
  width += inflationrate
  checkballoonpop()
  draw()
}

function checkballoonpop(){
  if(height >= maxsize){
    console.log("pop the balloon")
    let balloonElement = document.getElementById("balloon")
    balloonElement.classList.remove(currentcolor)
    getrandomcolor()
    balloonElement.classList.add(currentcolor)

    // @ts-ignore
    document.getElementById("pop-sound").play()

    currentPopCount++
    height = 40
    width = 0
  }
}

function getrandomcolor(){
 let i = Math.floor(Math.random() * possiblecolors.gamelength);
 currentcolor = possiblecolors [i]
}

function draw(){
  let balloonElement = document.getElementById("balloon")
  let clickcountelem = document.getElementById("click-count")
  let popCountElem = document.getElementById("pop-count")
  let highpopCountElem = document.getElementById("high-pop-count")
  let playerNameelem = document.getElementById("player-name")

  balloonElement.style.height = height + "px"
  balloonElement.style.width = width + "px"
  
  clickcountelem.innerText = clickcount.toString()
  popCountElem.innerText = currentPopCount.toString()
  highpopCountElem.innerText = currentplayer.topscore
  playerNameelem.innerText = currentplayer.name
}

function stopgame(){
 console.log("The Game Is Over")

 document.getElementById("main-controls").classList.remove("hidden")
document.getElementById("game-controls").classList.add
("hidden")
document.getElementById("scoreboard").classList.remove("hidden")
  clickcount = 0
  height = 120
  width = 100

  if(currentPopCount > currentplayer.topscore){
    currentplayer.topscore = currentPopCount
    saveplayers()
  }
  currentPopCount = 0
  stopClock()
  draw()
  drawScoreboard()

}

// #endregion

let players = []
loadplayers()

function setPlayer(event){
event.preventDefault()
let form = event.target

let playername =form.playerName.value

currentplayer = players.find(player => player.name == playername)

if(!currentplayer){
  currentplayer = {name: playername, topscore: 0 }
  players.push(currentplayer)
  saveplayers() 
}

form.reset()
document.getElementById("game").classList.remove("hidden")
form.classList.add("hidden")
draw()
drawScoreboard()
}

function changeplayer(){
  document.getElementById("player-form").classList.remove("hidden")
  document.getElementById("game").classList.add("hidden")
}

function saveplayers(){
  window.localStorage.setItem("players", JSON.stringify(players))
}
function loadplayers(){
  let playersdata = JSON.parse(window.localStorage.getItem("players"))
  if (playersdata){
    players = playersdata
  }
}

function drawScoreboard(){
let template = ""
players.sort((p1, p2,) => p2.topscore - p1.topscore)


players.forEach(player =>{
  template += ` 
  <div class="d-flex space-between">
      <span>
        <i class="fa fa-user"></i>
        ${player.name} 
      </span>
      <span>score: ${player.topscore}</span>
  </div>
  `
})

document.getElementById("players").innerHTML
= template
}

drawScoreboard()



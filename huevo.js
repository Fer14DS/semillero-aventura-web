// elementos dinamicos HTML
const board = document.getElementById("board")
const scoreboard = document.getElementById("scoreBoard")
const startButton = document.getElementById("start")
const gameOverSign = document.getElementById("gameOver")

//Nuevo Elementos
const bestBoard = document.getElementById("bestBoard")
const lengthBoard = document.getElementById("lenghtBoard")
const levelBoard = document.getElementById("levelBoard")
const timeBoard = document.getElementById("timeBoard")
const speedBoard = document.getElementById("speedBoard")
const pauseButton = document.getElementById("pause")
const restartButton = document.getElementById("restart")
const finalScore = document.getElementById("finalScore")
const finalBest = document.getElementById("historybestscore")
const sizeSelect = document.getElementById("sizeSelect")
const speedSelect = document.getElementById("speedSelect")
const modeSelect = document.getElementById("modeSelect")
const skinSelect = document.getElementById("skinSelect")
const volumeSlider = document.getElementById("volumeSlider")

//Configuraciones del juego
let boardSize = 10
let gamespeed = 100
let gameMode = "walls" //Puedes ser wrap
let skin = "classic"
let masterVolume = 0.4
const squareTypes = {
    emptySquare: 0,
    snakeSquare: 1,
    foodSquare: 2
}

// Direcciones 
const directions = {
    ArrowUp: (size)=>-size,
    ArrowDown: (size)=>size,
    ArrowRight: ()=>1,
    ArrowLeft: ()=>2,
}

//Variables del juego 
let snake
let score
let direction
let boardSquares
let emptySquares
let moveInterval
let paused = false
let startTimestamp
let elapsedMs = 0
let timeInterval
let level = 1
let bestScore = Number(localStorage.getItem("snake_best-score")|| 0)

//Audio
let audioCtx
const playBeep = (freq = 600, duration = 100, type = "sine", gainValue = 0.03)=>{
    try {
        audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)()
        const o = audioCtx.createOscillator()
        const g = audioCtx.createGain()
        o.type = type
        o.frequency.value = freq
        g.gain.value = gainValue * masterVolume
        o.connect(g)
        g.connect(audioCtx.destination)
        o.start()
        setTimeout(()=>{
            o.stop(); o.disconnect(); g.disconnect();
        }, duration)
    } catch (error) {
        console.log("Ocurrio un Error" + error)
    }
}

const playEat = () =>{ playBeep(740, 80, "square", 0.2)}
const playGameOver = () =>{
    playBeep(200,180, "sawtooth", 0.25)
    setTimeout(()=> playBeep(160, 220, "sawtooth", 0.25), 100)
}

let timer;
let remainingTime = 0;
let isPaused = false;

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const breakBtn = document.getElementById("break");

const pomodoroBtn = document.getElementById("p-btn");
const shortBreakBtn = document.getElementById("s-btn");
const longBreakBtn = document.getElementById("l-btn");

const setTimeBtn = document.getElementById("set-time");
const minutesInput = document.getElementById("minutes-input");
const secondsInput = document.getElementById("seconds-input");

function updateDisplay() {
    const minutes = Math.floor(remainingTime / 60).toString().padStart(2, "0");
    const seconds = (remainingTime % 60).toString().padStart(2, "0");
    timerDisplay.textContent = `${minutes}:${seconds}`;
}

function startTimer() {
    if (timer) return;

    timer = setInterval(() => {
        if (!isPaused && remainingTime > 0) {
            remainingTime--;
            updateDisplay();
        } else if (remainingTime === 0) {
            clearInterval(timer);
            timer = null;
            alert("Times Up!");
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
    timer = null;
    remainingTime = 0;
    updateDisplay();
}

function pauseTimer() {
    isPaused = !isPaused;
    breakBtn.textContent = isPaused ? "Continue" : "Break";
}

function setTimer(seconds) {
    remainingTime = seconds;
    updateDisplay();
}

// Zaman seçme butonları
pomodoroBtn.addEventListener("click", (e) => {
    e.preventDefault();
    setTimer(25 * 60);
});

shortBreakBtn.addEventListener("click", (e) => {
    e.preventDefault();
    setTimer(5 * 60);
});

longBreakBtn.addEventListener("click", (e) => {
    e.preventDefault();
    setTimer(15 * 60);
});

// Manuel süre ayarlama
setTimeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    setTimer(minutes * 60 + seconds);
    minutesInput.value = "";
    secondsInput.value = "";
});

startBtn.addEventListener("click", (e) => {
    e.preventDefault();
    startTimer();
});

stopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    stopTimer();
});

breakBtn.addEventListener("click", (e) => {
    e.preventDefault();
    pauseTimer();
});

setTimer(0);


document.addEventListener("DOMContentLoaded", () => {
    const workoutPage = document.querySelector(".workout-page");

    // Only run on workout pages
    if (!workoutPage) return;

    let timeLeft = 60 * 60;
    let timerInterval = null;
    let isRunning = false;
    let hasStarted = false;

    // Create the timer section
    const timerBox = document.createElement("section");
    timerBox.className = "workout-timer";

    timerBox.innerHTML = `
        <p class="timer-label">YOUR WORKOUT TIMER 💙</p>
        <div class="timer-display" aria-live="polite">60:00</div>
        <p class="timer-message">Ready when you are!</p>

        <div class="timer-buttons">
            <button type="button" class="timer-start">
                Start Workout
            </button>
            <button type="button" class="timer-pause" disabled>
                Pause
            </button>
            <button type="button" class="timer-reset">
                Reset
            </button>
        </div>
    `;

    workoutPage.prepend(timerBox);

    const display = timerBox.querySelector(".timer-display");
    const message = timerBox.querySelector(".timer-message");
    const startButton = timerBox.querySelector(".timer-start");
    const pauseButton = timerBox.querySelector(".timer-pause");
    const resetButton = timerBox.querySelector(".timer-reset");

    function updateDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        display.textContent =
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    function stopTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
        isRunning = false;
        pauseButton.disabled = true;
    }

    function startTimer() {
        if (isRunning || timeLeft <= 0) return;

        hasStarted = true;
        isRunning = true;

        startButton.textContent = "Workout Started!";
        pauseButton.disabled = false;
        message.textContent = "You've got this! Take it one exercise at a time. 💪";

        timerInterval = setInterval(() => {
            timeLeft--;
            updateDisplay();

            if (timeLeft <= 0) {
                timeLeft = 0;
                updateDisplay();
                stopTimer();

                message.textContent = "Time's up! Great job showing up today. ❤️";
                startButton.textContent = "Workout Complete";
                startButton.disabled = true;
            }
        }, 1000);
    }

    startButton.addEventListener("click", startTimer);

    pauseButton.addEventListener("click", () => {
        if (!isRunning) return;

        stopTimer();
        startButton.textContent = "Resume Workout";
        message.textContent = "Timer paused. Take a breath when you need to.";
    });

    resetButton.addEventListener("click", () => {
        stopTimer();

        timeLeft = 60 * 60;
        hasStarted = false;

        updateDisplay();
        startButton.disabled = false;
        startButton.textContent = "Start Workout";
        message.textContent = "Ready when you are!";

        // Keep the reset simple; no page reload needed.
    });

    updateDisplay();
});

let wins = JSON.parse(localStorage.getItem('wins')) || [];
const WEEKLY_GOAL = 15; // Adjust as needed

function updateStorage() {
    localStorage.setItem('wins', JSON.stringify(wins));
}

function updateStats() {
    // Calculate totals
    const totalWins = wins.length;
    const totalTime = wins.reduce((acc, curr) => acc + curr.time, 0);
    const average = totalWins > 0 ? totalTime / totalWins : 0;

    // Update DOM
    document.getElementById('totalWins').textContent = totalWins;
    document.getElementById('totalTime').textContent = `${totalTime} mins`;
    document.getElementById('averageTime').textContent = `${average.toFixed(1)} mins`;

    // Progress calculations
    const progress = (totalWins / WEEKLY_GOAL) * 100;
    document.getElementById('progressFill').style.width = `${Math.min(progress, 100)}%`;
    document.getElementById('progressText').textContent = 
        `${Math.round(progress)}% of weekly goal (${WEEKLY_GOAL} wins)`;

    // Motivational messages
    const messages = [
        "You're building momentum! 🚀",
        "Small steps lead to big changes! 💪",
        "Consistency > perfection! 🌟",
        "Every win counts! 🎯",
        "Future you will thank present you! 🦊"
    ];
    document.getElementById('motivationText').textContent = 
        totalWins > 0 ? messages[Math.floor(Math.random() * messages.length)] : 
        "Start adding wins to unlock your first achievement! 🚀";
}

function addEntry() {
    const taskInput = document.getElementById('taskInput');
    const timeInput = document.getElementById('timeInput');

    if (taskInput.value && timeInput.value) {
        wins.push({
            task: taskInput.value,
            time: parseInt(timeInput.value),
            date: new Date().toISOString()
        });
        
        taskInput.value = '';
        timeInput.value = '';
        updateStorage();
        updateStats();
    }
}

// Initial load
updateStats();

// Optional: Add reset functionality
// document.getElementById('resetBtn').addEventListener('click', () => {
//     wins = [];
//     updateStorage();
//     updateStats();
// });

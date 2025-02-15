// List of daily coding challenges
const dailyChallenges = [
    { title: "Two Sum", link: "https://leetcode.com/problems/two-sum/", difficulty: "Easy" },
    { title: "Longest Substring Without Repeating Characters", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", difficulty: "Medium" },
    { title: "Merge K Sorted Lists", link: "https://leetcode.com/problems/merge-k-sorted-lists/", difficulty: "Hard" },
    { title: "Valid Parentheses", link: "https://leetcode.com/problems/valid-parentheses/", difficulty: "Easy" },
    { title: "Binary Tree Level Order Traversal", link: "https://leetcode.com/problems/binary-tree-level-order-traversal/", difficulty: "Medium" }
];

// Function to open today's challenge
function openDailyChallenge() {
    let challenge = dailyChallenges[new Date().getDate() % dailyChallenges.length]; // Change daily
    window.open(challenge.link, "_blank");
    startTimer(30); // 30-minute challenge
}

// Function to start a countdown timer
function startTimer(minutes) {
    let timeLeft = minutes * 60;
    let timerDiv = document.getElementById("challenge-timer");

    let timer = setInterval(() => {
        let mins = Math.floor(timeLeft / 60);
        let secs = timeLeft % 60;
        timerDiv.textContent = `⏳ Time Left: ${mins}m ${secs}s`;

        if (timeLeft === 0) {
            clearInterval(timer);
            timerDiv.textContent = "❌ Time's up! Try again tomorrow!";
        }
        timeLeft--;
    }, 1000);
}


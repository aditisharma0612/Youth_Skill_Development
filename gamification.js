// ✅ Load User Gamification Data from Local Storage
function loadGamification() {
    let userData = JSON.parse(localStorage.getItem("userData")) || {
        xp: 0,
        level: 1,
        progress: 0,
        streak: 0,
        badges: [],
        quests: ["Complete Skill Gap Analysis", "Watch a Study Video", "Solve a Coding Challenge"],
        lootRewards: ["Extra XP", "Exclusive Badge", "Discount on a Course", "Nothing... Try Again!"],
        leaderboard: [{ name: "You", xp: 0 }]
    };

    // ✅ Update UI Elements
    document.getElementById("xp-points").innerText = `XP: ${userData.xp}`;
    document.getElementById("user-level").innerText = `Level: ${userData.level}`;
    document.getElementById("progress-bar").style.width = `${userData.progress}%`;
    document.getElementById("progress-text").innerText = `${userData.progress}% Completed`;
    document.getElementById("streak-count").innerText = `Current Streak: ${userData.streak} Days`;

    // ✅ Load Quests
    let questList = document.getElementById("quest-list");
    questList.innerHTML = "";
    userData.quests.forEach(quest => {
        let li = document.createElement("li");
        li.innerText = quest;
        questList.appendChild(li);
    });

    // ✅ Load Badges
    let badgesDiv = document.getElementById("badges");
    badgesDiv.innerHTML = userData.badges.length > 0 ? userData.badges.map(b => `🏅 ${b}`).join(" ") : "No Badges Yet";

    // ✅ Load Leaderboard
    let leaderboardDiv = document.getElementById("leaderboard");
    leaderboardDiv.innerHTML = "";
    userData.leaderboard.forEach(player => {
        let li = document.createElement("li");
        li.innerText = `${player.name} - ${player.xp} XP`;
        leaderboardDiv.appendChild(li);
    });

    // ✅ Save Updated Data
    localStorage.setItem("userData", JSON.stringify(userData));
}

// ✅ Update XP & Level Progress
function completeTask(xpEarned) {
    let userData = JSON.parse(localStorage.getItem("userData")) || {
        xp: 0,
        level: 1,
        progress: 0,
        streak: 0,
        badges: []
    };

    userData.xp += xpEarned;
    userData.progress = Math.min(100, Math.round((userData.xp % 500) / 5)); // Progress bar logic

    // ✅ Level Up Check
    if (userData.xp >= 500) {
        userData.level += 1;
        userData.xp = 0; // Reset XP after leveling up
        userData.badges.push(`Level ${userData.level} Achiever`);
    }

    // ✅ Daily Streak System
    userData.streak += 1;

    // ✅ Save Updated Data
    localStorage.setItem("userData", JSON.stringify(userData));

    // ✅ Reload UI
    loadGamification();
}

// 🎁 Open Mystery Loot Box
function openLootBox() {
    let userData = JSON.parse(localStorage.getItem("userData"));
    let randomReward = userData.lootRewards[Math.floor(Math.random() * userData.lootRewards.length)];
    document.getElementById("loot-result").innerText = `🎉 You Won: ${randomReward}`;

    // ✅ Apply Reward Logic
    if (randomReward === "Extra XP") {
        userData.xp += 100;
    } else if (randomReward === "Exclusive Badge") {
        userData.badges.push("Mystery Box Winner");
    }

    // ✅ Save Updated Data
    localStorage.setItem("userData", JSON.stringify(userData));
    loadGamification();
}

// ✅ Initialize Gamification on Page Load
document.addEventListener("DOMContentLoaded", loadGamification);

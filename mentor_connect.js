// Pre-collected LinkedIn Mentors (Manually added)
const mentorDatabase = {
    "JavaScript": [
        { name: "Rohan Mehta", linkedin: "https://www.linkedin.com/in/rohan-mehta/", company: "Google India" },
        { name: "Sneha Kapoor", linkedin: "https://www.linkedin.com/in/sneha-kapoor/", company: "Amazon India" }
    ],
    "Python": [
        { name: "Vikram Sharma", linkedin: "https://www.linkedin.com/in/vikram-sharma/", company: "Microsoft India" },
        { name: "Ananya Sen", linkedin: "https://www.linkedin.com/in/ananya-sen/", company: "Flipkart" }
    ],
    "Data Science": [
        { name: "Rahul Gupta", linkedin: "https://www.linkedin.com/in/rahul-gupta/", company: "TCS" },
        { name: "Priya Rao", linkedin: "https://www.linkedin.com/in/priya-rao/", company: "Infosys" }
    ],
    "Machine Learning": [
        { name: "Amit Joshi", linkedin: "https://www.linkedin.com/in/amit-joshi/", company: "Wipro AI Labs" },
        { name: "Neha Verma", linkedin: "https://www.linkedin.com/in/neha-verma/", company: "Accenture AI" }
    ]
};

// Function to Find Mentors
function findMentor() {
    let selectedSkill = document.getElementById("mentor-skill").value;
    let mentorDiv = document.getElementById("mentor-list");

    if (!selectedSkill) {
        alert("Please select a skill to find mentors!");
        return;
    }

    if (!mentorDatabase[selectedSkill]) {
        mentorDiv.innerHTML = "<p class='text-red-400'>No mentors available for this skill yet.</p>";
        return;
    }

    // Display mentors
    let mentors = mentorDatabase[selectedSkill];
    mentorDiv.innerHTML = `
        <h4 class="text-xl text-green-400 mt-2">Top Mentors for ${selectedSkill}</h4>
        <ul class="mt-2">
            ${mentors.map(mentor => `
                <li class="mt-2">
                    <strong>${mentor.name}</strong> - ${mentor.company} <br>
                    <a href="${mentor.linkedin}" target="_blank" class="text-blue-300">Connect on LinkedIn</a>
                </li>
            `).join("")}
        </ul>
    `;
}

// AI-Based Skill Auto-Suggestions
const skillDatabase = [
    "Python", "SQL", "Machine Learning", "Deep Learning", "React", "Node.js",
    "Cybersecurity", "Cloud Security", "TensorFlow", "Data Analysis", 
    "Project Management", "Marketing", "SEO", "Google Ads", "Social Media",
    "Data Visualization", "Agile Methodology", "Finance", "Investment Banking"
];

function showSuggestions() {
    let input = document.getElementById("user-skills").value.toLowerCase();
    let suggestionBox = document.getElementById("suggestions");

    // Clear previous suggestions
    suggestionBox.innerHTML = "";

    if (input.length === 0) {
        return; // Exit if input is empty
    }

    // Find matching skills
    let matches = skillDatabase.filter(skill => skill.toLowerCase().includes(input));

    if (matches.length === 0) {
        suggestionBox.innerHTML = `<p class="text-gray-400 px-2">No suggestions found</p>`;
        return;
    }

    // Display suggestions
    suggestionBox.innerHTML = matches.map(skill =>
        `<div class="cursor-pointer p-2 hover:bg-gray-700" onclick="addSkill('${skill}')">${skill}</div>`
    ).join("");
}

function addSkill(skill) {
    let input = document.getElementById("user-skills");
    input.value += (input.value ? ", " : "") + skill;
    document.getElementById("suggestions").innerHTML = ""; // Clear suggestions after selection
}

// Gamified Progress Tracker
let completedSkills = 0;

function markSkillCompleted() {
    completedSkills++;
    let progress = Math.min((completedSkills / skillDatabase.length) * 100, 100);
    document.getElementById("progress-bar").style.width = progress + "%";
    document.getElementById("progress-text").innerText = `${progress.toFixed(0)}% Completed`;
}


// Ensure PDF.js is loaded before running the function
async function extractSkillsFromResume() {
    let resumeFile = document.getElementById("resume-upload").files[0];

    if (!resumeFile) {
        alert("Please upload a resume.");
        return;
    }

    let fileReader = new FileReader();

    fileReader.onload = async function(event) {
        let typedArray = new Uint8Array(event.target.result);

        try {
            // Extract text from PDF using PDF.js
            let pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
            let extractedText = "";

            for (let i = 1; i <= pdf.numPages; i++) {
                let page = await pdf.getPage(i);
                let textContent = await page.getTextContent();
                let pageText = textContent.items.map(item => item.str).join(" ");
                extractedText += pageText.toLowerCase() + " ";
            }

            console.log("Extracted Resume Text:", extractedText); // Debugging

            // Skill Database (for matching)
            let skillDatabase = [
                "Python", "SQL", "Machine Learning", "Deep Learning",
                "React", "Node.js", "Cybersecurity", "Cloud Security",
                "TensorFlow", "Data Analysis", "Project Management"
            ];

            // Match skills
            let detectedSkills = skillDatabase.filter(skill => extractedText.includes(skill.toLowerCase()));

            // Display results
            let resultBox = document.getElementById("resume-skills");
            if (detectedSkills.length > 0) {
                resultBox.innerHTML = `<strong class="text-green-400">Extracted Skills:</strong> ${detectedSkills.join(", ")}`;
            } else {
                resultBox.innerHTML = `<strong class="text-red-400">No skills detected.</strong> Try a different resume.`;
            }
        } catch (error) {
            console.error("Error reading PDF:", error);
            alert("Failed to extract text from resume. Please try a different file.");
        }
    };

    fileReader.readAsArrayBuffer(resumeFile);
}







// AI Career Chatbot (Replace with Your OpenAI API Key)
async function askAI() {
    let query = document.getElementById("chat-input").value;
    if (!query) {
        alert("Please enter a question.");
        return;
    }

    let responseBox = document.getElementById("chat-response");
    responseBox.innerText = "Thinking...";

    try {
        let response = await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer YOUR_OPENAI_API_KEY"
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: `Career advice for: ${query}`,
                max_tokens: 100
            })
        });

        let data = await response.json();
        responseBox.innerText = data.choices[0].text.trim();
    } catch (error) {
        responseBox.innerText = "Error fetching AI response.";
    }
}




// 2️⃣ Download Study Plan as Readable PDF
function downloadStudyPlan() {
    let { jsPDF } = window.jspdf;
    let doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.text("📘 Personalized Study Plan", 10, 10);
    doc.setFont("helvetica", "normal");

    let missingSkills = ["Machine Learning", "SQL", "TensorFlow"]; // This should be dynamically filled

    if (missingSkills.length > 0) {
        doc.setFont("helvetica", "bold");
        doc.text("🔹 Skills You Need to Learn:", 10, 20);
        doc.setFont("helvetica", "normal");

        let yPosition = 30;
        missingSkills.forEach((skill, index) => {
            doc.text(`✅ ${skill}`, 10, yPosition + (index * 10));
        });

        yPosition += missingSkills.length * 10 + 10;
        doc.setFont("helvetica", "bold");
        doc.text("📚 Recommended Resources:", 10, yPosition);
        doc.setFont("helvetica", "normal");

        let resources = [
            "1️⃣ Coursera: https://www.coursera.org",
            "2️⃣ Udemy: https://www.udemy.com",
            "3️⃣ Kaggle: https://www.kaggle.com"
        ];

        resources.forEach((resource, index) => {
            doc.text(resource, 10, yPosition + 10 + (index * 10));
        });

    } else {
        doc.text("✅ You have all the required skills! Keep improving!", 10, 20);
    }

    doc.save("Study_Plan.pdf");
}

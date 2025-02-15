const skillQuestions = {
    "JavaScript": [
        { question: "What does 'var' stand for?", answer: "Variable" },
        { question: "Which keyword declares a constant in JS?", answer: "const" },
        { question: "What is the output of `typeof NaN`?", answer: "number" },
        { question: "Which method converts a JSON string to an object?", answer: "JSON.parse" },
        { question: "Which symbol is used for arrow functions?", answer: "=>" }
    ],
    "Python": [
        { question: "Which keyword defines a function?", answer: "def" },
        { question: "What data type is `None` in Python?", answer: "NoneType" },
        { question: "What is the result of `5 // 2`?", answer: "2" },
        { question: "Which module is used for handling JSON in Python?", answer: "json" },
        { question: "What is a lambda function?", answer: "Anonymous function" }
    ],
    "Data Structures": [
        { question: "Which data structure uses LIFO?", answer: "Stack" },
        { question: "What is the worst-case time complexity of QuickSort?", answer: "O(n^2)" },
        { question: "What is a balanced binary tree?", answer: "Height difference ≤ 1" },
        { question: "What is the best case time complexity of Merge Sort?", answer: "O(n log n)" },
        { question: "Which data structure uses FIFO?", answer: "Queue" }
    ],
    "Machine Learning": [
        { question: "What is the purpose of a loss function in ML?", answer: "Measure error" },
        { question: "What does 'supervised learning' require?", answer: "Labeled data" },
        { question: "Which algorithm is used for classification?", answer: "Logistic Regression" },
        { question: "What does CNN stand for?", answer: "Convolutional Neural Network" },
        { question: "Which ML model is best for sequential data?", answer: "Recurrent Neural Network" }
    ],
    "Cybersecurity": [
        { question: "What does VPN stand for?", answer: "Virtual Private Network" },
        { question: "What type of attack is a DDoS?", answer: "Denial of Service" },
        { question: "What is phishing?", answer: "Fraudulent email scam" },
        { question: "Which encryption method is stronger: AES-128 or AES-256?", answer: "AES-256" },
        { question: "What does SQL injection target?", answer: "Databases" }
    ],
    "Cloud Computing": [
        { question: "What does SaaS stand for?", answer: "Software as a Service" },
        { question: "Which cloud provider offers EC2?", answer: "AWS" },
        { question: "What is Kubernetes used for?", answer: "Container Orchestration" },
        { question: "Which service type is GCP's Firebase?", answer: "BaaS" },
        { question: "What does IAM stand for in cloud security?", answer: "Identity and Access Management" }
    ],
    "DevOps": [
        { question: "What does CI/CD stand for?", answer: "Continuous Integration/Continuous Deployment" },
        { question: "Which tool is used for containerization?", answer: "Docker" },
        { question: "What does IaC stand for?", answer: "Infrastructure as Code" },
        { question: "Which DevOps tool is used for automation?", answer: "Ansible" },
        { question: "What does Jenkins do?", answer: "Automates builds & deployments" }
    ],
    "Blockchain": [
        { question: "What does PoW stand for?", answer: "Proof of Work" },
        { question: "What is a smart contract?", answer: "Self-executing contract" },
        { question: "Which cryptocurrency is known as digital gold?", answer: "Bitcoin" },
        { question: "What does Ethereum use for transactions?", answer: "Gas fees" },
        { question: "What is the consensus algorithm in Bitcoin?", answer: "Proof of Work" }
    ],
    "Web Development": [
        { question: "What does HTML stand for?", answer: "HyperText Markup Language" },
        { question: "Which CSS property is used for flexbox?", answer: "display: flex" },
        { question: "What does AJAX stand for?", answer: "Asynchronous JavaScript and XML" },
        { question: "What is the purpose of React.js?", answer: "Build UI components" },
        { question: "Which HTTP method is used to send data?", answer: "POST" }
    ],
    "Database Management": [
        { question: "Which SQL statement fetches data?", answer: "SELECT" },
        { question: "What is a primary key?", answer: "Unique identifier" },
        { question: "Which NoSQL database is document-based?", answer: "MongoDB" },
        { question: "What does ACID stand for?", answer: "Atomicity, Consistency, Isolation, Durability" },
        { question: "Which database is best for large-scale transactions?", answer: "PostgreSQL" }
    ]
};

let currentLevel = 1;
let currentSkill = "";
let currentQuestions = [];
let score = 0;
let questionIndex = 0;


function startSkillQuiz() {
    let skillDropdown = document.getElementById("skill-dropdown");
    let selectedSkill = skillDropdown.value;

    if (!selectedSkill) {
        alert("Please select a skill first!");
        return;
    }

    if (!skillQuestions[selectedSkill]) {
        alert("Skill not found! Try another one.");
        return;
    }

    currentSkill = selectedSkill;
    currentQuestions = [...skillQuestions[currentSkill]].sort(() => Math.random() - 0.5);
    questionIndex = 0;
    score = 0;
    currentLevel = 1;

    loadQuestion();
}




function loadQuestion() {
    if (questionIndex >= 5) {
        checkLevelUp();
        return;
    }

    let quizContainer = document.getElementById("quiz-container");
    let questionData = currentQuestions[questionIndex];

    quizContainer.innerHTML = `
        <h4 class="text-lg font-bold">Level ${currentLevel}: ${currentSkill}</h4>
        <p class="mt-2">${questionData.question}</p>
        <input id="user-answer" type="text" placeholder="Your answer..." class="text-black mt-2 p-2 rounded w-full">
        <button onclick="checkAnswer('${questionData.answer}')" class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded mt-3">
            Submit
        </button>
        <p id="quiz-result" class="mt-2"></p>
    `;
}

function checkAnswer(correctAnswer) {
    let userAnswer = document.getElementById("user-answer").value.trim();
    let result = document.getElementById("quiz-result");

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        result.textContent = "✅ Correct!";
        result.classList.add("text-green-400");
        score++;
    } else {
        result.textContent = "❌ Wrong! Correct answer: " + correctAnswer;
        result.classList.add("text-red-400");
    }

    questionIndex++;
    setTimeout(loadQuestion, 1000);
}

function checkLevelUp() {
    let quizContainer = document.getElementById("quiz-container");

    if (score >= 4) {
        currentLevel++;
        quizContainer.innerHTML = `
            <h4 class="text-xl font-bold text-green-400">🎉 Congrats! You unlocked Level ${currentLevel}!</h4>
            <button onclick="loadQuestion()" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-3">
                Continue to Level ${currentLevel}
            </button>
        `;
    } else {
        quizContainer.innerHTML = `<h4 class="text-xl font-bold text-red-400">❌ Try Again!</h4>`;
    }
}

const jobRoles = {
    tech: {
        data_scientist: {
            skills: ["Python", "SQL", "Machine Learning", "Data Visualization", "Deep Learning", "Big Data", "Statistics"],
            resources: ["https://www.coursera.org/courses?query=data%20science", "https://www.kaggle.com/"]
        },
        web_developer: {
            skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "TypeScript", "REST APIs"],
            resources: ["https://www.freecodecamp.org/", "https://developer.mozilla.org/"]
        },
        cybersecurity: {
            skills: ["Networking", "Ethical Hacking", "Python", "Cloud Security", "Cryptography"],
            resources: ["https://www.cybrary.it/", "https://www.udemy.com/courses/search/?q=cybersecurity"]
        },
        ai_engineer: {
            skills: ["Deep Learning", "TensorFlow", "Natural Language Processing", "Computer Vision", "AI Ethics"],
            resources: ["https://ai.google/", "https://www.fast.ai/"]
        },
        devops_engineer: {
            skills: ["Docker", "Kubernetes", "CI/CD", "Cloud Platforms", "Infrastructure as Code"],
            resources: ["https://www.udemy.com/courses/search/?q=devops"]
        }
    },
    marketing: {
        digital_marketer: {
            skills: ["SEO", "Google Ads", "Content Marketing", "Social Media", "Email Marketing", "Data Analytics"],
            resources: ["https://www.hubspot.com/", "https://moz.com/learn/seo"]
        },
        social_media_manager: {
            skills: ["Instagram Ads", "Facebook Ads", "Community Building", "Branding", "Video Marketing"],
            resources: ["https://www.udemy.com/course/social-media-marketing-complete-certificate-course/"]
        },
        content_strategist: {
            skills: ["Content Writing", "Keyword Research", "Audience Analysis", "Conversion Optimization"],
            resources: ["https://copyblogger.com/", "https://ahrefs.com/blog/content-marketing/"]
        },
        brand_manager: {
            skills: ["Market Research", "Advertising", "Public Relations", "Storytelling"],
            resources: ["https://www.coursera.org/specializations/brand-management"]
        },
        email_marketer: {
            skills: ["Email Campaigns", "A/B Testing", "CRM Software", "Automation"],
            resources: ["https://www.mailchimp.com/resources"]
        }
    },
    business: {
        project_manager: {
            skills: ["Agile Methodology", "Scrum", "Risk Management", "Leadership", "Budgeting"],
            resources: ["https://www.pmi.org/", "https://www.udemy.com/topic/project-management/"]
        },
        business_analyst: {
            skills: ["Data Analysis", "SQL", "Business Strategy", "Communication", "Excel"],
            resources: ["https://www.coursera.org/specializations/business-analytics"]
        },
        hr_manager: {
            skills: ["Employee Relations", "Hiring Strategies", "HR Analytics", "Compensation Management"],
            resources: ["https://www.shrm.org/"]
        },
        financial_analyst: {
            skills: ["Financial Modeling", "Risk Analysis", "Investment Strategies", "Excel"],
            resources: ["https://www.investopedia.com/"]
        },
        operations_manager: {
            skills: ["Process Optimization", "Lean Management", "Supply Chain Management"],
            resources: ["https://www.udemy.com/course/operations-management/"]
        }
    },
    healthcare: {
        registered_nurse: {
            skills: ["Patient Care", "Medication Administration", "Emergency Response", "Medical Ethics"],
            resources: ["https://www.nursing.org/"]
        },
        healthcare_admin: {
            skills: ["Healthcare Policy", "Hospital Management", "Data Analysis", "Financial Planning"],
            resources: ["https://www.coursera.org/specializations/healthcare-administration"]
        },
        medical_coder: {
            skills: ["Medical Terminology", "ICD Coding", "Billing", "HIPAA Compliance"],
            resources: ["https://www.ahima.org/"]
        }
    },

    design: {
        ui_ux_designer: {
            skills: ["Figma", "Adobe XD", "Wireframing", "User Research", "Prototyping"],
            resources: ["https://www.interaction-design.org/", "https://uxdesign.cc/"]
        },
        graphic_designer: {
            skills: ["Photoshop", "Illustrator", "Typography", "Branding", "Print Design"],
            resources: ["https://www.adobe.com/", "https://www.canva.com/"]
        },
        motion_designer: {
            skills: ["After Effects", "Animation", "Storyboarding", "3D Motion"],
            resources: ["https://www.schoolofmotion.com/", "https://www.motiondesign.school/"]
        }
    },
    finance: {
        accountant: {
            skills: ["Bookkeeping", "Taxation", "Financial Reporting", "QuickBooks"],
            resources: ["https://www.aicpa.org/"]
        },
        investment_banker: {
            skills: ["Financial Analysis", "Valuation", "Mergers & Acquisitions", "Excel Modeling"],
            resources: ["https://www.wallstreetmojo.com/"]
        }
    }
};

// Dynamic job role population
function populateJobs() {
    let domain = document.getElementById("domain").value;
    let jobRoleSelect = document.getElementById("job-role");
    jobRoleSelect.innerHTML = '<option value="">--Select Job Role--</option>';

    if (domain && jobRoles[domain]) {
        jobRoleSelect.disabled = false;
        for (let job in jobRoles[domain]) {
            let option = document.createElement("option");
            option.value = job;
            option.textContent = job.replace("_", " ").toUpperCase();
            jobRoleSelect.appendChild(option);
        }
    } else {
        jobRoleSelect.disabled = true;
    }
}

// Skill Gap Analysis with Progress Bar


function analyzeSkills() {
    let domain = document.getElementById("domain").value;
    let selectedJob = document.getElementById("job-role").value;
    let userSkillsInput = document.getElementById("user-skills").value.toLowerCase();
    let resultDiv = document.getElementById("results");

    if (!domain || !selectedJob) {
        resultDiv.innerHTML = "<p class='text-red-500'>Please select a domain and a job role.</p>";
        return;
    }

    let jobSkills = jobRoles[domain][selectedJob].skills.map(skill => skill.toLowerCase());
    let userSkills = userSkillsInput
        .split(",")
        .map(skill => skill.trim().toLowerCase())
        .filter(skill => skill && jobSkills.includes(skill)); // ✅ Only keep valid skills

    let missingSkills = jobSkills.filter(skill => !userSkills.includes(skill));
    let resources = jobRoles[domain][selectedJob].resources;

    // ✅ Only count valid skills for progress
    let skillMatch = Math.round((userSkills.length / jobSkills.length) * 100);
    skillMatch = isNaN(skillMatch) || skillMatch < 0 ? 0 : skillMatch; // Ensure minimum progress is 0%

    let progressColor = skillMatch > 70 ? "bg-green-500" : skillMatch > 40 ? "bg-yellow-500" : "bg-red-500";

    resultDiv.innerHTML = `
        <h3 class='text-xl font-semibold mt-4'>Skill Gap Analysis</h3>
        <p class='text-green-400'>Skill Match: ${skillMatch}%</p>
        <div class="w-full bg-gray-700 rounded-full h-4 mb-4">
            <div class="${progressColor} h-4 rounded-full" style="width: ${skillMatch}%;"></div>
        </div>
        ${missingSkills.length === 0 ? "<p>You're fully prepared!</p>" : `<p class='text-yellow-400'><strong>Missing Skills:</strong> ${missingSkills.join(", ")}</p>`}
        <h4 class='mt-2'>📚 Recommended Study Plan:</h4>
        <ul class='list-disc pl-5'>${resources.map(link => `<li><a href="${link}" class='text-blue-300' target="_blank">${link}</a></li>`).join("")}</ul>
    `;
}




// Advanced AI-Based Features
const skillDatabase = ["Python", "SQL", "Machine Learning", "Deep Learning", "React", "Node.js", "Cybersecurity"];

function showSuggestions() {
    let input = document.getElementById("user-skills").value.toLowerCase();
    let suggestionBox = document.getElementById("suggestions");

    if (input.length === 0) {
        suggestionBox.innerHTML = "";
        return;
    }

    let matches = skillDatabase.filter(skill => skill.toLowerCase().includes(input));
    suggestionBox.innerHTML = matches.map(skill => 
        `<div class="cursor-pointer p-2 hover:bg-gray-700" onclick="addSkill('${skill}')">${skill}</div>`
    ).join("");
}

function addSkill(skill) {
    let input = document.getElementById("user-skills");
    input.value += (input.value ? ", " : "") + skill;
    document.getElementById("suggestions").innerHTML = "";
}

function markSkillAsCompleted(skill) {
    let userProgress = JSON.parse(localStorage.getItem("progress")) || {};
    userProgress[skill] = true;
    localStorage.setItem("progress", JSON.stringify(userProgress));
    updateProgressBar();
}

function updateProgressBar() {
    let userProgress = JSON.parse(localStorage.getItem("progress")) || {};
    let completed = Object.keys(userProgress).length;
    let total = skillDatabase.length;
    let progressPercent = Math.round((completed / total) * 100);
    document.getElementById("progress-bar").style.width = progressPercent + "%";
    document.getElementById("progress-text").innerText = `${progressPercent}% Completed`;
}

function downloadStudyPlan() {
    let doc = new jsPDF();
    doc.text("Personalized Study Plan", 10, 10);
    doc.text("Your Missing Skills:", 10, 20);
    doc.save("study_plan.pdf");
}


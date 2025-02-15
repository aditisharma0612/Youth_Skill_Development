document.addEventListener("DOMContentLoaded", () => {
    const suggestionsData = [
      {
        title: "Skill Assessment",
        description:
          "Analyze your current skills and identify areas for improvement using AI-driven insights.",
        getSuggestions: (userInput) => {
          return [
            `Focus on improving your ${userInput} skills.`,
            'If your score in skill assessments are less than 60% then you should follow some courses. Check our recommended courses.',
            "If your score is above 60% then no worry just improve and improve your skillset more.",
            "Take a self-assessment quiz to identify your strengths.",
            "Seek feedback from peers and mentors.",
            "Learn through online resources and tutorials.",
            `Develop projects to enhance your ${userInput} expertise.`,
            "Track your progress regularly.",
          ];
        },
      },
      {
        title: "Course Recommendations",
        description:
          "Discover courses tailored to your needs from top platforms like Coursera and Udemy.",
        getSuggestions: (userInput) => {
          return [
            `Search for beginner courses on ${userInput} on Coursera.`,
            'Get certifications to enhance your resume.',
            'Try checking for online paid and free courses on Coursera, Udemy, Great Learning, and other popular sites.',
            `Take advanced ${userInput} certifications from Udemy.`,
            "Focus on project-based courses to gain practical experience.",
            "Look for free resources on YouTube for quick learning.",
            `Join community forums for ${userInput} enthusiasts.`,
          ];
        },
      },
      {
        title: "Job Opportunities",
        description:
          "Find jobs that match your skills and interests with real-time LinkedIn integration.",
        getSuggestions: (userInput) => {
          return [
            `Search for ${userInput} jobs on LinkedIn.`,
            "Connect with HR's and Recruiters on job sites." ,
            'Update your resume based on companies requirements to increase chances of being hired.',
            `Update your resume to highlight ${userInput} skills.`,
            `Follow companies hiring for ${userInput} roles.`,
            "Set job alerts to stay updated on openings.",
            "Engage in mock interviews to improve confidence.",
          ];
        },
      },
      {
        title: "Career Mapping",
        description:
          "Explore career paths aligned with your goals and market trends.",
        getSuggestions: (userInput) => {
          return [
            `Explore career options in ${userInput}.`,
            `Set short-term goals to improve your ${userInput} skills.`,
            "Research market trends to identify growing fields.",
            "Do analysis based on your interest in particular domain.",
            "Find a mentor in your desired domain for guidance.",
            "Develop a clear timeline for achieving your career milestones.",
          ];
        },
      },
    ];
  
    const suggestionsGrid = document.querySelector(".suggestions-grid");
    const modal = document.getElementById("ai-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const aiSuggestions = document.getElementById("ai-suggestions");
    const userInputField = document.getElementById("user-input");
    const getSuggestionsButton = document.getElementById("get-suggestions");
    const closeModal = document.querySelector(".close");
  
    let currentCard = null;
  
    // Populate cards dynamically
    suggestionsData.forEach((item) => {
      const card = document.createElement("div");
      card.className = "suggestion-item";
      card.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      `;
      card.addEventListener("click", () => {
        openModal(item);
      });
      suggestionsGrid.appendChild(card);
    });
  
    // Open modal
    function openModal(item) {
      currentCard = item;
      modal.style.display = "flex";
      modalTitle.textContent = item.title;
      modalDescription.textContent = item.description;
      aiSuggestions.innerHTML = ""; // Clear previous suggestions
      userInputField.value = ""; // Clear user input
    }
  
    // Close modal
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  
    // Close modal on outside click
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  
    // Generate suggestions based on user input
    getSuggestionsButton.addEventListener("click", () => {
      const userInput = userInputField.value.trim();
      if (!userInput) {
        aiSuggestions.innerHTML = "<p>Please enter some input to get suggestions.</p>";
        return;
      }
  
      const suggestions = currentCard.getSuggestions(userInput);
      aiSuggestions.innerHTML = ""; // Clear previous suggestions
  
      const suggestionList = document.createElement("ul");
      suggestions.forEach((suggestion) => {
        const listItem = document.createElement("li");
        listItem.textContent = suggestion;
        suggestionList.appendChild(listItem);
      });
  
      aiSuggestions.appendChild(suggestionList);
    });
  });
 
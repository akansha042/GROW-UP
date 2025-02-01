document.addEventListener("DOMContentLoaded", () => {
    console.log("Website Loaded!");

    // Search Functionality (Basic Example)
    document.getElementById("search").addEventListener("keyup", function(event) {
        let query = event.target.value.toLowerCase();
        console.log("Search Query:", query);
    });
});

//login 

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent page refresh

        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        // Simple validation (Replace with backend authentication)
        if (username === "admin" && password === "1234") {
            alert("Login Successful! Redirecting...");
            window.location.href = "index.html"; // Redirect to Home Page
        } else {
            alert("Invalid Username or Password!");
        }
    });
});

//new accoount 
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("registrationForm").addEventListener("submit", function(event) {
        event.preventDefault();

        let fullName = document.getElementById("fullname").value.trim();
        let userName = document.getElementById("username").value.trim();
        let password = document.getElementById("password").value.trim();
        let dob = document.getElementById("dob").value;
        let gender = document.getElementById("gender").value;
        let phone = document.getElementById("phone").value.trim();
        let address = document.getElementById("address").value.trim();

        if (fullName === "" || userName === "" || password === "" || dob === "" || gender === "" || phone === "" || address === "") {
            alert("All fields are mandatory!");
            return;
        }

        if (!/^\d{10}$/.test(phone)) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

        alert("Registration Successful!");
        this.reset();
    });
});

//auto on mode 
const { exec } = require("child_process");
const filePath = "index.html";  // Change to your full file path if needed

exec(`start ${filePath}`, (err) => {
    if (err) {
        console.error("Error opening website:", err);
    } else {
        console.log("Website opened successfully!");
    }
});


//experience 

document.addEventListener("DOMContentLoaded", () => {
    const postBtn = document.getElementById("post-btn");
    const experienceInput = document.getElementById("experience-input");
    const experienceList = document.getElementById("experience-list");
    const languageSelect = document.getElementById("language-select");

    // Load saved experiences from local storage
    loadExperiences();

    // Post Button Click
    postBtn.addEventListener("click", function() {
        const experienceText = experienceInput.value.trim();

        if (experienceText) {
            saveExperience(experienceText);
            experienceInput.value = ""; // Clear input
        } else {
            alert("Please write something before posting.");
        }
    });

    // Save experience to local storage
    function saveExperience(text) {
        let experiences = JSON.parse(localStorage.getItem("experiences")) || [];
        experiences.push(text);
        localStorage.setItem("experiences", JSON.stringify(experiences));
        displayExperiences();
    }

    // Load experiences from local storage
    function loadExperiences() {
        displayExperiences();
    }

    // Display experiences
    function displayExperiences() {
        experienceList.innerHTML = "";
        let experiences = JSON.parse(localStorage.getItem("experiences")) || [];

        experiences.forEach((exp, index) => {
            let div = document.createElement("div");
            div.classList.add("experience");
            div.innerHTML = `
                <p>${exp}</p>
                <button onclick="translateExperience(${index})">Translate</button>
            `;
            experienceList.appendChild(div);
        });
    }

    // Translate comments using Google Translate API
    window.translateExperience = function(index) {
        let experiences = JSON.parse(localStorage.getItem("experiences")) || [];
        let textToTranslate = experiences[index];
        let targetLang = languageSelect.value;

        fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=en|${targetLang}`)
            .then(response => response.json())
            .then(data => {
                alert(`Translated: ${data.responseData.translatedText}`);
            })
            .catch(error => console.error("Translation Error:", error));
    };
});


//ENTRANCE EXAM 
document.addEventListener("DOMContentLoaded", function() {
    fetchLiveExamUpdates();
    displayExamList();
});

// Live Updates Function
async function fetchLiveExamUpdates() {
    const newsList = document.getElementById("exam-news");
    newsList.innerHTML = "<li>Fetching latest updates...</li>";

    try {
        const response = await fetch("/web?search=latest entrance exams in India");
        const data = await response.json();

        if (data.length > 0) {
            newsList.innerHTML = "";
            data.forEach(item => {
                let li = document.createElement("li");
                li.innerHTML = `<a href="${item.link}" target="_blank">${item.title}</a>`;
                newsList.appendChild(li);
            });
        } else {
            newsList.innerHTML = "<li>No updates found.</li>";
        }
    } catch (error) {
        newsList.innerHTML = "<li>Error fetching updates.</li>";
    }
}

// Search Functionality
function searchExams() {
    let searchTerm = document.getElementById("search-bar").value.toLowerCase();
    let exams = document.querySelectorAll(".exam-card");

    exams.forEach(exam => {
        let title = exam.querySelector("h2").textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            exam.style.display = "block";
        } else {
            exam.style.display = "none";
        }
    });
}

// Display Exam List
document.addEventListener("DOMContentLoaded", function() {
    displayExamList(); // Load exams when the page loads
});

const examData = [
    { id: "jee", name: "JEE", details: "Engineering Entrance Exam", eligibility: "12th PCM", scope: "Engineering", apply: "NTA", tips: "Practice Mock Tests" },
    { id: "neet", name: "NEET", details: "Medical Entrance Exam", eligibility: "12th PCB", scope: "Medical", apply: "NTA", tips: "Focus on NCERT" },
    { id: "upsc", name: "UPSC", details: "Civil Services Exam", eligibility: "Graduation", scope: "Government Services", apply: "UPSC", tips: "Read Newspapers" },
    { id: "cat", name: "CAT", details: "MBA Entrance Exam", eligibility: "Graduation", scope: "Business & Management", apply: "IIM Website", tips: "Improve Aptitude" },
    { id: "cds", name: "CDS", details: "Defense Services Exam", eligibility: "Graduation", scope: "Indian Army, Navy, Air Force", apply: "UPSC", tips: "Improve Physical Fitness" }
];

// Function to Display All Exams
function displayExamList() {
    const examContainer = document.getElementById("exam-list");

    if (!examContainer) {
        console.error("Error: 'exam-list' container not found!");
        return;
    }

    examContainer.innerHTML = ""; // Clear previous content

    examData.forEach(exam => {
        let examCard = document.createElement("div");
        examCard.classList.add("exam-card");
        examCard.id = exam.id;

        examCard.innerHTML = `
            <h2>${exam.name}</h2>
            <p><strong>What is it?</strong> ${exam.details}</p>
            <p><strong>Scope:</strong> ${exam.scope}</p>
            <p><strong>Eligibility:</strong> ${exam.eligibility}</p>
            <p><strong>How to Apply:</strong> ${exam.apply}</p>
            <p><strong>Cracking Tips:</strong> ${exam.tips}</p>
        `;

        examContainer.appendChild(examCard);
    });
}

// Function to Search Exams
function searchExams() {
    let input = document.getElementById("search-bar").value.toLowerCase();
    let exams = document.querySelectorAll(".exam-card");

    exams.forEach(exam => {
        let title = exam.querySelector("h2").textContent.toLowerCase();
        if (title.includes(input)) {
            exam.style.display = "block";
        } else {
            exam.style.display = "none";
        }
    });
}

//contact 

// Function to Display Current Time
function updateTime() {
    let now = new Date();
    let timeString = now.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" });
    document.getElementById("current-time").textContent = timeString;
}

// Update Time Every Second
setInterval(updateTime, 1000);

// Run on Page Load
document.addEventListener("DOMContentLoaded", updateTime);

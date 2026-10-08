// =====================================================
// VIEW - DOM Elements and Display Functions
// File: js/view/StudentView.js
// =====================================================
 
const form = document.getElementById("studentForm");
const objectOutput = document.getElementById("objectOutput");
const stringifyOutput = document.getElementById("stringifyOutput");
const parseOutput = document.getElementById("parseOutput");
const studentList = document.getElementById("studentList");
const message = document.getElementById("message");
 
const students = [];
 
function clearErrors() {
    document.querySelectorAll(".error")
        .forEach(error => {
            error.textContent = "";
        });
}
 
function showError(id, text) {
    document.getElementById(id).textContent = text;
}
 
function displayStudents() {
 
    studentList.innerHTML = "";
 
    students.forEach(student => {
 
        const card = document.createElement("div");
 
        card.className = "student-card";
 
        card.innerHTML = `
            <strong>${student.name}</strong><br>
            ID: ${student.studentID}<br>
            Email: ${student.email}<br>
            Phone: ${student.phone}<br>
            Location:
            ${student.address.island},
            ${student.address.province}<br>
            Courses:
            ${student.courses.join(", ")}
        `;
 
        studentList.appendChild(card);
    });
}

// =====================================================
// CONTROLLER - Validation and Application Logic
// File: js/controller/StudentController.js
// =====================================================
 
function validateStudent(data) {
 
    clearErrors();
 
    let valid = true;
 
    // Regular Expressions
    const studentIDRegex = /^STU\d{3}$/;
    const nameRegex = /^[A-Za-zÀ-ÿ' -]{2,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{7}$/;
 
    if (!studentIDRegex.test(data.studentID)) {
        showError(
            "studentIDError",
            "Student ID must use format STU001."
        );
        valid = false;
    }
 
    if (!nameRegex.test(data.name)) {
        showError(
            "nameError",
            "Enter a valid student name."
        );
        valid = false;
    }
 
    if (!emailRegex.test(data.email)) {
        showError(
            "emailError",
            "Enter a valid email address."
        );
        valid = false;
    }
 
    if (!phoneRegex.test(data.phone)) {
        showError(
            "phoneError",
            "Phone number must contain exactly 7 digits."
        );
        valid = false;
    }
 
    if (data.courses.length === 0) {
        showError(
            "courseError",
            "Select at least one course."
        );
        valid = false;
    }
 
    return valid;
}
 
 
// =====================================================
// EVENT - Register Student
// =====================================================
 
form.addEventListener("submit", function(event) {
 
    event.preventDefault();
 
    // Read selected courses
    const selectedCourses = [
        ...document.querySelectorAll(
            'input[name="course"]:checked'
        )
    ].map(course => course.value);
 
    // Read form data
    const formData = {
        studentID:
            document.getElementById("studentID")
                .value.trim(),
 
        name:
            document.getElementById("studentName")
                .value.trim(),
 
        email:
            document.getElementById("email")
                .value.trim(),
 
        phone:
            document.getElementById("phone")
                .value.trim(),
 
        island:
            document.getElementById("island")
                .value.trim(),
 
        province:
            document.getElementById("province")
                .value,
 
        courses:
            selectedCourses
    };
 
    // Validate before creating object
    if (!validateStudent(formData)) {
        message.textContent =
            "Please correct the errors before continuing.";
        return;
    }
 
    // =================================================
    // STEP 1 - CREATE STUDENT OBJECT
    // =================================================
 
    const student = new Student(
        formData.studentID,
        formData.name,
        formData.email,
        formData.phone,
        formData.island,
        formData.province,
        formData.courses
    );
 
    console.log("1. Original Student Object:");
    console.log(student);
 
    /*
       JSON cannot visually show a class instance
       directly in <pre>, so we display its data
       properties for comparison.
    */
 
    objectOutput.textContent =
        JSON.stringify(student, null, 2);
 
    // =================================================
    // STEP 2 - SERIALIZATION
    // JSON.stringify()
    // JavaScript Object -> JSON String
    // =================================================
 
    const jsonString =
        JSON.stringify(student, null, 2);
 
    console.log("2. After JSON.stringify():");
    console.log(jsonString);
 
    console.log(
        "Type after stringify:",
        typeof jsonString
    );
 
    stringifyOutput.textContent =
        jsonString +
        "\n\nJavaScript type: " +
        typeof jsonString;
 
    // =================================================
    // STEP 3 - DESERIALIZATION
    // JSON.parse()
    // JSON String -> JavaScript Object
    // =================================================
 
    const parsedStudent =
        JSON.parse(jsonString);
 
    console.log("3. After JSON.parse():");
    console.log(parsedStudent);
 
    console.log(
        "Type after parse:",
        typeof parsedStudent
    );
 
    parseOutput.textContent =
        JSON.stringify(
            parsedStudent,
            null,
            2
        ) +
        "\n\nJavaScript type: " +
        typeof parsedStudent;
 
    // =================================================
    // IMPORTANT OOP OBSERVATION
    // =================================================
 
    console.log(
        "Original object is Student:",
        student instanceof Student
    );
 
    console.log(
        "Parsed object is Student:",
        parsedStudent instanceof Student
    );
 
    /*
       student is a Student class instance.
 
       parsedStudent is only a plain JavaScript object.
 
       JSON carries DATA.
       JSON does not preserve the Student class method
       displayProfile().
    */
 
    // Store parsed data
    students.push(parsedStudent);
 
    // Update View
    displayStudents();
 
    message.textContent =
        "Student registered and JSON conversion completed.";
 
    form.reset();
});
 
 
// =====================================================
// EVENT - Download students.json
// =====================================================
 
document.getElementById("downloadJSON")
    .addEventListener("click", function() {
 
        if (students.length === 0) {
            message.textContent =
                "Register at least one student first.";
            return;
        }
 
        // Convert array to JSON string
        const jsonData =
            JSON.stringify(
                students,
                null,
                2
            );
 
        const blob =
            new Blob(
                [jsonData],
                {
                    type: "application/json"
                }
            );
 
        const url =
            URL.createObjectURL(blob);
 
        const link =
            document.createElement("a");
 
        link.href = url;
        link.download = "students.json";
        link.click();
 
        URL.revokeObjectURL(url);
    });

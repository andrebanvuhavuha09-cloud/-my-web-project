// =====================================================
// MODEL - Student Class
// File: js/model/Student.js
// =====================================================
 
class Student {
 
    constructor(
        studentID,
        name,
        email,
        phone,
        island,
        province,
        courses
    ) {
        this.studentID = studentID;
        this.name = name;
        this.email = email;
        this.phone = phone;
 
        // Nested object
        this.address = {
            island: island,
            province: province
        };
 
        // Array
        this.courses = courses;
    }
 
    displayProfile() {
        return `${this.studentID} - ${this.name}`;
    }
}

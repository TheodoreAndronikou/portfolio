//This is the superclass that the UnderGrad & PhDStudent are inherating.
class Student {
    constructor(name) {
        this.name = name;
    }
}

//The class that provides info for UnderGrad students.
class UnderGrad extends Student {
    constructor(name, GPA) {
        super(name);
        this.GPA = GPA;
    }

    printInfo() {
        const infoContainer = document.getElementById('app');
        infoContainer.innerHTML += `<div class="student-info"><strong>Undergraduate Student</strong><br>Name: ${this.name}, GPA: ${this.GPA}</div>`;
    }
}

//The class that provides info for PhDStudent students.
class PhDStudent extends Student {
    constructor(name, thesis) {
        super(name);
        this.thesis = thesis;
    }

    printInfo() {
        const infoContainer = document.getElementById('app');
        infoContainer.innerHTML += `<div class="student-info"><strong>PhD Student</strong><br>Name: ${this.name}, Thesis: ${this.thesis}</div>`;
    }
}


//Here is the Main.
const students = [
    new UnderGrad("Bob", 9.1),
    new PhDStudent("John", "Security in Cloud Computing")
];

for (const student of students) {
    student.printInfo();
}
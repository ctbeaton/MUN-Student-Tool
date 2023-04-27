import { Student } from '../model/student.mjs'

export async function addCourse(req, res) {
    let subject = req.params.subject;
    let number = req.params.number;
    let section = req.params.section;

    let msg = await Student.add(subject, number, section);
    res.send(msg);
}

export async function deleteCourse(req, res) {
    let subject = req.params.subject;
    let number = req.params.number;

    let msg = await Student.delete(subject, number);
    res.send(msg);
}

export async function deleteSpecific(req, res) {
    let subject = req.params.subject;
    let number = req.params.number;
    let student = req.params.student;

    let msg = await Student.deleteSpecific(subject, number, student);
    res.send(msg);
}

export async function getAllCourses(req, res) {
    let msg = await Student.getAll();
    res.send(msg);
}

export async function getCourse(req, res) {
    let subject = req.params.subject;
    let number = req.params.number;

    let msg = await Student.get(subject, number);
    res.send(msg);
}

export async function getSpecificSection(req, res) {
    let subject = req.params.subject;
    let number = req.params.number;
    let section = req.params.section;

    let msg = await Student.getSpecificSection(subject, number, section);
    res.send(msg);
}

export async function updateGPA(req, res) {
    let subject = req.params.subject;
    let number = req.params.number;
    let gpa = req.params.gpa;

    let msg = await Student.addGPA(subject, number, gpa);
    res.send(msg);
}

export async function updateSemester(req, res) {
    let subject = req.params.subject;
    let number = req.params.number;
    let semester = req.params.semester;

    let msg = await Student.addSemester(subject, number, semester);
    res.send(msg);
}

export async function updateCreditHours(req, res) {
    let subject = req.params.subject;
    let number = req.params.number;
    let hours = req.params.hours;

    let msg = await Student.addCreditHours(subject, number, hours);
    res.send(msg);
}

export async function getSemesterGPA(req,res) {
    let semester = req.params.semester;

    let msg = await Student.getSemesterGPA(semester);
    res.send(msg);
}

export async function getGPA(req,res) {
    let msg = await Student.getGPA();
    res.send(msg);
}

export async function getSemesterHours(req,res) {
    let semester = req.params.semester;

    let msg = await Student.getSemesterHours(semester);
    res.send(msg);
}

export async function getHours(req,res) {
    let msg = await Student.getHours();
    res.send(msg);
}

export async function updateStudentName(req, res) {
    let subject = req.params.subject;
    let number = req.params.number;
    let student = req.params.student;

    let msg = await Student.addStudentInfo(subject, number, student);
    res.send(msg);
}
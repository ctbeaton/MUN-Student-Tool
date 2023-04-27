import { ExtraNote } from "../model/extranote.mjs";

export async function addExam(req, res) {
    let subject = req.params.subject;
    let number = req.params.number;
    let student = req.params.student;
    let date = req.params.date;
    let time = req.params.time;

    let msg = await ExtraNote.addExam(subject, number, student, date, time);
    res.send(msg);
}

export async function addAssignment(req, res) {
    let subject = req.params.subject;
    let number = req.params.number;
    let student = req.params.student;
    let date = req.params.date;
    let time = req.params.time;

    let msg = await ExtraNote.addAssignment(subject, number, student, date, time);
    res.send(msg);
}

export async function getExams(req, res) {
    let student = req.params.student;

    let msg = await ExtraNote.getExams(student);
    res.send(msg);
}

export async function getAssignments(req, res) {
    let student = req.params.student;

    let msg = await ExtraNote.getAssignments(student);
    res.send(msg);
}

export async function deleteExam(req, res) {
    let subject = req.params.subject;
    let number = req.params.number;
    let student = req.params.student;

    let msg = await ExtraNote.deleteExam(subject, number, student);
    res.send(msg);
}

export async function deleteAssignment(req, res) {
    let subject = req.params.subject;
    let number = req.params.number;
    let student = req.params.student;

    let msg = await ExtraNote.deleteAssignment(subject, number, student);
    res.send(msg);
}
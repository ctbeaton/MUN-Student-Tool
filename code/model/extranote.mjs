import { getDB } from '../utils/db.mjs'

async function getExtraNoteCollection() {
    let db = await getDB();
    return await db.collection('extra');
};

export class ExtraNote {
    static async addExam(subject, number, student, date, time) {
        try {
            let extraNoteCollection = await getExtraNoteCollection();

            let data = {
                type: 'Exam',
                subject: subject,
                number: number,
                student: student,
                date: date,
                time: time
            }
            await extraNoteCollection.insertOne(data);
            console.log('Exam data added to database.');
            return 'Exam data added to database.'
        } catch(err) {
            console.log(err);
        }
    }
    static async addAssignment(subject, number, student, date, time) {
        try {
            let extraNoteCollection = await getExtraNoteCollection();

            let data = {
                type: 'Assignment',
                subject: subject,
                number: number,
                student: student,
                date: date,
                time: time
            }
            await extraNoteCollection.insertOne(data);
            console.log('Assignment data added to database.');
            return 'Assignment data added to database.'
        } catch(err) {
            console.log(err);
        }
    }
    static async getExams(student) {
        let extraNoteCollection = await getExtraNoteCollection();
        let exams = await extraNoteCollection.find({
            student: { $regex: new RegExp(student, "i") },
            type: 'Exam'
        }).toArray();
        return exams;
    }
    static async getAssignments(student) {
        let extraNoteCollection = await getExtraNoteCollection();
        let assignments = await extraNoteCollection.find({
            student: { $regex: new RegExp(student, "i") },
            type: 'Assignment'
        }).toArray();
        return assignments;
    }
    static async deleteExam(subject, number, student) {
        let extraNoteCollection = await getExtraNoteCollection();
        let testExam = await extraNoteCollection.find({
            type: 'Exam',
            subject: { $regex: new RegExp(subject, "i") },
            number: { $regex: new RegExp(number, "i") },
            student: { $regex: new RegExp(student, "i") }
        }).toArray();
        if (testExam.length == 0) {
            return 'Exam not found.'
        }
        let exam = await extraNoteCollection.deleteOne({
            type: 'Exam',
            subject: { $regex: new RegExp(subject, "i") },
            number: { $regex: new RegExp(number, "i") },
            student: { $regex: new RegExp(student, "i") }
        });
        if (exam.deletedCount > 0) {
            console.log('Exam deleted');
            return 'Exam deleted'
        }
        else {
            return 'Exam was not deleted'
        }
    }
    static async deleteAssignment(subject, number, student) {
        let extraNoteCollection = await getExtraNoteCollection();
        let testAssignment = await extraNoteCollection.find({
            type: 'Assignment',
            subject: { $regex: new RegExp(subject, "i") },
            number: { $regex: new RegExp(number, "i") },
            student: { $regex: new RegExp(student, "i") }
        }).toArray();
        if (testAssignment.length == 0) {
            return 'Assignment not found.'
        }
        let assignment = await extraNoteCollection.deleteOne({
            type: 'Assignment',
            subject: { $regex: new RegExp(subject, "i") },
            number: { $regex: new RegExp(number, "i") },
            student: { $regex: new RegExp(student, "i") }
        });
        if (assignment.deletedCount > 0) {
            console.log('Assignment deleted');
            return 'Assignment deleted'
        }
        else {
            return 'Assignment was not deleted'
        }
    }
}
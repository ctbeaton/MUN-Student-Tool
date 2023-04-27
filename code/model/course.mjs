import { getDB } from '../utils/db.mjs';
import * as fs from 'fs';
import * as readline from 'readline';

async function getCoursesCollection () {
    let db = await getDB();
    return await db.collection('courses')
};


export class Course {
    constructor (subject, number, name, section, crn, room, type, days, start, end, slot) {
        this.subject = subject;
        this.number = number;
        this.name = name;
        this.section = section;
        this.crn = crn;
        this.room = room;
        this.type = type;
        this.days = days;
        this.start = start;
        this.end = end;
        this.slot = slot;
        this.semester = '';
        this.gpa = '';
        this.creditHours = '';
        this.student = '';
 
    }

    static courseOfferings = [];
    static file = "./muncourses.txt";
    

    static async load() {
        const fileStream = fs.createReadStream(Course.file);

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });
        for await (const line of rl) {
            const x = line.substring(38,42);
            const y = Number(x);
            if (y != NaN) {
                if (y > 0 && y < 999) {
                    const subject = line.substring(0,4);
                    const number = line.substring(5,10);
                    const name = line.substring(10,38);
                    const section = line.substring(38,42);
                    const crn = line.substring(42,48);
                    const room = line.substring(80,85);
                    const type = line.substring(86,90);
                    const days = line.substring(53,62);
                    const start = line.substring(67,71);
                    const end = line.substring(72,77)
                    const slot = line.substring(48,51);
                    
                    Course.courseOfferings.push(new Course(subject, number, name, section, crn, room, type, days, start, end, slot));

                }
            }
        }
        try {
            let collection = await getCoursesCollection();
            for (var course in Course.courseOfferings) {
                var courseSub = Course.courseOfferings[course].subject.trim();
                if (courseSub == '') {
                    Course.courseOfferings[course].subject = Course.courseOfferings[course - 1].subject;
                }
                var courseNumber = Course.courseOfferings[course].number.trim();
                if (courseNumber == '') {
                    Course.courseOfferings[course].number = Course.courseOfferings[course - 1].number;
                }
                var courseName = Course.courseOfferings[course].name.trim();
                if (courseName == '') {
                    Course.courseOfferings[course].name = Course.courseOfferings[course - 1].name;
                }
                let mongoObj = await collection.insertOne(Course.courseOfferings[course]);
            }
            return 'All courses added successfully to the database'
        } catch(err) {
            console.log(err);
            return 'Courses not added'
        }
    }

    // ADD METHOD TO RETURN SECTIONS FOR A SPECIFIC COURSE
    static async getSections(subject, number) {
        try {
            let courseCollection = await getCoursesCollection();
            let courses = 0;
            if (number == 'ALL') {
                courses = await courseCollection.find({
                    subject: { $regex: new RegExp(subject, "i") },
                },
                {
                    _id: 0,
                    subject: 1,
                    number: 1,
                    section: 1,
                    days: 1,
                    start: 1,
                    end: 1,
                }
                ).toArray();
            }
            else {
                courses = await courseCollection.find({
                    subject: { $regex: new RegExp(subject, "i") },
                    number: { $regex: new RegExp(number, "i") }, 
                },
                {
                    _id: 0,
                    subject: 1,
                    number: 1,
                    section: 1,
                    days: 1,
                    start: 1,
                    end: 1,
                }
                ).toArray();
            }
        
            let sections = courses.map(({ subject, number, name, section, days, start, end }) => ({
                subject,
                number,
                name,
                section,
                days,
                start,
                end
            }));
            
            return sections;

        }catch(err) {
            console.log(err);
        }
    }

    static async getSpecific(subject, number, section) {
        try {
            let coursesCollection = await getCoursesCollection();
            let course = await coursesCollection.find({
                subject: { $regex: new RegExp(subject, "i") },
                number: { $regex: new RegExp(number, "i") },
                section: { $regex: new RegExp(section, "i") }, 
            }).toArray();
            if (course.length == 0) {
                return 'There is no course in the database with these credentials.'
            }
            console.log('One object sent');
            return course;
        } catch(err) {
            console.log(err);
        }
    }

    static async getSubjects() {
        try {
            console.log("getSubjects");
            let courseCollection = await getCoursesCollection();
            var subject_list = await courseCollection.distinct("subject");
            console.log(subject_list);
            return subject_list;
        } catch(err) {
            console.log(err);
        }
    }
    static async getCourseOfferings(session,subject) {
        try {
            let courses = [];
            let coursesCollection = await getCoursesCollection();
            if(session == 'None'){
                return courses;
            }
            if(subject == 'All'){
                return courses = await coursesCollection.find({}).toArray();
            }
            courses = await coursesCollection.find({
                subject: { $regex: new RegExp(subject, "i") }
            }).toArray();
            if (courses.length == 0) {
                return 'There is no course in the database with these credentials.'
            }
            console.log('One object sent');
            return courses;
        } catch(err) {
            console.log(err);
        }
    }
    
}


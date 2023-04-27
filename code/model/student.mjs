import { getDB } from '../utils/db.mjs'

async function getCoursesCollection() {
    let db = await getDB();
    return await db.collection('courses');
};

async function getStudentCollection() {
    let db = await getDB();
    return await db.collection('student')
};


export class Student {

    static async add(subject, number, section, student) {
        try {
            let courseCollection = await getCoursesCollection();
            let studentCollection = await getStudentCollection();

            let course = await courseCollection.findOne({ 
                subject: { $regex: new RegExp(subject, "i") },
                number: { $regex: new RegExp(number, "i") }, 
                section: { $regex: new RegExp(section, "i") }, 
            });
            if (course == null) {
                return 'No course found with these credentials';
            }

            let testCourse = await studentCollection.findOne({
                subject: { $regex: new RegExp(subject, "i") },
                number: { $regex: new RegExp(number, "i") }, 
                section: { $regex: new RegExp(section, "i") },
            });
            
            if (testCourse != null) {
                return 'Course added previously. Not added again.'
            }

            let x = await studentCollection.find({}).toArray();
            if (x.length == 0) {
                await studentCollection.insertOne(course);
                console.log('One course was inserted in the student database')
                return 'Course added.'
        
            }
            let conflict = false;
            let conflictCourse = '';
            let schedule = await studentCollection.find({student: { $regex: new RegExp(student, "i") }}).toArray();
            let start1, end1, start2, end2;
            for (var i of schedule) {
                if (Number(course.start) < Number(i.start)) {
                    start1 = Number(course.start);
                    end1 = Number(course.end);
                    start2 = Number(i.start);
                    end2 = Number(i.end);
                }
                else {
                    start2 = Number(course.start);
                    end2 = Number(course.end);
                    start1 = Number(i.start);
                    end1 = Number(i.end);
                }
                var days1 = course.days.replace(/ /g,'');
                var days2 = i.days.replace(/ /g,'');

                if (start2 < start1 && start2 < end1 || start1 == start2) {
                    if (days1.includes(days2) || days2.includes(days1)) {
                        conflict = true;
                        conflictCourse = i;
                    }
                    else {
                        conflict = false;
                    }
                }
                else {
                    conflict = false;
                }
            }
            if (conflict == true) {
                console.log('Cannot add ' +subject + number + ' because it conflicts with ' + conflictCourse.subject + ' ' + conflictCourse.number);
                return 'Conflicts with ' + conflictCourse.subject + ' ' + conflictCourse.number + '. Not added.';
            }
            else {
                await studentCollection.insertOne(course);
                console.log('One course was inserted in the student database')
                return 'Course added.'
            }

        }
        catch(err) {
            console.log(err);
        }
    }

    static async delete(subject, number) {
        let studentCollection = await getStudentCollection();
        let course = await studentCollection.findOne({
            subject: { $regex: new RegExp(subject, "i") },
            number: { $regex: new RegExp(number, "i") },
        });
        if (course == null) {
            return 'There is no course in the database with those credentials, so it cannot be deleted.'
        }

        let obj = await studentCollection.deleteOne({
            subject: { $regex: new RegExp(subject, "i") },
            number: { $regex: new RegExp(number, "i") },
        });
        if (obj.deletedCount > 0) {
            console.log('Course deleted');
            return 'Course was deleted successfully'
        }
        else {
            return 'Course was not deleted'
        }
    }

    static async deleteSpecific(subject, number, student) {
        let studentCollection = await getStudentCollection();
        let course = await studentCollection.findOne({
            subject: { $regex: new RegExp(subject, "i") },
            number: { $regex: new RegExp(number, "i") },
            student: { $regex: new RegExp(student, "i") },
        });
        if (course == null) {
            return 'There is no course in the database with those credentials, so it cannot be deleted.'
        }

        let obj = await studentCollection.deleteOne({
            subject: { $regex: new RegExp(subject, "i") },
            number: { $regex: new RegExp(number, "i") },
            student: { $regex: new RegExp(student, "i") },
        });
        if (obj.deletedCount > 0) {
            console.log('Course deleted');
            return 'Course was deleted successfully'
        }
        else {
            return 'Course was not deleted'
        }
    }

    static async getAll() {
        try {
            let studentCollection = await getStudentCollection();
            let objs = await studentCollection.find({}).toArray();
            return objs;
        }
        catch(err) {
            throw err;
        }
    }

    static async get(subject, number) {
        try {
            let studentCollection = await getStudentCollection();
            let course = await studentCollection.find({
                subject: { $regex: new RegExp(subject, "i") },
                number: { $regex: new RegExp(number, "i") }, 
            });
            course = course.toArray();
            if (course.length == 0) {
                return 'There is no course in the database with these credentials.'
            }
            console.log('One object sent');
            return course;
        } catch(err) {
            console.log(err);
        }
    }

    static async getSpecificSection(subject, number, section) {
        try {
            let studentCollection = await getStudentCollection();
            let course = await studentCollection.find({
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

    static async addGPA(subject, number, gpa) {
        try {
            let studentCollection = await getStudentCollection();
            let course = await studentCollection.find({
                subject: { $regex: new RegExp(subject, "i") },
                number: { $regex: new RegExp(number, "i") }, 
            });
            if (course.toArray().length == 0) {
                return 'There is no course in the database with those credentials';
            }
            
            let updated = await studentCollection.updateOne(
                {
                    subject: { $regex: new RegExp(subject, "i") },
                    number: { $regex: new RegExp(number, "i") }
                },
                { $set: { gpa: gpa} }

            );

            return 'GPA of ' + subject + ' ' + number + ' was updated'
      
        } catch(err) {
            console.log(err);
        }
    }

    static async addSemester(subject, number, semester) {
        try {
            let studentCollection = await getStudentCollection();
            let course = await studentCollection.find({
                subject: { $regex: new RegExp(subject, "i") },
                number: { $regex: new RegExp(number, "i") }, 
            });
            if (course.toArray().length == 0) {
                return 'There is no course in the database with those credentials';
            }
            
            let updated = await studentCollection.updateOne(
                {
                    subject: { $regex: new RegExp(subject, "i") },
                    number: { $regex: new RegExp(number, "i") }
                },
                { $set: { semester: semester} }

            );

            return 'Semester of ' + subject + ' ' + number + ' was updated'
      
        } catch(err) {
            console.log(err);
        }
    }

    static async addCreditHours(subject, number, hours) {
        try {
            let studentCollection = await getStudentCollection();
            let course = await studentCollection.find({
                subject: { $regex: new RegExp(subject, "i") },
                number: { $regex: new RegExp(number, "i") }, 
            });
            if (course.toArray().length == 0) {
                return 'There is no course in the database with those credentials';
            }
            
            let updated = await studentCollection.updateOne(
                {
                    subject: { $regex: new RegExp(subject, "i") },
                    number: { $regex: new RegExp(number, "i") }
                },
                { $set: { creditHours: hours} }

            );

            return 'Credit hours of ' + subject + ' ' + number + ' were updated'
      
        } catch(err) {
            console.log(err);
        }
    }

    static async getSemesterGPA(semester) {
        try {
            let studentCollection = await getStudentCollection();
            let courses = await studentCollection.find({semester: { $regex: new RegExp(semester, "i") }}).toArray();
            let totalGPA = 0;
            for (var i in courses) {
                totalGPA += Number(courses[i].gpa);
            }
            let averageGPA = totalGPA / courses.length;
            return 'Average GPA for ' + semester + ': ' + averageGPA;
        } catch(err) {
            console.log(err); 
        }
    }

    static async getGPA() {
        try {
            let studentCollection = await getStudentCollection();
            let courses = await studentCollection.find({semester: ''}).toArray();
            let totalGPA = 0;
            for (var i in courses) {
                totalGPA += Number(courses[i].gpa);
            }
            let averageGPA = totalGPA / courses.length;
            return 'Average GPA for courses with no specified semester: ' + averageGPA;
        }
        catch(err) {
            console.log(err);
        }
    }

    static async getSemesterHours(semester) {
        try {
            let studentCollection = await getStudentCollection();
            let courses = await studentCollection.find({semester: { $regex: new RegExp(semester, "i") }}).toArray();
            let totalHours = 0;
            for (var i in courses) {
                totalHours += Number(courses[i].creditHours);
            }
            return 'Total credit hours for ' + semester + ': ' + totalHours;
        } catch(err) {
            console.log(err); 
        }
    }

    static async getHours() {
        try {
            let studentCollection = await getStudentCollection();
            let courses = await studentCollection.find({semester: ''}).toArray();
            let totalHours = 0;
            for (var i in courses) {
                totalHours += Number(courses[i].creditHours);
            }
            return 'Total credit hours for courses with no specified semester: ' + totalHours;
        }
        catch(err) {
            console.log(err);
        }
    }
    

    static async addStudentInfo(subject, number, student) {
        try {
            let studentCollection = await getStudentCollection();
            let course = await studentCollection.find({
                subject: { $regex: new RegExp(subject, "i") },
                number: { $regex: new RegExp(number, "i") }, 
            });
            if (course.toArray().length == 0) {
                return 'There is no course in the database with those credentials';
            }
            
            let updated = await studentCollection.updateOne(
                {
                    subject: { $regex: new RegExp(subject, "i") },
                    number: { $regex: new RegExp(number, "i") }
                },
                { $set: { student: student} }

            );

            return 'Student name added to ' + subject + ' ' + number;
      
        } catch(err) {
            console.log(err);
        }
    }


}
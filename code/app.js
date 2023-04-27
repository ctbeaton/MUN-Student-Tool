import express, { json, urlencoded } from 'express'
import bodyParser from 'body-parser'

const app = express()
const port = 3000

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(bodyParser.json());
//app.use(express.static('part2/templates'));
app.use(bodyParser.urlencoded({
    extended: true
}));

import { connectToDB, closeDBConnection, createDB } from './utils/db.mjs'
import { getSections, load, getSpecific, selectSessionAndSubject, courseOfferings } from './controller/courses.mjs';
import { addCourse, deleteCourse, getAllCourses, getCourse, getSpecificSection, getGPA, getHours, getSemesterGPA, getSemesterHours, updateCreditHours, updateGPA, updateSemester, updateStudentName, deleteSpecific } from './controller/students.mjs'
import { addLogin, deleteLogin, updateLogin, verifyLogin, getTitle ,setTitle, add} from './controller/loginInfos.mjs';
import { addExam, addAssignment, getExams, getAssignments, deleteExam, deleteAssignment } from './controller/extranotes.mjs'

var server;

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
//app.use(express.static(__dirname + '/templates'));

async function createServer() {
    try {
        await createDB()
        await connectToDB()

        const __dirname = dirname(fileURLToPath(import.meta.url));
        app.use(express.static(__dirname + '/templates'));
        
        // Course DB requests
        app.post('/courses', load);
        app.get('/courses/:subject.:number', getSections);
        app.get('/specificcourses/:subject.:number.:section', getSpecific);

        // Schedule requests
        app.post('/student/:subject.:number.:section.:student', addCourse);
        app.delete('/student/:subject.:number', deleteCourse);
        app.get('/student', getAllCourses);
        app.get('/student/:subject.:number', getCourse);
        app.get('/specific/:subject.:number.:section', getSpecificSection);
        app.delete('/specific/:subject.:number.:student', deleteSpecific);
        app.put('/gpa/:subject.:number.:gpa', updateGPA);
        app.put('/semester/:subject.:number.:semester', updateSemester);
        app.put('/hours/:subject.:number.:hours', updateCreditHours);
        app.get('/gpa/:semester', getSemesterGPA);
        app.get('/gpa', getGPA);
        app.get('/hours/:semester', getSemesterHours);
        app.get('/hours', getHours);
        app.put('/student/:subject.:number.:student', updateStudentName);

        // Login requests
        //app.get('/login/:username.:password', getLogin);
        app.post('/login', addLogin);
        app.post('/loginInfo/:username.:email.:password.:phone', add);
        app.put('/login/:username.:password', updateLogin);
        app.delete('/login/:username.:password', deleteLogin);
        app.post('/login/verify', verifyLogin);

        // Extra note requests
        app.post('/exam/:subject.:number.:student.:date.:time', addExam);
        app.post('/assignment/:subject.:number.:student.:date.:time', addAssignment);
        app.get('/exam/:student', getExams);
        app.get('/assignment/:student', getAssignments)
        app.delete('/exam/:subject.:number.:student', deleteExam);
        app.delete('/assignment/:subject.:number.:student', deleteAssignment);

        app.get('/', (req, res) => {
            res.sendFile(__dirname + '/templates/signup.html');
        });

        //select session
        app.get('/selectsessionandsubject', selectSessionAndSubject);
        app.get('/courseofferings', courseOfferings);

        //Schedule Title
        app.get('/gettitle/:username', getTitle);
        app.get('/settitle/:username.:title', setTitle);
        
        server = app.listen(port, () => {
            console.log('App listening at http://localhost:%d', port)
        });
    } catch(err) {
        console.log(err)
    }
}

createServer()

process.on('SIGINT', () => {
    console.info('SIGINT signal received.');
    console.log('Closing Mongo Client.');
    server.close(async function(){
      let msg = await closeDBConnection()   ;
      console.log(msg);
    });
});
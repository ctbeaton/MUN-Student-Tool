import { Course } from '../model/course.mjs'
import ejs from 'ejs';
export async function load(req, res) {
    let msg = await Course.load();
    res.send(msg);
}

export async function getSections(req, res) {
    let subject = req.params.subject;
    let number = req.params.number;

    let msg = await Course.getSections(subject, number);
    res.send(msg);
}

export async function getSpecific(req, res) {
    let subject = req.params.subject;
    let number = req.params.number;
    let section = req.params.section;

    let msg = await Course.getSpecific(subject, number, section);
    res.send(msg);
}

export async function selectSessionAndSubject(req, res) {
    var subject_list = await Course.getSubjects();
    console.log(subject_list);
    return res.redirect('selectSessionAndSubject.html');
}

export async function courseOfferings(req, res) {
    var subject = req.query.subject;
    var session = req.query.session;
    console.log(subject);
    let data = await Course.getCourseOfferings(session,subject);
    res.render('courseOfferings.ejs', {data:data,subject:subject,session:session});
}


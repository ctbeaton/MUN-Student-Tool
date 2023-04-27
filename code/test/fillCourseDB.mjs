import axios from 'axios'
import { Course } from '../model/course.mjs'
import { checkCourseCollection } from '../utils/db.mjs'

var myurl = 'http://localhost:3000'

const instance = axios.create({
    baseURL: myurl,
    timeout: 7000,
    headers: {'content-type': 'application/json'}
})

async function create_course_DB() {
    try {
        let val;
        val = await new Promise((resolve, reject) => {
            val = checkCourseCollection();
            resolve(val)
        });
        
        if (val == 0) {
            let res = await instance.post('/courses')
            console.log(res.data)
            return;
        }
        else {
            console.log('Courses collection is already filled.')
            return;
        }

    }
    catch(err) {
        console.log(err);
    }
}

create_course_DB();
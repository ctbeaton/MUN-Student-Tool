import axios from 'axios'

var myurl = 'http://localhost:3000';

const instance = axios.create({
    baseURL: myurl,
    timeout: 3000,
    headers: {'content-type': 'application/json'}
});

async function testGetGPA() {
    let semester = 'Winter 2023';

    try {
        let res = await instance.get('/gpa/'+semester);
        console.log(res.data);

        let res2 = await instance.get('/hours/'+semester);
        console.log(res2.data);

    } catch(err) {
        console.log(err);
    }

}

testGetGPA();
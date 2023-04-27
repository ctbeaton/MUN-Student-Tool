import axios from 'axios'
import { test } from 'mocha';

var myurl = 'http://localhost:3000';

const instance = axios.create({
    baseURL: myurl,
    timeout: 3000,
    headers: {'content-type': 'application/json'}
});

async function testExtraNote() {
    let subject = 'COMP';
    let number = '3100';
    let student = 'chelsea';
    let date = 'March 10';
    let time = '11:59PM'

    let res = await instance.post('/exam/'+subject+'.'+number+'.'+student+'.'+date+'.'+time);
    console.log(res.data);

    let res2 = await instance.get('/exam/'+student);
    console.log(res2.data);

    let res3 = await instance.post('/assignment/'+subject+'.'+number+'.'+student+'.'+date+'.'+time);
    console.log(res3.data);

    let res4 = await instance.get('/assignment/'+student);
    console.log(res4.data);

    let res5 = await instance.delete('/exam/'+subject+'.'+number+'.'+student);
    console.log(res5.data);

    let res6 = await instance.delete('/assignment/'+subject+'.'+number+'.'+student);
    console.log(res6.data);
}

testExtraNote();
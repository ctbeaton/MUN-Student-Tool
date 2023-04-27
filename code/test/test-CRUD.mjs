import axios from 'axios'

var myurl = 'http://localhost:3000';

const instance = axios.create({
    baseURL: myurl,
    timeout: 3000,
    headers: {'content-type': 'application/json'}
});

async function testAddCourse() {

    let subject = 'MATH'
    let number = '3340'
    let section = '001' 
    let gpa = '70'
    let semester = 'Winter 2023'
    let hours = '3'
    let student = 'ctbeaton';

    let subject2 = 'COMP'
    let number2 = '3100'
    let section2 = '001' 
    let gpa2 = '80'
    let semester2 = 'Winter 2023'
    let hours2 = '3'
    let student2 = 'ctbeaton';


    try {
        let res = await instance.post('/student/'+subject+'.'+number+'.'+section+'.'+student);
        console.log(res.data);
        let res2 = await instance.put('/semester/'+subject+'.'+number+'.'+semester);
        console.log(res2.data);
        let res3 = await instance.put('/gpa/'+subject+'.'+number+'.'+gpa);
        console.log(res3.data);
        let res4 = await instance.put('/hours/'+subject+'.'+number+'.'+hours);
        console.log(res4.data);
        console.log()

        let res5 = await instance.post('/student/'+subject2+'.'+number2+'.'+section2+'.'+student2);
        console.log(res5.data);
        let res6 = await instance.put('/semester/'+subject2+'.'+number2+'.'+semester2);
        console.log(res6.data);
        let res7 = await instance.put('/gpa/'+subject2+'.'+number2+'.'+gpa2);
        console.log(res7.data);
        let res8 = await instance.put('/hours/'+subject2+'.'+number2+'.'+hours2);
        console.log(res8.data);

        console.log();
        let res11 = await instance.delete('/student/'+subject+'.'+number);
        console.log(res11.data);
        
    }
    catch(err) {
        console.log(err);
    }
    
}

testAddCourse();
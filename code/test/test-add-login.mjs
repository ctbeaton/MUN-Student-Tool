import axios from 'axios'

var myurl = 'http://localhost:3000';

const instance = axios.create({
    baseURL: myurl,
    timeout: 3000,
    headers: {'content-type': 'application/json'}
});

async function testAddLogin() {

    let username = 'ctbeaton';
    let password = 'password';
    let email = 'cbeaton@munca';
    let phone = '709-000-0000';
    let password2 = 'password2';
    try {
        let res = await instance.post('/loginInfo/'+username+'.'+email+'.'+password+'.'+phone);
        console.log(res.data);

        let res2 = await instance.put('/login/'+username+'.'+password2);
        console.log(res2.data);

        let res3 = await instance.delete('/login/'+username+'.'+password2);
        console.log(res3.data);
    }
    catch(err) {
        console.log(err);
    }
    
}

testAddLogin();
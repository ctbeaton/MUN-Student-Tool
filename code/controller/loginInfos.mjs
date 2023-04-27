import { loginInfo } from "../model/loginInfo.mjs";

export async function addLogin(req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var phone = req.body.phone;
    var msg = await loginInfo.add(username, email, password, phone);
    if (msg == 'Login info added successfully to the database'){
        return res.redirect('login.html');
    }
    else {
        res.send(msg)
    }

}

export async function add(req, res) {
    var username = req.params.username;
    var email = req.params.email;
    var password = req.params.password;
    var phone = req.params.phone;
    var msg = await loginInfo.addLogin(username, email, password, phone);
    res.send(msg);

}

export async function deleteLogin(req, res) {
    let username = req.params.username;
    let password = req.params.password;
    let msg = await loginInfo.delete(username, password);
    res.send(msg);
}

export async function updateLogin(req, res) {
    let username = req.params.username;
    let password = req.params.password;
    let msg = await loginInfo.updatePassword(username, password);
    res.send(msg);
}

export async function verifyLogin(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    var msg = await loginInfo.login(username, password);
    if (msg == true){
        res.json({ success: true});
    }
    else {
        res.json({ success: false });
    }
}
export async function getTitle(req, res) {
    let username = req.params.username;
    let msg = await loginInfo.getTitle(username);
    res.send(msg);
}
export async function setTitle(req, res) {
    let username = req.params.username;
    let title = req.params.title;
    let msg = await loginInfo.setTitle(username,title);
    res.send(title);
}

import { getDB } from '../utils/db.mjs'


async function getLoginCollection() {
    let db = await getDB();
    return await db.collection('login');
};

export class loginInfo {
    constructor(username, email, password, phone,title='Winter 2023 Schedule') {
        this.username = username;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.title = title;
    }

    static async add(username, email, password, phone) {
        try {
            let loginCollection = await getLoginCollection();
            let info = await loginCollection.findOne({
                username: username,
            });
            if (info != null) {
                return 'Username already taken. Please try again.'
            }
            let info2 = await loginCollection.findOne({
                email: email,
            });
            if (info2 != null) {
                return 'Email already in use. Please try again.'
            }
            let mongoObj = await loginCollection.insertOne(new loginInfo(username, email, password, phone));
            return 'Login info added successfully to the database'
        }
        catch(err) {
            return 'Login info not added'
        }
    }

    static async delete(username, password) {
        try {
            let loginCollection = await getLoginCollection();
            let info = await loginCollection.findOne({
                username: username,
                password: password,
            });
            if (info == null) {
                return 'There is no login information with those credentials'
            }
            let obj = await loginCollection.deleteOne({
                username: username,
                password: password
            });
            if (obj.deletedCount > 0) {
                console.log('Login deleted');
                return 'Login info was deleted successfully'
            }
            else {
                return 'Login was not deleted'
            }
        }
        catch(err) {
            console.log(err);
        }
    }

    static async updatePassword(username, password) {
        let loginCollection = await getLoginCollection();
        let info = await loginCollection.find({username: username});
        if (info.toArray().length == 0) {
            return 'No login info with those credentials';
        }

        let updated = await loginCollection.updateOne({
            username: username
        },
        {
            $set: {password: password}
        }
        );

        return 'Password updated.'
    }

    static async login(username, password) {
        let loginCollection = await getLoginCollection();
        let info = await loginCollection.find({
            username: username,
            password: password,
        }).toArray();
        if (info.length == 0) {
            console.log('Login credentials not found');
            return false;
        }
        else {
            console.log('Login credentials found');
            return true;
        }
    }
    static async getTitle(username) {
        let loginCollection = await getLoginCollection();
        let info = await loginCollection.find({username: username}).toArray();
        if (info.length == 0) {
            return 'No login info with those credentials';
            return false;
        }

        else{
            return info[0].title;
        }
    }
    static async setTitle(username, title) {
        let loginCollection = await getLoginCollection();
        let info = await loginCollection.find({username: username});
        if (info.toArray().length == 0) {
            return 'No login info with those credentials';
        }

        let updated = await loginCollection.updateOne({
            username: username
        },
        {
            $set: {title: title}
        }
        );

        return 'Title updated.'
    }


    static async addLogin(username, email, password, phone) {
        try {
            let loginCollection = await getLoginCollection();
            let info = await loginCollection.findOne({
                username: username,
            });
            if (info != null) {
                return 'Username already taken. Please try again.'
            }
            let info2 = await loginCollection.findOne({
                email: email,
            });
            if (info2 != null) {
                return 'Email already in use. Please try again.'
            }
            let mongoObj = await loginCollection.insertOne(new loginInfo(username, email, password, phone));
            return 'Login info added successfully to the database'
        }
        catch(err) {
            return 'Login info not added'
        }
    }
}
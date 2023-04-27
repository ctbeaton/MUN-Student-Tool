import { MongoClient } from 'mongodb';

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri, { useUnifiedTopology: true});
var db;

export async function createDB() {
    try {
        await client.connect();

        const dbList = await client.db().admin().listDatabases();
        const databaseNames = dbList.databases.map(db => db.name);
        
        if (!databaseNames.includes('project')) {
            db = await client.db('project')
            console.log("Project database created successfully");
            await db.createCollection('courses');
            console.log('Courses collection created successfully')
            await db.createCollection('student');
            console.log('Student collection created successfully')
            await db.createCollection('login');
            console.log('Login collection created successfully')
            await db.createCollection('extra');
            console.log('Extra notes collection created successfully')
        }

        db = await client.db('project')
        const collection = await client.db("project").listCollections({ name: "extra" }).toArray();
        if (collection.length == 0) {
            await db.createCollection('extra');
            console.log('Extra notes collection created successfully')
        }
        await client.close();

    }
    catch(err) {
        console.log(err);
    }
}


export async function checkCourseCollection() {
    try {
        db = await getDB();
        const collection = await client.db("project").collection("courses");
        let courses = await collection.find({}).toArray();
        if (courses.length > 0) {
            await client.close();
            return 1;
        }
        else {
            await client.close();
            return 0;
        }
        
    } catch(err) {
        console.log(err);
    }
}

export async function connectToDB() {
    try {
        await client.connect();
        db = await client.db('project')
        console.log("Connected successfully to mongoDB");
    }
    catch (err) {
        throw err;
    }
}

export async function getDB() {
    return db;
}

export async function closeDBConnection() {
    await client.close();
    return 'Connection closed';
}

export default { connectToDB, getDB, closeDBConnection, createDB }
### Implementation Description

#### Server side files
The server side implementation of our project is included in the files app.js, all files in the controller folder (courses.mjs, extranotes.mjs, loginInfos.mjs, and students.mjs), all files in the model folder (course.mjs, extranote.mjs, loginInfo.mjs and student.mjs), and all files in the utils folder (db.mjs). <br>
The app.js file handles server side requests, the files in the controller folder include functions that are used as endpoints in our web application, the files in the model folder contain classes and functions to access MongoDB databases and the file in the utils folder contains functions to create and access MongoDB databases.

#### Client side files
The client side implementation of our project is included in the files in the templates folder. The html files are used to design our webpage (the login screen, the signup screen and the main page of our webpage) and the files within the js folder handle AJAX requests to the server and allows the user to access server-side information from the client-side.
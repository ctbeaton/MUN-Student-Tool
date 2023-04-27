## MUN-Student-Tool
An online student tool for helping students manage their course schedules.

#### How to test

##### (1) Connecting to the server
First, navigate to the part3 folder and start the local server by running app.js in terminal (node app.js) <br>
If the server connected successfully, you will see: <br>
'Connected successfully to mongoDB' <br>
'App listening at http://localhost:3000' <br>

##### (2) Loading the dataset
Now, in a different terminal (leave app.js running), navigate to the 'test' folder and run the file 'fillCourseDB.mjs'. This file contains the methods that load the dataset into MongoDB (this file reads the muncourses.txt file and fills the 'courses' collection with course objects extracted from that file). Please make sure to run this file directly after starting the server, because in order to test the functionality, the 'courses' collection needs to be filled. <br>

##### (3) Testing server-side functionality
Now, to test the server side functionality, you can run each method in the 'test' folder. The 'test-add-delete.mjs' should be run first in order to add courses to 
the student database. Then, 'test-gpa-hours.mjs' should be run and finally 'testAddLogin.mjs'. Please be sure to run the test code in this order, as certain databases need to be populated in order for test code to work.

##### (4) Testing client-side functionality
Client-side video link: https://drive.google.com/file/d/1ooBdbYweaN9JqRiwx-NGVFsdpIba5QHh/view?usp=sharing <br>
After the server is connected and the dataset is loaded (steps 1 and 2), you can load the webpage by going to this url in a web browser: http://localhost:3000
This will take you to the sign up page. Enter your information to sign up, and after clicking 'Sign Up', you will be taken to the login page. Enter the username and password you just created and click 'Login'. Then you will be taken to the main page of our website.

##### Important
The 'project' database and 'courses', 'student' and 'login' collection will only be created once. The code checks to see if the 'project' database already exists on your computer, and if it does, it will not create it again. This is the same for the fillCourseDB.mjs file. If the 'courses' collection already has data in it, it will not get filled again.

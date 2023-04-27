## Feature Descriptions

### Server Side Features

#### DownloadCourses (server-side)
1. This feature reads the muncourses.txt file and saves each course in the courses mongoDB database which allows us to implement other methods to create class schedules for students.
2. This feature uses the 'fs' module and the 'readline' module. The muncourses.txt file is read using the fs and readline modules and Course objects are extracted and inserted into the courses MongoDB database.
3. This feature only depends on the getDB() function within the dbs.mjs file. This function connects the server to the MongoDB databases.
4. This feature is complete and fully functional. <br>The implementation of this feature is in the course.mjs and the courses.mjs files (load() function).
5. Please run the fillCourseDB.mjs file within the 'test' folder after the server is connected.
6. N/A
7. N/A


#### ScheduleCRUD / TimeConflict (server-side)
1. This feature supplies methods to add, delete, update and read/get courses. This allows us to create schedules for students.
2. The implementation strategy involves connecting to the 'student' MongoDB database, querying the database to perform CRUD operations on courses for students and handles time conflicts when adding courses to the 'student' database. This feature doesn't use any imported packages or modules.
3. This feature only depends on the DownloadCourses feature and the getDB() function within the dbs.mjs file.
4. This feature is complete and functional, however sometimes time conflicts are missed when adding courses to the 'student' database. <br>The implementation of this feature is found within the student.mjs and the students.mjs files (the add(), delete(), getAll(), get(), and addStudentInfo() functions).
5. Please run the test-CRUD.mjs file within the 'test' folder (after connecting to the server and running fillCourseDB.mjs).
6. N/A
7. N/A

#### CalculateGPA (server-side)
1. This feature allows students to track their GPA. There is a method to add their GPA to a specific course (perhaps after the course was finished) and a method to calculate their GPA for a specific semester.
2. The implementation strategy for this feature includes calculating the average GPA for courses based on the semester, or for courses with no specified semester (getSemesterGPA() and getGPA() functions). <br>The implementation uses MongoDB to connect to the 'student' database in order to access the students courses.
3. This feature depends on the DownloadCourses feature, the ScheduleCRUD feature and the getDB() function within the dbs.mjs file.
4. This feature is complete and fully functional. The implementation of this feature is found within the student.mjs and the students.mjs files (the getSemesterGPA() and getGPA() functions).
5. Please run the test-gpa-hours.mjs file within the 'test' folder (after connecting to the server and running the fillCourseDB.mjs and the test-CRUD.mjs files).
6. N/A
7. N/A

#### creditHours (server-side)
1. This feature allows students to track the number of credit hours they are registered for per semester.
2. The implementation strategy for this feature involves calculating the total credit hours for courses based on the semester or for courses with no specified semester (getSemesterHours() and getHours() functions). The implementation uses MongoDB to connect to the 'student' database in order to access the students courses.
3. This feature depends on the DownloadCourses feature, the ScheduleCRUD feature and the getDB() function within the dbs.mjs file.
4. This feature is complete and fully functional. <br>The implementation of this feature is found within the student.mjs and the students.mjs files (getSemesterHours() and getHours() functions).
5. Please run the test-gpa-hours.mjs file within the 'test' folder (after connecting to the server and running the fillCourseDB.mjs and the test-CRUD.mjs files).
6. N/A
7. N/A

#### saveLoginInfo (server-side)
1. This feature allows the user to save their login information into the login database. There are methods to add, delete and update login information. This information is later used in the client-side to allow users to login.
2. The implementation strategy for the given feature involves managing login information, including adding new login info, deleting login info, updating password, and performing login authentication. The implementation uses MongoDB to connect to the 'login' database in order to access login information for users.
3. This feature only depends on the getDB() function within the dbs.mjs file to connect to MongoDB.
4. This feature is complete and fully functional. <br>The implementation of this feature is found within the loginInfo.mjs and loginInfos.mjs files (the add(), delete(), updatePassword() and login() functions).
5. Please run the test-add-login.mjs file within the 'test' folder (after connecting to the server).
6. N/A
7. N/A

#### Login (server-side)
1. When a user is trying to login, this feature checks the 'login' database to see if the username and password match any that are in the database, and if they do, it directs the user to the main webpage. If the password does not match the password for a particular username (in the database), it tells the user that their password is incorrect.
2. The implementation strategy for this feature involves using MongoDB to connect to the 'login' database and using AJAX calls to get the login information from the database and check if they are correct.
3. This feature only depends on the getDB function within the dbs.mjs file to connect to MongoDB.
4. This feature is complete and fully functional. <br>The implementation of this feature is found within the loginInfo.mjs and loginInfos.mjs files.
5. Please run the test-add-login.mjs file within the 'test' folder (after connecting to the server).
6. N/A
7. N/A

### Client Side Features

#### CourseOfferings (client-side)
1. View courses available for the Winter 2023 semester by inputting which subject you would like to see the courses for.
2. The implementation strategy for this feature involves using HTML, CSS, and JavaScript/jQuery to create a table displaying course name and course number. The feature also includes an AJAX call to retrieve class information from the server. Other important packages are ejs, express, etc.
3. This feature does not depend on any of our other features.
4. This feature is complete and functional. <br>
The implementation of this feature is included within the part3/app.js, part3/controller/courses.mjs, part3/model/course.mjs, part3/templates/schedule.html,part3/templates/js/courseOfferings.js, part3/views/courseOfferings.ejs files. 
5. N/A
6. In the navigation bar user can find the"Course Offerings" tab, by clicking on the tab user will get two dropdown boxes from where user can choose the session and the subject. After clicking the submit button user will see a list of all courses which are offered in that selected session for that subject.
7. Video timestamp of this feature: 0:25

#### Add (client-side)
1. Add courses to the students schedule by searching for the class and clicking the 'Add' button in the corresponding row in the table for that class. 
2. The implementation strategy for this feature involves using HTML, CSS, and JavaScript/jQuery to add courses to the students schedule. The feature also includes an AJAX call to add the specified class to the students schedule. 
3. This feature depends on the DownloadCourses, ScheduleCRUD / Time Conflict, CourseOfferings and saveLoginInfo features.
4. This feature is complete and fully functional. <br>The implementation for this feature is included within the schedule.html and the findClass.js files.
5. N/A
6. After searching for courses, a table of course information is displayed with 'Add' buttons next to every course. After clicking on one of the buttons, you will see the response next to the table (i.e. if the course was added successfully or not). The course will also be added to the schedule in the 'View Schedule' tab.
7. Video timestamp of this feature: 0:44

#### Grid (client-side)
1. This feature displays the weekly schedule for a student.
2. The implementation strategy for this feature involves using HTML, CSS, and JavaScript/jQuery to display a weekly grid full of courses. The feature also includes an AJAX call to get a students courses from the 'student' database.
3. This feature depends on the Add and Delete features.
4. This feature is complete and functional. However, the grid is set up to display 30 minute intervals. We did not implement functionality for when courses overlap (i.e. one course ends at 18:45 and another begins at 19:00. Both courses will be shown on the schedule, but where the overlap is, the start/end for one course will not be accurate). <br> The implementation of this feature is included within the schedule.html and the schedule.js files.
5. N/A
6. After adding a course to the student database (from the 'Add Class' tab), click on the 'View Schedule' tab and you will be able to see the course on the weekly schedule grid. If you delete the class from the 'Delete Class' tab, it will disappear from the schedule.
7. Video timestamp of this feature: 0:58

#### Delete (client-side)
1. Delete courses from the schedule by viewing the courses within the students schedule and clicking the 'Delete' button in the corresponding row in the table for that class.
2. The implementation strategy for this feature involves using HTML, CSS, and JavaScript/jQuery to delete courses from the students schedule. The feature also includes AJAX calls to get the classes currently in the students schedule and to delete a class from the schedule.
3. This feature depends on the DownloadCourses, ScheduleCRUD, saveLoginInfo, CourseOfferings, and Add features.
4. This feature is complete and functional. Sometimes after navigating to other pages causes the classes table to not display. If this happens, please refresh the page and it will show up. <br>The implementation of this feature is included within the schedule.html and the deleteClass.js files.
5. N/A
6. After clicking on the 'Delete Class' tab, a table with the students current classes will be displayed, with a 'Delete' button next to every course. After clicking on the 'Delete' button, that course will disappear from the table (the course will also disappear from the schedule in the 'View Schedule' tab).
7. Video timestamp of this feature: 1:09


#### ExtraNote (client-side)
1. This feature allows students to keep track of exams and assignments. Students can add exam / assignments to an 'extranote' database and view them later.
2. The implementation strategy for this feature involves using HTML, CSS, and JavaScript/jQuery to keep track of exam / assignment information. The feature also includes AJAX calls to add and get information from the 'extranote' database. 
3. This feature depends on the saveLoginInfo feature.
4. This feature is complete and functional. <br> The implementation for this feature is within the schedule.html and extraNote.js files.
5. N/A
6. Text boxes and buttons that allow students to input exam / assignment information, and buttons that allow students to view this information.
7. Video timestamp of feature: 1:27

#### Customization (client-side)
1. This feature allows to customize the schedule page; by changing the courses colours,editing the view schedule title and saving the title for future use.
2. The implementation strategy for this feature involves using HTML, CSS, and JavaScript/jQuery to show the course schedule by week. The feature also includes AJAX calls to add and get information from the 'login' database.
3. This feature does not depend on any of our other features.
4. This feature is complete and functional. <br>
The implementation for this feature is within the part3/app.js, part3/controller/logInInfos.mjs, part3/model/logInInfo.mjs, part3/templates/schedule.html,part3/templates/js/update_title.js files.
5. The edit title feature uses server side implementation. The edited title is saved in the server database.
6. The change color feature uses client side implementation. User will see a drop down box of colours and can select a colour from that. After that all course name wil be shown in that color.
7. Video timestamp of feature: 1:59


$(document).on('click', '#view-schedule-tab-btn', function(event) {
    event.preventDefault();
    $("#class-table").hide();
    $("#delete-class-table").hide();
    $("#exam-note-table").hide();
    $("#assignment-note-table").hide();

    let profileButton = document.getElementById("profile-btn");
    let currentText = profileButton.innerHTML;
    let student = currentText.replace("Hello, ", "");
    $.ajax({
        url: '/student',
        type: 'GET',
        contentType: 'application/json',
        success: function(response) {
            
            let courseArray = response;
            for (var i = 0; i < courseArray.length; i++) {
                if (courseArray[i].student == student) {
                    let course = courseArray[i];
                    let days = course.days.split(' ');
                    days = days.filter(day => day != '');

                    for (var j = 0; j < days.length; j++) {
                        let day = days[j]
                        let dayIndex = getDayIndex(day);
                        if (dayIndex != -1) {
                            let subject = course.subject;
                            let number = course.number;
                            let start = course.start;
                            let end = course.end;
                            let courseName = subject + " " + number;

                            let i = parseInt(start);
                            let x = start.substring(0,2);
                            let y = start.substring(2,4);
                            $('#'+dayIndex+'_'+i).text(courseName + ' (' + x + ':' + y + ')');
                            while (parseInt(i) <= parseInt(end)) {
                                let hours = Math.floor(i / 100); 
                                let minutes = i % 100; 
                                
                                minutes += 30; 
                                let endHours = end.substring(0,2);
                                let endMinutes = end.substring(2,4);

                                if (minutes >= 60) {
                                    hours += 1;
                                    minutes -= 60;
                                }
                                
                                if (hours >= 24) {
                                    hours -= 24;
                                }
                
                                let hoursString = hours.toString().padStart(2, '0'); 
                                let minutesString = minutes.toString().padStart(2, '0'); 
                                
                                let updatedI = hoursString + minutesString;
                                i = parseInt(updatedI);
                                
                                if (parseInt(i) >= parseInt(end)) {
                                    $('#'+dayIndex+'_'+updatedI).text(courseName + ' (' + endHours + ':' + endMinutes +')');
                                }
                                else {
                                    $('#'+dayIndex+'_'+updatedI).text(courseName);
                                }

                            }
                        }
                    }     
                }
                
            }
        },
        error: function(xhr, status, error) {
            $('#response-container').text('error');
            var errorMessage = xhr.status + ': ' + xhr.statusText
            alert('Error - ' + errorMessage);
            console.log(days);
        } 
    });
    
    
});

function getDayIndex(day) {
    switch(day) {
        case 'M':
            return 'mon';
        case 'T':
            return 'tue';
        case 'W':
            return 'wed';
        case 'R':
            return 'thu';
        case 'F':
            return 'fri';
        default:
            return -1;
    }
}
























// async function getStudentCollection () {
//     let db = await getDB();
//     return await db.collection('student')
// };


// async function generateScheduleTable() {
//     try {
//         let studentCollection = await getStudentCollection();
//         let studentArray = studentCollection.toArray();
//         let earliestStartTime = null;
//         let latestEndTime = null;

//         for (let i = 0; i < studentArray.length; i++) {
//             let course = studentArray[i];
//             let startTime = course.start;
//             let endTime = course.end;

//             if (!earliestStartTime || startTime < earliestStartTime) {
//                 earliestStartTime = startTime;
//             }
//             if (!latestEndTime || endTime > latestEndTime) {
//                 latestEndTime = endTime;
//             }
//         }

//         const table = document.getElementById("schedule-table");

//         while (table.rows.length > 1) {
//             table.deleteRow(1);
//         }
//         for (let i = earliestStartTime; i <= latestEndTime; i++) {
//             const row = table.insertRow();
//             const timeCell = row.insertCell();
//             const courseCell = row.insertCell();
//             timeCell.textContent = i; // Set time
//             courseCell.textContent = ""; // Set course initially as empty
    
//             // Loop through courses and populate corresponding course cell
//             for (const course of courses) {
//               const startTime = parseInt(course.startTime.split(":")[0]);
//               const endTime = parseInt(course.endTime.split(":")[0]);
//               if (i >= startTime && i <= endTime) {
//                 courseCell.textContent = course.courseName;
//                 break;
//               }
//             }
//         }

//     } catch(err) {
//         console.log(err);
//     }
// }